import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agentId") || "orchestrator";
    const conversationId = searchParams.get("conversationId");

    let userId = session?.user?.id;
    if (!userId) {
      const guestUser = await db.user.findUnique({ where: { email: "guest@isaac.ai" } });
      userId = guestUser?.id;
    }

    if (!userId) {
      return NextResponse.json({ messages: [], conversationId: null });
    }

    let targetConvId = conversationId;

    if (!targetConvId) {
      // Find latest conversation for this user and agent
      const latestConv = await db.conversation.findFirst({
        where: { userId, agentId },
        orderBy: { updatedAt: "desc" },
      });
      targetConvId = latestConv?.id || null;
    }

    if (!targetConvId) {
      return NextResponse.json({ messages: [], conversationId: null });
    }

    const dbMessages = await db.message.findMany({
      where: { conversationId: targetConvId },
      orderBy: { createdAt: "asc" },
    });

    const messages = dbMessages.map((m) => ({
      id: m.id,
      sender: m.role === "user" ? "user" : (m.agentId || agentId),
      senderName: m.role === "user" ? (session?.user?.name || "Founder") : "Isaac",
      avatar: m.role === "user" ? "👤" : "🤖",
      content: m.content,
      timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }));

    return NextResponse.json({
      messages,
      conversationId: targetConvId,
    });
  } catch (error: any) {
    console.error("[Chat History API Error]", error);
    return NextResponse.json({ error: error.message || "Failed to load chat history" }, { status: 500 });
  }
}
