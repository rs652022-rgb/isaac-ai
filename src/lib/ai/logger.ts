/**
 * Structured AI Pipeline Logger & Observability System
 * Enabled when process.env.AI_DEBUG === "true" (server) or NEXT_PUBLIC_AI_DEBUG === "true" (browser).
 */

export function isDebugEnabled(): boolean {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_AI_DEBUG === "true" || process.env.NODE_ENV !== "production";
  }
  return process.env.AI_DEBUG === "true" || process.env.NODE_ENV !== "production";
}

export interface PipelineMetrics {
  databaseTimeMs: number;
  openRouterTimeMs: number;
  parsingTimeMs: number;
  totalDurationMs: number;
  contentLength: number;
  retryCount: number;
}

export class RequestLogger {
  public requestId: string;
  private startTime: number;
  private metrics: PipelineMetrics;
  private isDebug: boolean;
  private stepTimestamps: Map<string, number>;

  constructor(requestId?: string) {
    this.requestId = requestId || `chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.startTime = Date.now();
    this.isDebug = isDebugEnabled();
    this.stepTimestamps = new Map();
    this.metrics = {
      databaseTimeMs: 0,
      openRouterTimeMs: 0,
      parsingTimeMs: 0,
      totalDurationMs: 0,
      contentLength: 0,
      retryCount: 0,
    };

    if (this.isDebug) {
      console.log(`\n==================================================`);
      console.log(`[AI LOGGER] INITIALIZING REQUEST: ${this.requestId}`);
      console.log(`==================================================`);
    }
  }

  public startStepTimer(stepKey: string) {
    this.stepTimestamps.set(stepKey, Date.now());
  }

  public endStepTimer(stepKey: string): number {
    const start = this.stepTimestamps.get(stepKey);
    if (!start) return 0;
    const elapsed = Date.now() - start;
    this.stepTimestamps.delete(stepKey);
    return elapsed;
  }

  public addDatabaseTime(ms: number) {
    this.metrics.databaseTimeMs += ms;
  }

  public setOpenRouterTime(ms: number) {
    this.metrics.openRouterTimeMs = ms;
  }

  public setParsingTime(ms: number) {
    this.metrics.parsingTimeMs = ms;
  }

  public setContentLength(len: number) {
    this.metrics.contentLength = len;
  }

  public incrementRetryCount() {
    this.metrics.retryCount++;
  }

  public logStep(stepNum: number, stepName: string, durationMs?: number, extraInfo?: string) {
    if (!this.isDebug) return;
    const timeStr = durationMs !== undefined ? ` (${durationMs}ms)` : "";
    const infoStr = extraInfo ? ` | ${extraInfo}` : "";
    console.log(`[${this.requestId}] STEP ${stepNum}: ${stepName}${timeStr}${infoStr} ✅`);
  }

  public logWarning(stepNum: number, stepName: string, warningMessage: string) {
    console.warn(`[${this.requestId}] STEP ${stepNum}: ${stepName} ⚠️ [Warning: ${warningMessage}]`);
  }

  public logError(stepNum: number, stepName: string, error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error(`\n--------------------------------------------------`);
    console.error(`[${this.requestId}] STEP ${stepNum}: ${stepName} FAILED ❌`);
    console.error(`TIMESTAMP: ${new Date().toISOString()}`);
    console.error(`ERROR MESSAGE: ${errorMsg}`);
    if (stack) {
      console.error(`STACK TRACE:\n${stack}`);
    }
    console.error(`--------------------------------------------------\n`);
  }

  public logSummary(success: boolean = true) {
    this.metrics.totalDurationMs = Date.now() - this.startTime;
    if (!this.isDebug) return;

    console.log(`==================================================`);
    console.log(`REQUEST ID: ${this.requestId}`);
    console.log(`STATUS: ${success ? "SUCCESS ✅" : "FAILED ❌"}`);
    console.log(`METRICS BREAKDOWN:`);
    console.log(`- Database Time:    ${this.metrics.databaseTimeMs}ms`);
    console.log(`- OpenRouter Time:  ${this.metrics.openRouterTimeMs}ms`);
    console.log(`- Parsing Time:     ${this.metrics.parsingTimeMs}ms`);
    console.log(`- Total Duration:   ${this.metrics.totalDurationMs}ms`);
    console.log(`- Response Size:    ${this.metrics.contentLength} chars`);
    if (this.metrics.retryCount > 0) {
      console.log(`- Retries Executed: ${this.metrics.retryCount}`);
    }
    console.log(`==================================================\n`);
  }
}

/**
 * Browser-side structured logging helper.
 */
export function logBrowserStep(requestId: string, stepName: string, extra?: any) {
  if (isDebugEnabled()) {
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    console.log(`%c[ISAAC AI UI] [${requestId}] ${stepName} (${timeStr})`, "color: #38bdf8; font-weight: bold;", extra || "");
  }
}

export function logBrowserError(requestId: string, stepName: string, error: any) {
  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  console.error(`%c[ISAAC AI UI ERROR] [${requestId}] ${stepName} (${timeStr})`, "color: #ef4444; font-weight: bold;", error);
}
