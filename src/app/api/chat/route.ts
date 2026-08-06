import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getAgentSystemPrompt } from "@/lib/ai/systemPrompt";
import { validateOpenRouterKey } from "@/lib/ai/provider";
import { streamChatCompletion, ChatMessagePayload } from "@/lib/ai/chat";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log(`[Chat API] Incoming POST request at ${new Date().toISOString()}`);

  // Validate OpenRouter API key presence server-side before execution
  const keyValidation = validateOpenRouterKey();
  if (!keyValidation.isValid) {
    console.error("[Chat API Error] Aborting chat request due to missing OPENROUTER_API_KEY.");
    return NextResponse.json(
      { error: keyValidation.error },
      { status: 500 }
    );
  }

  try {
    const body = await req.json().catch((err) => {
      console.error("[Chat API Error] Failed to parse JSON body:", err);
      return {};
    });

    const { content, conversationId: reqConversationId, agentId = "orchestrator" } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      console.warn("[Chat API Warning] Validation failed: missing or empty content parameter.");
      return NextResponse.json({ error: "Message content is required." }, { status: 400 });
    }

    // 1. Authenticate user session safely
    let session = null;
    try {
      session = await auth();
    } catch (authErr: any) {
      console.warn("[Chat API Warning] NextAuth session lookup failed:", authErr.message || authErr);
    }

    // 2. Resolve User ID (DB lookups wrapped in try/catch for 100% fault tolerance)
    let userId = session?.user?.id;
    if (!userId) {
      const guestEmail = "guest@isaac.ai";
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
      } catch (dbUserErr: any) {
        console.error("[Database Warning - User lookup failed]:", dbUserErr.message || dbUserErr);
        userId = "guest_anon_" + Math.random().toString(36).substring(2, 9);
      }
    }

    // 3. Resolve Conversation ID safely (DB lookups wrapped in try/catch)
    let conversationId = reqConversationId || `conv_${Date.now()}`;
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
        console.log(`[Database Success] Created conversation ${conversationId} in Supabase.`);
      }
    } catch (dbConvErr: any) {
      console.error("[Database Warning - Conversation creation failed]:", dbConvErr.message || dbConvErr);
      // Fallback: Proceed with client/generated conversationId without failing AI inference
    }

    // 4. Save User Message into Supabase safely
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
      console.log(`[Database Success] Persisted user message for conversation ${conversationId}.`);
    } catch (dbMsgErr: any) {
      console.error("[Database Warning - User message storage failed]:", dbMsgErr.message || dbMsgErr);
      // Fallback: Continue execution smoothly
    }

    // 5. Load past conversation history from Supabase safely (Requirement 9)
    let payloadMessages: ChatMessagePayload[] = [];
    try {
      const pastMessages = await db.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
        take: 30,
      });

      if (pastMessages.length > 0) {
        payloadMessages = pastMessages.map((msg) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        }));
      }
    } catch (dbHistErr: any) {
      console.error("[Database Warning - Conversation history fetch failed]:", dbHistErr.message || dbHistErr);
    }

    // If no past history could be fetched from DB, use current user message
    if (payloadMessages.length === 0) {
      payloadMessages = [{ role: "user", content: content.trim() }];
    }

    // 6. Resolve system prompt for Isaac AI & active agent persona
    const systemPrompt = getAgentSystemPrompt(agentId);

    console.log(`[Chat API] Executing OpenRouter AI completion request for model: qwen/qwen-2.5-72b-instruct (Agent: ${agentId})`);

    // 7. Execute OpenRouter AI Streaming Completion Request (Requirement 8 - OpenRouter execution confirmed)
    const { stream } = await streamChatCompletion({
      messages: payloadMessages,
      systemPrompt,
    });

    // 8. Stream response chunks to client & asynchronously persist assistant response to Supabase
    let fullAssistantResponse = "";
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        fullAssistantResponse += text;
        controller.enqueue(chunk);
      },
      async flush() {
        const duration = Date.now() - startTime;
        console.log(`[Chat API] Stream completed in ${duration}ms. Full response length: ${fullAssistantResponse.length} chars.`);

        if (fullAssistantResponse.trim() && conversationId && userId) {
          try {
            await db.message.create({
              data: {
                userId,
                conversationId,
                role: "assistant",
                content: fullAssistantResponse.trim(),
                agentId,
              },
            });
            console.log(`[Database Success] Saved assistant message for conversation ${conversationId}.`);
          } catch (dbSaveAssistantErr: any) {
            console.error("[Database Warning - Assistant message storage failed]:", dbSaveAssistantErr.message || dbSaveAssistantErr);
          }
        }
      },
    });

    const outputStream = stream.pipeThrough(transformStream);

    return new Response(outputStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Conversation-Id": conversationId,
      },
    });
  } catch (error: any) {
    console.error("[Chat API Critical Error]", error.stack || error.message || error);
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred in the AI co-founder service layer.",
        details: process.env.NODE_ENV !== "production" ? String(error.stack || error) : undefined,
      },
      { status: 500 }
    );
  }
}
