"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { Code2 } from "lucide-react";

export function ProductBuilderView() {
  const { founderProfile } = useApp();
  const [activeTab, setActiveTab] = useState<"schema" | "api" | "sprints">("schema");

  const SCHEMA_SNIPPET = `// Prisma Database Schema — ${founderProfile.startupName}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id               String      @id @default(cuid())
  email            String      @unique
  name             String?
  role             Role        @default(FOUNDER)
  subscriptionPlan Plan        @default(PRO)
  startups         Startup[]
  createdAt        DateTime    @default(now())
}

model Startup {
  id               String      @id @default(cuid())
  name             String
  industry         String
  country          String
  readinessScore   Int         @default(80)
  documents        Document[]
  createdAt        DateTime    @default(now())
}`;

  const API_ENDPOINTS = [
    { method: "POST", path: "/api/v1/agent/orchestrate", desc: "Dispatch prompt to 25 C-suite agents in parallel." },
    { method: "GET", path: "/api/v1/validation/matrix", desc: "Fetch SWOT, PESTLE, and Porter's 5 forces score." },
    { method: "POST", path: "/api/v1/documents/generate", desc: "Stream VC pitch deck or Delaware legal agreement PDF." },
    { method: "GET", path: "/api/v1/incorporation/countries", desc: "Retrieve legal fees and tax compliance calendars." }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Code2 className="w-3.5 h-3.5 text-white" />
            <span>PRODUCT & TECH ARCHITECTURE ARCHITECT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Product Builder</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Production-grade DB Schemas, API blueprints, and Next.js 14 architecture.
          </p>
        </div>
      </div>

      {/* Recommended Tech Stack Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 font-mono uppercase">Framework</span>
          <p className="text-xs font-bold text-white">Next.js 14 (App Router)</p>
          <p className="text-[10px] text-neutral-400">TypeScript + Tailwind CSS</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 font-mono uppercase">Database</span>
          <p className="text-xs font-bold text-white">PostgreSQL + Prisma</p>
          <p className="text-[10px] text-neutral-400">pgvector for AI RAG embeddings</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 font-mono uppercase">Cache</span>
          <p className="text-xs font-bold text-white">Redis (Upstash)</p>
          <p className="text-[10px] text-neutral-400">Rate limiting & LLM token cache</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 font-mono uppercase">AI SDK</span>
          <p className="text-xs font-bold text-white">Vercel AI SDK</p>
          <p className="text-[10px] text-neutral-400">Multi-agent streaming</p>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08] space-x-6 text-xs font-medium">
        <button
          onClick={() => setActiveTab("schema")}
          className={`pb-3 ${activeTab === "schema" ? "border-b-2 border-white text-white font-bold" : "text-neutral-500"}`}
        >
          Prisma Database Schema
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`pb-3 ${activeTab === "api" ? "border-b-2 border-white text-white font-bold" : "text-neutral-500"}`}
        >
          API Route Specs
        </button>
      </div>

      {activeTab === "schema" && (
        <GlassCard className="p-4 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/10 pb-2">
            <span>prisma/schema.prisma</span>
            <span className="text-white">PostgreSQL Ready</span>
          </div>
          <pre className="p-4 rounded-xl bg-black text-xs text-neutral-300 leading-relaxed overflow-x-auto">
            {SCHEMA_SNIPPET}
          </pre>
        </GlassCard>
      )}

      {activeTab === "api" && (
        <div className="space-y-3">
          {API_ENDPOINTS.map((api, idx) => (
            <GlassCard key={idx} className="p-4 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded bg-white text-black font-bold text-[10px]">
                  {api.method}
                </span>
                <span className="text-white font-semibold">{api.path}</span>
              </div>
              <span className="text-neutral-400">{api.desc}</span>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
