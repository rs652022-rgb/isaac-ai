import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { RequestLogger } from "@/lib/ai/logger";

export async function GET(req: NextRequest) {
  const logger = new RequestLogger();
  logger.logStep(1, "History fetch requested");

  try {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agentId") || "orchestrator";
    const conversationId = searchParams.get("conversationId");

    let session = null;
    try {
      session = await auth();
    } catch (e: any) {
      logger.logWarning(1, "Auth Session Lookup", e.message || String(e));
    }

    let userId = session?.user?.id;

    if (!userId) {
      try {
        const dbStart = Date.now();
        const guestUser = await db.user.findUnique({ where: { email: "guest@isaac.ai" } });
        userId = guestUser?.id;
        logger.addDatabaseTime(Date.now() - dbStart);
      } catch (dbErr: any) {
        logger.logWarning(1, "History User Lookup", dbErr.message || String(dbErr));
      }
    }

    if (!userId) {
      logger.logStep(2, "No user ID resolved for history", undefined, "Returning empty array");
      logger.logSummary(true);
      return NextResponse.json({ messages: [], conversationId: null });
    }

    let targetConvId = conversationId;

    if (!targetConvId) {
      try {
        const dbStart = Date.now();
        const latestConv = await db.conversation.findFirst({
          where: { userId, agentId },
          orderBy: { updatedAt: "desc" },
        });
        targetConvId = latestConv?.id || null;
        logger.addDatabaseTime(Date.now() - dbStart);
      } catch (dbConvErr: any) {
        logger.logWarning(2, "Latest Conversation Lookup", dbConvErr.message || String(dbConvErr));
      }
    }

    if (!targetConvId) {
      logger.logStep(2, "No target conversation found", undefined, "Returning empty array");
      logger.logSummary(true);
      return NextResponse.json({ messages: [], conversationId: null });
    }

    try {
      const dbStart = Date.now();
      const dbMessages = await db.message.findMany({
        where: { conversationId: targetConvId },
        orderBy: { createdAt: "asc" },
      });
      const dbMs = Date.now() - dbStart;
      logger.addDatabaseTime(dbMs);

      const messages = dbMessages.map((m) => ({
        id: m.id,
        sender: m.role === "user" ? "user" : (m.agentId || agentId),
        senderName: m.role === "user" ? (session?.user?.name || "Founder") : "Isaac",
        avatar: m.role === "user" ? "👤" : "🤖",
        content: m.content,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));

      logger.logStep(3, "History loaded from Supabase", dbMs, `${messages.length} messages retrieved`);
      logger.logSummary(true);

      return NextResponse.json({
        messages,
        conversationId: targetConvId,
      });
    } catch (dbMsgsErr: any) {
      logger.logWarning(3, "Message List Fetch", dbMsgsErr.message || String(dbMsgsErr));
      logger.logSummary(true);
      return NextResponse.json({ messages: [], conversationId: targetConvId });
    }
  } catch (error: any) {
    logger.logError(4, "History API Exception", error);
    logger.logSummary(false);
    return NextResponse.json({ messages: [], conversationId: null }, { status: 200 });
  }
}
