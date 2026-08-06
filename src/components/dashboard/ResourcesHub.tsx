"use client";

import React, { useState } from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Wrench,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Clock,
  Zap,
  Globe,
  Server,
  CreditCard,
  BarChart,
  ShieldCheck,
  Bot
} from "lucide-react";

export function ResourcesHub() {
  const { resources, toggleResourceBookmark } = useFounderGraph();
  const [selectedCategory, setSelectedCategory] = useState<string>("Domain & Web");

  const activeGroup = resources.find((r) => r.category === selectedCategory) || resources[0];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Wrench className="w-3.5 h-3.5 text-white" />
            <span>STAGE 2 :: ESSENTIAL BUSINESS RESOURCES & TOOL STACK</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Curated Startup Tooling
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            AI Recommended Free vs Paid SaaS tooling matched to your stack.
          </p>
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {resources.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCategory(cat.category)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.category
                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Active Category Header */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {activeGroup.category} Recommendations
            </h2>
            <p className="text-xs text-neutral-400 mt-1">{activeGroup.description}</p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {activeGroup.items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/10 text-neutral-300">
                      {item.tier}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleResourceBookmark(item.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      item.isBookmarked
                        ? "bg-cyan-400 text-black border-cyan-400"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                    title="Save Tool"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                  <span className="text-white font-bold">{item.pricing}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Setup: {item.timeRequired}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                  <strong className="text-emerald-400 font-mono text-[10px] block mb-0.5">AI MATCH FIT ({item.aiFitScore}%):</strong>
                  {item.recommendationReason}
                </p>

                {/* Pros and Cons */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-mono font-bold block">PROS:</span>
                    {item.pros.map((p, i) => (
                      <div key={i} className="flex items-start gap-1 text-neutral-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <span className="text-amber-400 font-mono font-bold block">CONS:</span>
                    {item.cons.map((c, i) => (
                      <div key={i} className="text-neutral-400">
                        • {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Difficulty: {item.difficulty}</span>
                <a
                  href={item.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
                >
                  <span>Visit Official Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
