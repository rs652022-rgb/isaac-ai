import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getAgentSystemPrompt } from "@/lib/ai/systemPrompt";
import { streamChatCompletion, ChatMessagePayload } from "@/lib/ai/chat";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();

    const { content, conversationId: reqConversationId, agentId = "orchestrator" } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Message content is required." }, { status: 400 });
    }

    // Determine user ID (authenticated user or persistent guest)
    let userId = session?.user?.id;
    if (!userId) {
      // Find or create default guest user in database
      const guestEmail = "guest@isaac.ai";
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
    }

    // Ensure conversation exists in Supabase
    let conversationId = reqConversationId;
    if (!conversationId) {
      const newConv = await db.conversation.create({
        data: {
          userId,
          agentId,
          title: content.substring(0, 40) + "...",
        },
      });
      conversationId = newConv.id;
    } else {
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
    }

    // Save user message into Supabase
    const userMsg = await db.message.create({
      data: {
        userId,
        conversationId,
        role: "user",
        content: content.trim(),
        agentId,
      },
    });

    // Requirement 9: Load previous conversation history from Supabase before generating response
    const pastMessages = await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: 30,
    });

    const payloadMessages: ChatMessagePayload[] = pastMessages.map((msg) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    }));

    // Get system prompt for active agent persona & Isaac co-founder rules
    const systemPrompt = getAgentSystemPrompt(agentId);

    // Call OpenRouter stream completion (Qwen 3 default model)
    const { stream, getFullText } = await streamChatCompletion({
      messages: payloadMessages,
      systemPrompt,
    });

    // Prepare response transform stream to save assistant response into Supabase upon completion
    let fullResponseText = "";
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        fullResponseText += text;
        controller.enqueue(chunk);
      },
      async flush() {
        if (fullResponseText.trim() && conversationId && userId) {
          try {
            await db.message.create({
              data: {
                userId,
                conversationId,
                role: "assistant",
                content: fullResponseText.trim(),
                agentId,
              },
            });
          } catch (dbErr) {
            console.error("[Chat Route] Error saving assistant response to Supabase:", dbErr);
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
        "X-User-Msg-Id": userMsg.id,
      },
    });
  } catch (error: any) {
    console.error("[Chat API Error]", error);
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred while communicating with the AI co-founder.",
      },
      { status: 500 }
    );
  }
}
