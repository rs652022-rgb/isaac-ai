import dotenv from "dotenv";
dotenv.config();

async function testOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  console.log("OPENROUTER_API_KEY present:", !!apiKey);

  if (!apiKey) {
    console.warn("OPENROUTER_API_KEY is not set in .env file.");
    return;
  }

  console.log("Sending test request to OpenRouter API (qwen/qwen-2.5-72b-instruct)...");
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen/qwen-2.5-72b-instruct",
        messages: [{ role: "user", content: "Hello Isaac, give a 1-sentence welcome message." }],
        stream: false,
      }),
    });

    console.log("OpenRouter HTTP Status:", res.status);
    const data = await res.json();
    console.log("OpenRouter Response Payload:", JSON.stringify(data, null, 2));
  } catch (err: any) {
    console.error("OpenRouter API Test Error:", err.message);
  }
}

testOpenRouter();
