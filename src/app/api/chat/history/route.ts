import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agentId") || "orchestrator";
    const conversationId = searchParams.get("conversationId");

    let session = null;
    try {
      session = await auth();
    } catch (e: any) {
      console.warn("[Chat History API Warning] Session lookup failed:", e.message || e);
    }

    let userId = session?.user?.id;

    if (!userId) {
      try {
        const guestUser = await db.user.findUnique({ where: { email: "guest@isaac.ai" } });
        userId = guestUser?.id;
      } catch (dbErr: any) {
        console.error("[Database Warning - History User lookup failed]:", dbErr.message || dbErr);
      }
    }

    if (!userId) {
      return NextResponse.json({ messages: [], conversationId: null });
    }

    let targetConvId = conversationId;

    if (!targetConvId) {
      try {
        const latestConv = await db.conversation.findFirst({
          where: { userId, agentId },
          orderBy: { updatedAt: "desc" },
        });
        targetConvId = latestConv?.id || null;
      } catch (dbConvErr: any) {
        console.error("[Database Warning - Latest conversation lookup failed]:", dbConvErr.message || dbConvErr);
      }
    }

    if (!targetConvId) {
      return NextResponse.json({ messages: [], conversationId: null });
    }

    try {
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
    } catch (dbMsgsErr: any) {
      console.error("[Database Warning - Message list fetch failed]:", dbMsgsErr.message || dbMsgsErr);
      return NextResponse.json({ messages: [], conversationId: targetConvId });
    }
  } catch (error: any) {
    console.error("[Chat History Critical Error]", error);
    return NextResponse.json({ messages: [], conversationId: null }, { status: 200 });
  }
}
