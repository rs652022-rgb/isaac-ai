import { NextResponse } from "next/server";
import { MultiProviderAIEngine } from "@/lib/ai/provider-engine";
import { db } from "@/lib/db";

export async function GET() {
  const timestamp = new Date().toISOString();
  const startTime = Date.now();

  // 1. Inspect configured environment keys
  const providers = MultiProviderAIEngine.getConfiguredProviders();
  const activeProvidersCount = providers.filter((p) => p.isConfigured).length;

  const envCheck = {
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY?.trim(),
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY?.trim(),
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY?.trim(),
    GROQ_API_KEY: !!process.env.GROQ_API_KEY?.trim(),
    OPENROUTER_API_KEY: !!process.env.OPENROUTER_API_KEY?.trim(),
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    DATABASE_URL: !!process.env.DATABASE_URL?.trim(),
  };

  // 2. Test database connection ping
  let dbStatus = "disconnected";
  let dbLatencyMs = 0;
  try {
    const dbStart = Date.now();
    await db.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - dbStart;
    dbStatus = "connected";
  } catch (err: any) {
    dbStatus = `error: ${err.message || String(err)}`;
  }

  const overallStatus =
    dbStatus === "connected" && activeProvidersCount > 0
      ? "healthy"
      : dbStatus === "connected"
      ? "warning"
      : "error";

  return NextResponse.json({
    status: overallStatus,
    timestamp,
    durationMs: Date.now() - startTime,
    service: "Isaac AI Co-Founder Pipeline",
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
    },
    aiProviders: {
      activeProvidersCount,
      fallbackEngineStatus: "active",
      providers,
    },
    environment: envCheck,
  });
}
