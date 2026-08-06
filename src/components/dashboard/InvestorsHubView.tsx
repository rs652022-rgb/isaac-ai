"use client";

import React, { useState } from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Users,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Target,
  DollarSign,
  MessageSquare,
  CheckCircle2
} from "lucide-react";

export function InvestorsHubView() {
  const { investors } = useFounderGraph();
  const [selectedType, setSelectedType] = useState<string>("All");

  const filteredInvestors = investors.filter((inv) => {
    if (selectedType !== "All") return inv.type === selectedType;
    return true;
  });

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Users className="w-3.5 h-3.5 text-white" />
            <span>STAGE 5 :: PRIVATE INVESTORS & PITCH DRILLER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Investor CRM & Pitch Matcher
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Matched VCs, Angels, and Accelerators with tailored pitch suggestions.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {["All", "Accelerator", "VC Fund", "Angel Investor"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedType === type
                  ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Investor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInvestors.map((inv) => (
          <GlassCard key={inv.id} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                    {inv.type}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{inv.title || inv.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{inv.location}</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-mono font-bold text-xs">
                  {inv.aiFitScore}% Fit
                </span>
              </div>

              {/* Check Size & Stages */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block">CHECK SIZE</span>
                  <span className="text-white font-extrabold text-sm">{inv.checkSize}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block">TARGET STAGES</span>
                  <span className="text-white font-bold">{inv.targetStages.join(", ")}</span>
                </div>
              </div>

              {/* Pitch Suggestions */}
              <div className="space-y-1 bg-black/40 p-3.5 rounded-xl border border-white/5 text-xs">
                <span className="text-emerald-400 font-mono text-[10px] font-bold block flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI PITCH STRATEGY SUGGESTION:
                </span>
                <p className="text-neutral-300 leading-relaxed">{inv.pitchAdvice}</p>
              </div>

              {/* Portfolio Highlights */}
              <div className="space-y-1 text-xs">
                <span className="text-neutral-400 font-mono text-[10px] block">PORTFOLIO HIGHLIGHTS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {inv.portfolioHighlights.map((port, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 font-mono text-[10px]">
                      {port}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-400">Status: {inv.outreachStatus}</span>
              <a
                href={inv.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                <span>Apply / Pitch Deck Drop</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
