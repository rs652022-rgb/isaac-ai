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
 * Initiates a streaming completion request to OpenRouter (Qwen 3 by default).
 * Returns a Response object wrapping a ReadableStream for SSE chunk forwarding.
 */
export async function streamChatCompletion({
  messages,
  systemPrompt,
  model = DEFAULT_MODEL,
  temperature = 0.7,
}: StreamChatOptions): Promise<{ stream: ReadableStream; getFullText: () => Promise<string> }> {
  const config = getOpenRouterConfig();

  if (!config.apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured on the server.");
  }

  const formattedMessages: ChatMessagePayload[] = [];

  if (systemPrompt) {
    formattedMessages.push({
      role: "system",
      content: systemPrompt,
    });
  }

  formattedMessages.push(...messages);

  const response = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`,
      "HTTP-Referer": "https://isaac-ai.app",
      "X-Title": "Isaac AI Founder OS",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model || config.defaultModel,
      messages: formattedMessages,
      temperature,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[OpenRouter Error]", response.status, errorText);
    throw new Error(`OpenRouter API request failed with status ${response.status}: ${errorText}`);
  }

  if (!response.body) {
    throw new Error("OpenRouter API returned an empty response body.");
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
                // Ignore parse errors on partial chunks
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return {
    stream,
    getFullText: async () => {
      // If consumer reads the stream to end, this returns full text
      return fullAccumulatedText;
    },
  };
}
