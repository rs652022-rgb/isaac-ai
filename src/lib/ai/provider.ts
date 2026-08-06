export interface AIProviderConfig {
  apiKey: string;
  baseUrl: string;
  defaultModel: string;
}

// Configurable default model constant (Qwen 3 / Qwen 2.5 72B on OpenRouter)
export const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || "qwen/qwen-2.5-72b-instruct";

/**
 * Returns the active OpenRouter AI provider configuration.
 * Reads OPENROUTER_API_KEY from environment variables server-side.
 */
export function getOpenRouterConfig(): AIProviderConfig {
  const apiKey = process.env.OPENROUTER_API_KEY || "";

  if (!apiKey && process.env.NODE_ENV !== "production") {
    console.warn("[AI Provider] WARNING: OPENROUTER_API_KEY is missing from environment variables.");
  }

  return {
    apiKey,
    baseUrl: "https://openrouter.ai/api/v1/chat/completions",
    defaultModel: DEFAULT_MODEL,
  };
}
