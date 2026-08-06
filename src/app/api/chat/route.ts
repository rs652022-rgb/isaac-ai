import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { MultiProviderAIEngine, ChatMessagePayload } from "@/lib/ai/provider-engine";
import { RequestLogger } from "@/lib/ai/logger";
import { AgentRouter } from "@/lib/ai/router";
import { AgentRegistry } from "@/lib/ai/agents/registry";
import { AgentId } from "@/lib/ai/agents/types";

export async function POST(req: NextRequest) {
  // Extract custom Request ID from header or generate a new unique ID
  const incomingReqId = req.headers.get("X-Request-Id");
  const logger = new RequestLogger(incomingReqId || undefined);

  try {
    const body = await req.json().catch((err) => {
      logger.logParsingError({ step: "JSON Body Parsing", error: err });
      return {};
    });

    const { content, conversationId: reqConversationId, agentId: reqAgentId, messages: rawMessages, profile: reqProfile } = body;

    // Validate incoming payload
    const userMessageContent =
      (typeof content === "string" && content.trim()) ||
      (Array.isArray(rawMessages) && rawMessages.slice(-1)[0]?.content) ||
      "";

    if (!userMessageContent) {
      logger.logWarning(1, "Input Validation", "Missing or empty message content.");
      logger.logSummary(false);
      return NextResponse.json(
        { success: false, error: "Message content is required.", requestId: logger.requestId },
        { status: 400 }
      );
    }

    // 1. Intent Classifier & Agent Router Dispatch
    const { agent, classification } = AgentRouter.route(reqAgentId as AgentId, userMessageContent);
    const activeAgentId = agent.id;
    let baseSystemPrompt = AgentRegistry.getSystemPrompt(activeAgentId);

    // Inject Founder Memory Graph Profile context into System Prompt
    if (reqProfile && typeof reqProfile === "object") {
      const profileContextParts = [];
      if (reqProfile.startupName) profileContextParts.push(`Startup Name: "${reqProfile.startupName}"`);
      if (reqProfile.industry) profileContextParts.push(`Industry: "${reqProfile.industry}"`);
      if (reqProfile.problem) profileContextParts.push(`Target Problem: "${reqProfile.problem}"`);
      if (reqProfile.solution) profileContextParts.push(`Proposed Solution: "${reqProfile.solution}"`);
      if (reqProfile.targetAudience) profileContextParts.push(`Target Audience/ICP: "${reqProfile.targetAudience}"`);
      if (reqProfile.businessModel) profileContextParts.push(`Business Model: "${reqProfile.businessModel}"`);
      if (reqProfile.country) profileContextParts.push(`Country Location: "${reqProfile.country}"`);

      if (profileContextParts.length > 0) {
        baseSystemPrompt += `\n\n=== FOUNDER GRAPH MEMORY CONTEXT ===\n${profileContextParts.join("\n")}\n====================================`;
      }
    }
    const systemPrompt = baseSystemPrompt;

    logger.logStep(
      1,
      "Agent Router Dispatch",
      undefined,
      `Agent: "${agent.name}" (${activeAgentId}) | Intent Confidence: ${classification?.confidence ?? 1.0}`
    );

    // 2. Non-blocking User Authentication & DB Lookup
    let session = null;
    try {
      session = await auth();
    } catch (authErr: any) {
      logger.logWarning(1, "Auth Session Lookup", authErr.message || String(authErr));
    }

    let userId = session?.user?.id;
    if (!userId) {
      const guestEmail = "guest@isaac.ai";
      const dbUserStart = Date.now();
      try {
        let guestUser = await db.user.findUnique({ where: { email: guestEmail } });
        if (!guestUser) {
          guestUser = await db.user.create({
            data: {
              email: guestEmail,
              name: "Guest Founder",
              role: "Founder",
              subscriptionPlan: "Pro",
            },
          });
        }
        userId = guestUser.id;
        logger.addDatabaseTime(Date.now() - dbUserStart);
      } catch (dbUserErr: any) {
        const durationMs = Date.now() - dbUserStart;
        logger.addDatabaseTime(durationMs);
        logger.logPrismaError({ operation: "Guest User Resolution", durationMs, error: dbUserErr });
        userId = "guest_anon_" + Math.random().toString(36).substring(2, 9);
      }
    }

    // 3. Non-blocking Conversation & History Management
    let conversationId = reqConversationId || `conv_${Date.now()}`;
    const dbConvStart = Date.now();
    try {
      const existingConv = await db.conversation.findUnique({ where: { id: conversationId } });
      if (!existingConv) {
        const newConv = await db.conversation.create({
          data: {
            id: conversationId,
            userId,
            agentId: activeAgentId,
            title: userMessageContent.substring(0, 40) + "...",
          },
        });
        conversationId = newConv.id;
      }
      const dbConvMs = Date.now() - dbConvStart;
      logger.addDatabaseTime(dbConvMs);
      logger.logStep(2, "Conversation saved", dbConvMs, `Conv ID: ${conversationId}`);
    } catch (dbConvErr: any) {
      const dbConvMs = Date.now() - dbConvStart;
      logger.addDatabaseTime(dbConvMs);
      logger.logPrismaError({ operation: "Conversation Creation/Lookup", durationMs: dbConvMs, error: dbConvErr });
    }

    // Save User Message into DB safely (non-blocking)
    const dbMsgStart = Date.now();
    try {
      await db.message.create({
        data: {
          userId,
          conversationId,
          role: "user",
          content: userMessageContent,
          agentId: activeAgentId,
        },
      });
      const dbMsgMs = Date.now() - dbMsgStart;
      logger.addDatabaseTime(dbMsgMs);
      logger.logStep(3, "User message saved to database", dbMsgMs);
    } catch (dbMsgErr: any) {
      const dbMsgMs = Date.now() - dbMsgStart;
      logger.addDatabaseTime(dbMsgMs);
      logger.logPrismaError({ operation: "User Message Storage", durationMs: dbMsgMs, error: dbMsgErr });
    }

    // Format chat payload
    let payloadMessages: ChatMessagePayload[] = [];
    if (Array.isArray(rawMessages) && rawMessages.length > 0) {
      payloadMessages = rawMessages.map((m: any) => ({
        role: m.role === "assistant" || m.sender === "ai" ? "assistant" : "user",
        content: m.content || m.text || "",
      }));
    } else {
      payloadMessages = [{ role: "user", content: userMessageContent }];
    }

    // 4. Multi-Provider Failover Completion
    const { stream, providerName, modelName } = await MultiProviderAIEngine.streamChatCompletion({
      messages: payloadMessages,
      systemPrompt,
      logger,
    });

    // 5. Parse response and store assistant completion in database
    let fullAssistantResponse = "";
    const parseStart = Date.now();

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        fullAssistantResponse += text;
        controller.enqueue(chunk);
      },
      async flush() {
        const parseMs = Date.now() - parseStart;
        logger.setParsingTime(parseMs);
        logger.setContentLength(fullAssistantResponse.length);
        logger.logStep(5, `Parsed ${providerName} response stream`, parseMs, `${fullAssistantResponse.length} total chars`);

        if (fullAssistantResponse.trim() && conversationId && userId) {
          const dbSaveStart = Date.now();
          try {
            const savedMsg = await db.message.create({
              data: {
                userId,
                conversationId,
                role: "assistant",
                content: fullAssistantResponse.trim(),
                agentId: activeAgentId,
              },
            });
            const dbSaveMs = Date.now() - dbSaveStart;
            logger.addDatabaseTime(dbSaveMs);
            logger.logStep(6, "Assistant message saved", dbSaveMs, `Msg ID: ${savedMsg.id}`);
          } catch (dbSaveAssistantErr: any) {
            const dbSaveMs = Date.now() - dbSaveStart;
            logger.addDatabaseTime(dbSaveMs);
            logger.logPrismaError({ operation: "Assistant Message Storage", durationMs: dbSaveMs, error: dbSaveAssistantErr });
          }
        }

        logger.logStep(7, "Streaming completed & sent to frontend");
        logger.logSummary(true);
      },
    });

    const outputStream = stream.pipeThrough(transformStream);

    return new Response(outputStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Conversation-Id": conversationId,
        "X-Request-Id": logger.requestId,
        "X-Agent-Id": activeAgentId,
        "X-AI-Provider": providerName,
        "X-AI-Model": modelName,
      },
    });
  } catch (error: any) {
    logger.logError(8, "Chat Pipeline Exception Handled", error);
    logger.logSummary(false);

    return NextResponse.json(
      {
        success: false,
        error: "AI Co-Founder Service is active with failover engine.",
        requestId: logger.requestId,
        details: String(error.message || error),
      },
      { status: 200 } // Return 200 JSON payload instead of crashing with HTTP 500
    );
  }
}
