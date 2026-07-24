"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { ShieldCheck, Flame, TrendingUp, AlertTriangle, CheckCircle2, FileText, RefreshCw, BarChart2 } from "lucide-react";

export function ValidationEngineView() {
  const { founderProfile, scores, recalculateScores } = useApp();
  const [activeTab, setActiveTab] = useState<"swot" | "pestle" | "porters" | "verdict">("swot");
  const [isAuditing, setIsAuditing] = useState(false);

  const handleReAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      recalculateScores();
      setIsAuditing(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>STARTUP VALIDATION ENGINE v2.4</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Idea, Risk & Moat Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Brutally honest, non-sugarcoated evaluation of {founderProfile.startupName}
          </p>
        </div>

        <GlowingButton onClick={handleReAudit} loading={isAuditing} icon={<RefreshCw className="w-4 h-4" />}>
          Re-Run Multi-Agent Audit
        </GlowingButton>
      </div>

      {/* 5-Gauge Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <GlassCard glow="indigo" className="p-4 text-center">
          <RadialProgress score={scores.overallScore} size={80} strokeWidth={6} color="indigo" />
          <span className="text-xs font-bold text-white block mt-2">Overall Score</span>
        </GlassCard>
        <GlassCard glow="cyan" className="p-4 text-center">
          <RadialProgress score={scores.ideaScore} size={80} strokeWidth={6} color="cyan" />
          <span className="text-xs font-bold text-white block mt-2">Idea Score</span>
        </GlassCard>
        <GlassCard glow="emerald" className="p-4 text-center">
          <RadialProgress score={scores.marketScore} size={80} strokeWidth={6} color="emerald" />
          <span className="text-xs font-bold text-white block mt-2">Market Score</span>
        </GlassCard>
        <GlassCard glow="purple" className="p-4 text-center">
          <RadialProgress score={scores.scalabilityScore} size={80} strokeWidth={6} color="purple" />
          <span className="text-xs font-bold text-white block mt-2">Scalability</span>
        </GlassCard>
        <GlassCard glow="amber" className="p-4 text-center">
          <RadialProgress score={100 - scores.riskScore} size={80} strokeWidth={6} color="amber" />
          <span className="text-xs font-bold text-white block mt-2">Safety Score</span>
        </GlassCard>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-white/10 space-x-4 text-xs font-medium">
        {[
          { id: "swot", label: "SWOT Analysis" },
          { id: "pestle", label: "PESTLE Macro Matrix" },
          { id: "porters", label: "Porter's 5 Forces" },
          { id: "verdict", label: "Non-Sugarcoated Verdict" }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`pb-3 transition-colors ${
              activeTab === t.id
                ? "border-b-2 border-indigo-500 text-white font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SWOT Content */}
      {activeTab === "swot" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 border-l-4 border-l-emerald-500 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Strengths
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
              {scores.swot.strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 border-l-4 border-l-rose-500 space-y-3">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Weaknesses
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
              {scores.swot.weaknesses.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 border-l-4 border-l-cyan-500 space-y-3">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Opportunities
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
              {scores.swot.opportunities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 border-l-4 border-l-amber-500 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Flame className="w-4 h-4" /> Threats
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
              {scores.swot.threats.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </GlassCard>
        </div>
      )}

      {/* PESTLE Content */}
      {activeTab === "pestle" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(scores.pestle).map(([key, val]) => (
            <GlassCard key={key} className="p-5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">{key} Factors</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{val}</p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Porter's 5 Forces Content */}
      {activeTab === "porters" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(scores.portersFive).map(([key, val]) => (
            <GlassCard key={key} className="p-5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                {key.replace(/([A-Z])/g, " $1")}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{val}</p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Executive Verdict Content */}
      {activeTab === "verdict" && (
        <GlassCard className="p-6 border-l-4 border-l-amber-500 bg-amber-950/20 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <Flame className="w-5 h-5" />
            <h3 className="text-base font-bold">Unfiltered Reality Check</h3>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-mono">
            {scores.verdict}
          </p>
        </GlassCard>
      )}
    </div>
  );
}
