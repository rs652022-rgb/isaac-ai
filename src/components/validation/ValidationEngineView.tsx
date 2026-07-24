"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { ShieldCheck, Flame, TrendingUp, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>STARTUP VALIDATION ENGINE v2.4</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Idea, Risk & Moat Matrix
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Brutally honest evaluation of <span className="font-serif-accent italic text-neutral-300">{founderProfile.startupName}</span>
          </p>
        </div>

        <GlowingButton onClick={handleReAudit} loading={isAuditing} icon={<RefreshCw className="w-4 h-4" />}>
          Re-Run Multi-Agent Audit
        </GlowingButton>
      </div>

      {/* 5-Gauge Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <GlassCard className="p-4 text-center">
          <RadialProgress score={scores.overallScore} size={70} strokeWidth={6} />
          <span className="text-xs font-bold text-white block mt-2">Overall Score</span>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <RadialProgress score={scores.ideaScore} size={70} strokeWidth={6} />
          <span className="text-xs font-bold text-white block mt-2">Idea Score</span>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <RadialProgress score={scores.marketScore} size={70} strokeWidth={6} />
          <span className="text-xs font-bold text-white block mt-2">Market Score</span>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <RadialProgress score={scores.scalabilityScore} size={70} strokeWidth={6} />
          <span className="text-xs font-bold text-white block mt-2">Scalability</span>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <RadialProgress score={100 - scores.riskScore} size={70} strokeWidth={6} />
          <span className="text-xs font-bold text-white block mt-2">Safety Score</span>
        </GlassCard>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-white/[0.08] space-x-6 text-xs font-medium">
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
                ? "border-b-2 border-white text-white font-bold"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SWOT Content */}
      {activeTab === "swot" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 border-l-2 border-l-white space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-4">
              {scores.swot.strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 border-l-2 border-l-neutral-600 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Weaknesses
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-4">
              {scores.swot.weaknesses.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 border-l-2 border-l-white space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Opportunities
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-4">
              {scores.swot.opportunities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 border-l-2 border-l-neutral-600 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Flame className="w-3.5 h-3.5" /> Threats
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-4">
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
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">{key} Factors</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">{val}</p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Porter's 5 Forces Content */}
      {activeTab === "porters" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(scores.portersFive).map(([key, val]) => (
            <GlassCard key={key} className="p-5 space-y-2">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                {key.replace(/([A-Z])/g, " $1")}
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">{val}</p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Executive Verdict Content */}
      {activeTab === "verdict" && (
        <GlassCard className="p-6 border-l-2 border-l-white bg-neutral-950 space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <Flame className="w-4 h-4" />
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider">Unfiltered Reality Check</h3>
          </div>
          <p className="text-xs text-neutral-200 leading-relaxed font-sans">
            {scores.verdict}
          </p>
        </GlassCard>
      )}
    </div>
  );
}
