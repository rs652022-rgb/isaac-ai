"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Code2, Database, Server, Cpu, Layers, Terminal, CheckCircle2, Play } from "lucide-react";

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono mb-1">
            <Code2 className="w-4 h-4" />
            <span>PRODUCT & TECH ARCHITECTURE ARCHITECT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Product Builder</h1>
          <p className="text-xs text-slate-400 mt-1">
            Production-grade DB Schemas, API blueprints, and Next.js 14 architecture.
          </p>
        </div>
      </div>

      {/* Recommended Tech Stack Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard glow="indigo" className="p-4 space-y-2">
          <span className="text-[10px] text-indigo-400 font-mono uppercase">Frontend Framework</span>
          <p className="text-sm font-bold text-white">Next.js 14 (App Router)</p>
          <p className="text-[11px] text-slate-400">TypeScript + Tailwind CSS + Framer Motion</p>
        </GlassCard>
        <GlassCard glow="cyan" className="p-4 space-y-2">
          <span className="text-[10px] text-cyan-400 font-mono uppercase">Database Engine</span>
          <p className="text-sm font-bold text-white">PostgreSQL + Prisma</p>
          <p className="text-[11px] text-slate-400">pgvector for AI RAG embeddings</p>
        </GlassCard>
        <GlassCard glow="emerald" className="p-4 space-y-2">
          <span className="text-[10px] text-emerald-400 font-mono uppercase">State & Cache</span>
          <p className="text-sm font-bold text-white">Redis (Upstash)</p>
          <p className="text-[11px] text-slate-400">Rate limiting & LLM token cache</p>
        </GlassCard>
        <GlassCard glow="purple" className="p-4 space-y-2">
          <span className="text-[10px] text-purple-400 font-mono uppercase">AI Engine SDK</span>
          <p className="text-sm font-bold text-white">Vercel AI SDK</p>
          <p className="text-[11px] text-slate-400">Multi-agent streaming & function calls</p>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 space-x-4 text-xs font-medium">
        <button
          onClick={() => setActiveTab("schema")}
          className={`pb-3 ${activeTab === "schema" ? "border-b-2 border-indigo-500 text-white font-bold" : "text-slate-400"}`}
        >
          Prisma Database Schema
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`pb-3 ${activeTab === "api" ? "border-b-2 border-indigo-500 text-white font-bold" : "text-slate-400"}`}
        >
          API Route Specs
        </button>
      </div>

      {activeTab === "schema" && (
        <GlassCard className="p-4 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-2">
            <span>prisma/schema.prisma</span>
            <span className="text-emerald-400">PostgreSQL Ready</span>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-xs text-indigo-300 leading-relaxed overflow-x-auto">
            {SCHEMA_SNIPPET}
          </pre>
        </GlassCard>
      )}

      {activeTab === "api" && (
        <div className="space-y-3">
          {API_ENDPOINTS.map((api, idx) => (
            <GlassCard key={idx} className="p-4 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                  {api.method}
                </span>
                <span className="text-white font-semibold">{api.path}</span>
              </div>
              <span className="text-slate-400">{api.desc}</span>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
