import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getAgentSystemPrompt } from "@/lib/ai/systemPrompt";
import { validateOpenRouterKey } from "@/lib/ai/provider";
import { streamChatCompletion, ChatMessagePayload } from "@/lib/ai/chat";
import { RequestLogger } from "@/lib/ai/logger";

export async function POST(req: NextRequest) {
  // Extract custom Request ID from header or generate a new unique ID
  const incomingReqId = req.headers.get("X-Request-Id");
  const logger = new RequestLogger(incomingReqId || undefined);

  // Validate OpenRouter API key presence server-side before execution
  const keyValidation = validateOpenRouterKey();
  if (!keyValidation.isValid) {
    logger.logError(0, "OpenRouter Key Validation", keyValidation.error);
    logger.logSummary(false);
    return NextResponse.json(
      { error: keyValidation.error, requestId: logger.requestId },
      { status: 500 }
    );
  }

  try {
    const body = await req.json().catch((err) => {
      logger.logParsingError({ step: "JSON Body Parsing", error: err });
      return {};
    });

    const { content, conversationId: reqConversationId, agentId = "orchestrator" } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      logger.logWarning(1, "Input Validation", "Missing or empty content parameter.");
      logger.logSummary(false);
      return NextResponse.json({ error: "Message content is required.", requestId: logger.requestId }, { status: 400 });
    }

    // 1. User message received
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

    logger.logStep(
      1,
      "User message received",
      undefined,
      `User ID: ${userId} | Message Length: ${content.length} chars`
    );

    // 2 & 3. Conversation save started & completed
    let conversationId = reqConversationId || `conv_${Date.now()}`;
    const dbConvStart = Date.now();
    try {
      const existingConv = await db.conversation.findUnique({ where: { id: conversationId } });
      if (!existingConv) {
        const newConv = await db.conversation.create({
          data: {
            id: conversationId,
            userId,
            agentId,
            title: content.substring(0, 40) + "...",
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

    // Save User Message into Supabase safely
    const dbMsgStart = Date.now();
    try {
      await db.message.create({
        data: {
          userId,
          conversationId,
          role: "user",
          content: content.trim(),
          agentId,
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

    // Load past conversation history from Supabase safely
    let payloadMessages: ChatMessagePayload[] = [];
    const dbHistStart = Date.now();
    try {
      const pastMessages = await db.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
        take: 30,
      });

      const dbHistMs = Date.now() - dbHistStart;
      logger.addDatabaseTime(dbHistMs);

      if (pastMessages.length > 0) {
        payloadMessages = pastMessages.map((msg) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        }));
      }
    } catch (dbHistErr: any) {
      const dbHistMs = Date.now() - dbHistStart;
      logger.addDatabaseTime(dbHistMs);
      logger.logPrismaError({ operation: "History List Fetch", durationMs: dbHistMs, error: dbHistErr });
    }

    if (payloadMessages.length === 0) {
      payloadMessages = [{ role: "user", content: content.trim() }];
    }

    // 4 & 5. OpenRouter request started & response received
    const systemPrompt = getAgentSystemPrompt(agentId);

    const { stream } = await streamChatCompletion({
      messages: payloadMessages,
      systemPrompt,
      logger,
    });

    // 6, 7 & 8. Parse response, save assistant message, and send response stream
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
        logger.logStep(5, "Parsed AI response stream", parseMs, `${fullAssistantResponse.length} total chars`);

        if (fullAssistantResponse.trim() && conversationId && userId) {
          const dbSaveStart = Date.now();
          try {
            const savedMsg = await db.message.create({
              data: {
                userId,
                conversationId,
                role: "assistant",
                content: fullAssistantResponse.trim(),
                agentId,
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
      },
    });
  } catch (error: any) {
    logger.logError(8, "Chat Pipeline Exception", error);
    logger.logSummary(false);

    // Keep user-friendly error message in production, print full error to server console
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred in the AI co-founder service layer.",
        requestId: logger.requestId,
        details: process.env.NODE_ENV !== "production" ? String(error.stack || error) : undefined,
      },
      { status: 500 }
    );
  }
}
