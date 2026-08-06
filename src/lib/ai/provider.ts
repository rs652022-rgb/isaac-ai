export interface AIProviderConfig {
  apiKey: string;
  baseUrl: string;
  defaultModel: string;
}

// Configurable default model constant (Qwen 3 default or configured model)
export const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || "qwen/qwen-2.5-72b-instruct";

/**
 * Validates the presence of OPENROUTER_API_KEY in process.env server-side.
 */
export function validateOpenRouterKey(): { isValid: boolean; apiKey: string; error?: string } {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim() || "";

  if (!apiKey) {
    const errorMsg =
      "[OpenRouter Configuration Error] OPENROUTER_API_KEY is not defined in process.env or .env file. Please add OPENROUTER_API_KEY=\"sk-or-v1-...\" to your .env file to enable AI inference.";
    console.error(errorMsg);
    return {
      isValid: false,
      apiKey: "",
      error: errorMsg,
    };
  }

  return {
    isValid: true,
    apiKey,
  };
}

/**
 * Returns the active OpenRouter AI provider configuration.
 * Reads OPENROUTER_API_KEY strictly from environment variables server-side.
 */
export function getOpenRouterConfig(): AIProviderConfig {
  const validation = validateOpenRouterKey();

  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  return {
    apiKey: validation.apiKey,
    baseUrl: "https://openrouter.ai/api/v1/chat/completions",
    defaultModel: DEFAULT_MODEL,
  };
}
