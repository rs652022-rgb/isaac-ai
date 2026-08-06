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

export interface OpenRouterLogParams {
  model: string;
  httpStatus: number;
  durationMs: number;
  responseBody?: string;
  tokenUsage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  error?: any;
}

export interface PrismaLogParams {
  operation: string;
  durationMs: number;
  error: any;
}

export interface NetworkLogParams {
  targetUrl: string;
  durationMs: number;
  error: any;
}

export interface ParsingLogParams {
  step: string;
  rawChunk?: string;
  error: any;
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

  /**
   * Log 1-6: Detailed OpenRouter Response & HTTP Status
   */
  public logOpenRouterDetails(params: OpenRouterLogParams) {
    console.log(`\n==================================================`);
    console.log(`REQUEST ID: ${this.requestId}`);
    console.log(`STEP: OpenRouter Inference Request`);
    console.log(`MODEL: ${params.model}`);
    console.log(`HTTP STATUS: ${params.httpStatus} ${params.httpStatus >= 200 && params.httpStatus < 300 ? "OK ✅" : "FAILED ❌"}`);
    console.log(`DURATION: ${params.durationMs}ms`);
    if (params.tokenUsage) {
      const tu = params.tokenUsage;
      console.log(`TOKEN USAGE: Prompt: ${tu.promptTokens ?? "N/A"} | Completion: ${tu.completionTokens ?? "N/A"} | Total: ${tu.totalTokens ?? "N/A"}`);
    }
    if (params.responseBody) {
      console.log(`RESPONSE BODY:\n${params.responseBody}`);
    }
    if (params.error) {
      const errStr = params.error instanceof Error ? params.error.stack || params.error.message : String(params.error);
      console.error(`OPENROUTER ERROR DETAILS:\n${errStr}`);
    }
    console.log(`==================================================\n`);
  }

  /**
   * Log 7: Timeout details
   */
  public logTimeout(step: string, timeoutMs: number, attempt: number) {
    console.warn(`\n--------------------------------------------------`);
    console.warn(`[TIMEOUT EXCEEDED]`);
    console.warn(`Request ID: ${this.requestId}`);
    console.warn(`Step: ${step}`);
    console.warn(`Timeout Limit: ${timeoutMs}ms`);
    console.warn(`Attempt: ${attempt}`);
    console.warn(`Timestamp: ${new Date().toISOString()}`);
    console.warn(`--------------------------------------------------\n`);
  }

  /**
   * Log 8: Prisma Database Errors Separately
   */
  public logPrismaError(params: PrismaLogParams) {
    const errorMsg = params.error instanceof Error ? params.error.message : String(params.error);
    const stack = params.error instanceof Error ? params.error.stack : undefined;
    console.error(`\n--------------------------------------------------`);
    console.error(`[PRISMA DATABASE ERROR]`);
    console.error(`Request ID: ${this.requestId}`);
    console.error(`Operation: ${params.operation}`);
    console.error(`Execution Time: ${params.durationMs}ms`);
    console.error(`Error Message: ${errorMsg}`);
    if (stack) {
      console.error(`Prisma Stack Trace:\n${stack}`);
    }
    console.error(`--------------------------------------------------\n`);
  }

  /**
   * Log 9: Network Connection Errors Separately
   */
  public logNetworkError(params: NetworkLogParams) {
    const errorMsg = params.error instanceof Error ? params.error.message : String(params.error);
    const stack = params.error instanceof Error ? params.error.stack : undefined;
    console.error(`\n--------------------------------------------------`);
    console.error(`[NETWORK CONNECTION ERROR]`);
    console.error(`Request ID: ${this.requestId}`);
    console.error(`Target URL: ${params.targetUrl}`);
    console.error(`Latency Before Failure: ${params.durationMs}ms`);
    console.error(`Network Error: ${errorMsg}`);
    if (stack) {
      console.error(`Network Stack Trace:\n${stack}`);
    }
    console.error(`--------------------------------------------------\n`);
  }

  /**
   * Log 10: Stream Parsing Errors Separately
   */
  public logParsingError(params: ParsingLogParams) {
    const errorMsg = params.error instanceof Error ? params.error.message : String(params.error);
    console.error(`\n--------------------------------------------------`);
    console.error(`[PARSING ERROR]`);
    console.error(`Request ID: ${this.requestId}`);
    console.error(`Step: ${params.step}`);
    if (params.rawChunk) {
      console.error(`Raw Chunk Content: ${params.rawChunk}`);
    }
    console.error(`Parse Exception: ${errorMsg}`);
    console.error(`--------------------------------------------------\n`);
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
