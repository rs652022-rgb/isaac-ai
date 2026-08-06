import { getOpenRouterConfig, DEFAULT_MODEL } from "./provider";

export interface ChatMessagePayload {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface StreamChatOptions {
  messages: ChatMessagePayload[];
  systemPrompt?: string;
  model?: string;
  temperature?: number;
}

/**
 * Initiates a streaming completion request to OpenRouter.
 * Endpoint: https://openrouter.ai/api/v1/chat/completions
 */
export async function streamChatCompletion({
  messages,
  systemPrompt,
  model = DEFAULT_MODEL,
  temperature = 0.7,
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

  console.log(`[OpenRouter Request] Dispatching completion to model "${activeModel}" via endpoint ${config.baseUrl}`);
  console.log(`[OpenRouter Payload] ${formattedMessages.length} total messages in context payload.`);

  const startTime = Date.now();

  const response = await fetch(config.baseUrl, {
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
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[OpenRouter HTTP Error ${response.status}] Request failed in ${Date.now() - startTime}ms.`);
    console.error(`[OpenRouter Error Details]:`, errorText);

    let parsedErrorMsg = errorText;
    try {
      const errorJson = JSON.parse(errorText);
      parsedErrorMsg = errorJson.error?.message || errorJson.message || errorText;
    } catch {
      // Use raw text if not JSON
    }

    if (response.status === 401) {
      throw new Error(`[OpenRouter 401 Unauthorized] Invalid OPENROUTER_API_KEY. Please verify your API key in .env. (${parsedErrorMsg})`);
    } else if (response.status === 402) {
      throw new Error(`[OpenRouter 402 Payment Required] Your OpenRouter account has insufficient credits. (${parsedErrorMsg})`);
    } else if (response.status === 404) {
      throw new Error(`[OpenRouter 404 Not Found] Model "${activeModel}" was not found on OpenRouter. (${parsedErrorMsg})`);
    } else if (response.status === 429) {
      throw new Error(`[OpenRouter 429 Rate Limited] API rate limit exceeded. (${parsedErrorMsg})`);
    } else {
      throw new Error(`OpenRouter API request failed (${response.status}): ${parsedErrorMsg}`);
    }
  }

  if (!response.body) {
    console.error("[OpenRouter Error] Response body is null.");
    throw new Error("OpenRouter API returned an empty response body.");
  }

  console.log(`[OpenRouter Response] Received HTTP 200 OK stream in ${Date.now() - startTime}ms. Piping text chunks...`);

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
                // Ignore parse errors on partial chunks
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        console.error("[OpenRouter Stream Decoding Error]", err);
        controller.error(err);
      }
    },
  });

  return {
    stream,
    getFullText: async () => {
      return fullAccumulatedText;
    },
  };
}
