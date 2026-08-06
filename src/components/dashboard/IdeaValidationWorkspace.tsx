"use client";

import React, { useState } from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { GlowingButton } from "@/components/ui/GlowingButton";
import {
  Target,
  Flame,
  ShieldAlert,
  Users,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Brain,
  MessageSquare
} from "lucide-react";

export function IdeaValidationWorkspace() {
  const { ideaData } = useFounderGraph();
  const [activeMode, setActiveMode] = useState<"brainstorm" | "challenge" | "vc_review" | "customer">("challenge");

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Stage Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Target className="w-3.5 h-3.5 text-white" />
            <span>STAGE 1 :: IDEA VALIDATION & YC PARTNER AUDIT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {ideaData.ideaName}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            &quot;{ideaData.tagline}&quot;
          </p>
        </div>

        {/* Persona Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-white/5">
          <button
            onClick={() => setActiveMode("challenge")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeMode === "challenge"
                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            🔥 YC Challenge Mode
          </button>
          <button
            onClick={() => setActiveMode("vc_review")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeMode === "vc_review"
                ? "bg-white text-black font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            💼 VC Review Mode
          </button>
          <button
            onClick={() => setActiveMode("customer")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeMode === "customer"
                ? "bg-white text-black font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            👤 Customer Persona
          </button>
        </div>
      </div>

      {/* Scores Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Idea Validation Score</p>
            <p className="text-2xl font-extrabold text-white mt-1">{ideaData.ideaScore}/100</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">Strong Value Prop</p>
          </div>
          <RadialProgress score={ideaData.ideaScore} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Execution Index</p>
            <p className="text-2xl font-extrabold text-white mt-1">{ideaData.executionScore}/100</p>
            <p className="text-[11px] text-neutral-300 font-mono mt-1">30-Day Sprint Feasible</p>
          </div>
          <RadialProgress score={ideaData.executionScore} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Investment Readiness</p>
            <p className="text-2xl font-extrabold text-white mt-1">{ideaData.investmentReadiness}/100</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">Pre-Seed / Seed Tier</p>
          </div>
          <RadialProgress score={ideaData.investmentReadiness} size={65} strokeWidth={6} />
        </GlassCard>
      </div>

      {/* Mode Challenge Warning Box */}
      {activeMode === "challenge" && (
        <GlassCard className="p-6 border-l-2 border-l-amber-400 bg-amber-950/10">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-xl bg-amber-400 text-black shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                YC PARTNER CHALLENGE MODE ACTIVE
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                &quot;The AI will refuse to blindly agree with your assumptions. We test your TAM calculation, customer retention hooks, and Moat defense against incumbents before you write a single line of code.&quot;
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Two Column Section: Lean Canvas & SWOT Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lean Canvas Card */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-400" />
              1-Page Lean Startup Canvas
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">Auto-Generated</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-neutral-400 font-mono block mb-1">PROBLEM:</span>
              <ul className="space-y-1 text-white">
                {ideaData.leanCanvas.problem.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-neutral-400 font-mono block mb-1">SOLUTION:</span>
              <ul className="space-y-1 text-white">
                {ideaData.leanCanvas.solution.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-neutral-400 font-mono block mb-1">UNIQUE VALUE PROPOSITION:</span>
              <p className="text-white font-medium p-3 rounded-xl bg-white/5 border border-white/10">
                {ideaData.leanCanvas.uniqueValueProposition}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* SWOT Analysis Card */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              SWOT Analysis Matrix
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">AI Audited</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <span className="font-mono font-bold text-emerald-400 block">STRENGTHS</span>
              <ul className="space-y-1 text-neutral-300">
                {ideaData.swot.strengths.map((st, i) => (
                  <li key={i}>• {st}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
              <span className="font-mono font-bold text-amber-400 block">WEAKNESSES</span>
              <ul className="space-y-1 text-neutral-300">
                {ideaData.swot.weaknesses.map((w, i) => (
                  <li key={i}>• {w}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
              <span className="font-mono font-bold text-cyan-400 block">OPPORTUNITIES</span>
              <ul className="space-y-1 text-neutral-300">
                {ideaData.swot.opportunities.map((o, i) => (
                  <li key={i}>• {o}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
              <span className="font-mono font-bold text-rose-400 block">THREATS</span>
              <ul className="space-y-1 text-neutral-300">
                {ideaData.swot.threats.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* ICP Ideal Customer Profile */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-white" />
            Ideal Customer Profile (ICP) Analysis
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px]">
            Targeting B2B SaaS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-neutral-400 font-mono block">PERSONA TITLE</span>
            <p className="text-white font-bold">{ideaData.icp.title}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-neutral-400 font-mono block">COMPANY SIZE & INDUSTRY</span>
            <p className="text-white font-bold">{ideaData.icp.companySize} • {ideaData.icp.targetIndustry}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-neutral-400 font-mono block">BUYING TRIGGER</span>
            <p className="text-white font-bold">{ideaData.icp.buyingTrigger}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
