import { getOpenRouterConfig, DEFAULT_MODEL } from "./provider";
import { RequestLogger } from "./logger";

export interface ChatMessagePayload {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface StreamChatOptions {
  messages: ChatMessagePayload[];
  systemPrompt?: string;
  model?: string;
  temperature?: number;
  timeoutMs?: number;
  logger?: RequestLogger;
}

/**
 * Initiates a streaming completion request to OpenRouter with 30s timeout and 1x auto-retry.
 * Endpoint: https://openrouter.ai/api/v1/chat/completions
 */
export async function streamChatCompletion({
  messages,
  systemPrompt,
  model = DEFAULT_MODEL,
  temperature = 0.7,
  timeoutMs = 30000,
  logger,
}: StreamChatOptions): Promise<{ stream: ReadableStream; getFullText: () => Promise<string> }> {
  const config = getOpenRouterConfig();
  const activeModel = model || config.defaultModel;

  const formattedMessages: ChatMessagePayload[] = [];
  if (systemPrompt) {
    formattedMessages.push({
      role: "system",
      content: systemPrompt,
    });
  }
  formattedMessages.push(...messages);

  logger?.logStep(4, "OpenRouter request sent", undefined, `Model: ${activeModel} | Context size: ${formattedMessages.length} msgs`);

  let response: Response | null = null;
  let lastError: Error | null = null;
  const maxAttempts = 2; // 1 initial + 1 automatic retry

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      logger?.logWarning(4, "OpenRouter Timeout", `Attempt ${attempt} timed out after ${timeoutMs}ms.`);
      controller.abort();
    }, timeoutMs);

    const startTime = Date.now();

    try {
      if (attempt > 1) {
        logger?.incrementRetryCount();
        logger?.logWarning(4, "OpenRouter Auto-Retry", `Retrying request to OpenRouter (Attempt ${attempt}/${maxAttempts})...`);
      }

      response = await fetch(config.baseUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.apiKey}`,
          "HTTP-Referer": "https://isaac-ai.app",
          "X-Title": "Isaac AI Founder OS",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: activeModel,
          messages: formattedMessages,
          temperature,
          stream: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timer);
      const latencyMs = Date.now() - startTime;

      if (response.ok) {
        logger?.setOpenRouterTime(latencyMs);
        logger?.logStep(5, "Response received", latencyMs, `HTTP ${response.status} OK`);
        break; // Successfully connected!
      } else {
        const errorText = await response.text();
        logger?.logError(4, `OpenRouter HTTP ${response.status} Error`, errorText);

        let parsedErrorMsg = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          parsedErrorMsg = errorJson.error?.message || errorJson.message || errorText;
        } catch {
          // Use raw text if not JSON
        }

        if (response.status === 401) {
          throw new Error(`[OpenRouter 401 Unauthorized] Invalid OPENROUTER_API_KEY. (${parsedErrorMsg})`);
        } else if (response.status === 402) {
          throw new Error(`[OpenRouter 402 Payment Required] Account has insufficient credits. (${parsedErrorMsg})`);
        } else if (response.status === 404) {
          throw new Error(`[OpenRouter 404 Not Found] Model "${activeModel}" not found on OpenRouter. (${parsedErrorMsg})`);
        } else if (response.status === 429) {
          lastError = new Error(`[OpenRouter 429 Rate Limited] (${parsedErrorMsg})`);
        } else {
          lastError = new Error(`[OpenRouter HTTP ${response.status}] (${parsedErrorMsg})`);
        }
      }
    } catch (err: any) {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        lastError = new Error(`OpenRouter API request timed out after ${timeoutMs / 1000} seconds.`);
      } else {
        lastError = err;
      }
      logger?.logError(4, `OpenRouter Connection Exception (Attempt ${attempt})`, lastError);
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }

  if (!response || !response.ok || !response.body) {
    const finalError = lastError || new Error("Failed to receive stream response from OpenRouter API.");
    logger?.logError(4, "OpenRouter All Attempts Failed", finalError);
    throw finalError;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullAccumulatedText = "";

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith(":")) continue;

            if (trimmed === "data: [DONE]") {
              controller.close();
              return;
            }

            if (trimmed.startsWith("data: ")) {
              const jsonStr = trimmed.slice(6);
              try {
                const parsed = JSON.parse(jsonStr);
                const deltaContent = parsed.choices?.[0]?.delta?.content || "";
                if (deltaContent) {
                  fullAccumulatedText += deltaContent;
                  controller.enqueue(new TextEncoder().encode(deltaContent));
                }
              } catch (e) {
                // Ignore parse errors on partial JSON chunks
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        logger?.logError(6, "Stream Decoding Error", err);
        controller.error(err);
      }
    },
  });

  return {
    stream,
    getFullText: async () => fullAccumulatedText,
  };
}
