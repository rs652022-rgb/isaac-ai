# Isaac AI Founder Operating System

Isaac AI is an AI startup co-founder platform powered by OpenRouter (Qwen 3 default model), streaming responses, Next.js 16 App Router, NextAuth, and Supabase conversation history via Prisma.

---

## 🛠️ Environment Variables Configuration

Copy `.env.example` to `.env` and configure your credentials:

```bash
cp .env.example .env
```

### Required Environment Variables

| Variable Name | Description | Example / Default |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Server-side API Key from [OpenRouter](https://openrouter.ai/keys) | `sk-or-v1-...` |
| `OPENROUTER_MODEL` | Configurable OpenRouter model identifier | `qwen/qwen-2.5-72b-instruct` or `qwen/qwen3-235b-a22b` |
| `DATABASE_URL` | Supabase PostgreSQL Connection URL | `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres?sslmode=require` |
| `DIRECT_URL` | Direct PostgreSQL Connection URL | `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres?sslmode=require` |
| `AUTH_SECRET` | NextAuth secret key for session signing | `c5c833d0fb8181d8c60bbe8e932a438908eb62bdc192f8ff...` |
| `AUTH_URL` | Application root URL | `http://localhost:3000` |
| `AI_DEBUG` | Toggle detailed step-by-step pipeline logging | `true` or `false` |

> ⚠️ **Security Warning**: `OPENROUTER_API_KEY` is strictly accessed server-side in Next.js Route Handlers (`/api/chat`) and is never exposed in client bundles or browser network requests.

---

## 🔍 Structured Observability & AI Debug System

Set `AI_DEBUG=true` in `.env` to enable end-to-end request tracing across all 8 pipeline steps:

```
==================================================
REQUEST ID: chat_172292100_a4b9
STEP 1: User message received ✅ (Len: 42 chars)
STEP 2: Conversation saved (38ms) | Conv ID: conv_172292100 ✅
STEP 3: User message saved to database (14ms) ✅
STEP 4: OpenRouter request sent (Model: qwen/qwen-2.5-72b-instruct) ✅
STEP 5: Response received (1420ms) | HTTP 200 OK ✅
STEP 6: Parsed AI response stream (480ms) | 642 total chars ✅
STEP 7: Assistant message saved (22ms) | Msg ID: msg_172292104 ✅
STEP 8: Streaming completed & sent to frontend ✅

METRICS BREAKDOWN:
- Database Time:    74ms
- OpenRouter Time:  1420ms
- Parsing Time:     480ms
- Total Duration:   1974ms
- Response Size:    642 chars
==================================================
```

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Sync Supabase Database Schema**:
   ```bash
   npx prisma generate
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture & OpenRouter Qwen 3 Integration

- **Modular AI Layer**: `src/lib/ai/provider.ts`, `src/lib/ai/chat.ts`, `src/lib/ai/systemPrompt.ts`
- **Streaming API Route**: `src/app/api/chat/route.ts` (returns `ReadableStream` Server-Sent Events)
- **Fault-Tolerant Database**: Supabase connection failures (`ENOTFOUND`) are caught gracefully and logged, enabling un-interrupted AI completions even if database storage is offline.
