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

> ⚠️ **Security Warning**: `OPENROUTER_API_KEY` is strictly accessed server-side in Next.js Route Handlers (`/api/chat`) and is never exposed in client bundles or browser network requests.

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
