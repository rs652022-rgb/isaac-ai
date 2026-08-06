"use client";

import React from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Target,
  Wrench,
  FileCheck,
  Building2,
  Users,
  LineChart,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export function DashboardView() {
  const { nodes, metrics, ideaData, notifications } = useFounderGraph();
  const router = useRouter();

  const stageIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "idea-validation": Target,
    resources: Wrench,
    documents: FileCheck,
    grants: Building2,
    investors: Users,
    performance: LineChart,
  };

  const healthScore = Math.round(
    (ideaData.ideaScore + ideaData.executionScore + metrics.profitMargin) / 3
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* 1. Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI FOUNDER OPERATING SYSTEM :: CENTRAL CONTROL ROOM</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {metrics.businessName}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Industry: <span className="text-white font-medium">{metrics.industry}</span> • 6 Active Execution Stages • Stage Completion: <span className="text-emerald-400 font-mono font-bold">68%</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/performance")}
            className="px-4 py-2 rounded-full border border-white/10 bg-neutral-950 text-xs font-medium text-neutral-200 hover:bg-neutral-900 transition-colors"
          >
            Metrics BI Dashboard
          </button>
          <GlowingButton
            onClick={() => router.push("/dashboard/idea-validation")}
            icon={<Target className="w-4 h-4" />}
          >
            Stage 1 Workspace
          </GlowingButton>
        </div>
      </div>

      {/* 2. Four Key Startup Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Startup Health Score</p>
            <p className="text-2xl font-extrabold text-white mt-1">{healthScore}/100</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">VC Ready Tier</p>
          </div>
          <RadialProgress score={healthScore} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">ARR Runway Index</p>
            <p className="text-2xl font-extrabold text-white mt-1">${(metrics.arr / 1000).toFixed(1)}k</p>
            <p className="text-[11px] text-neutral-300 font-mono mt-1">{metrics.cashRunwayMonths} Months Cash Runway</p>
          </div>
          <RadialProgress score={Math.min(100, metrics.cashRunwayMonths * 5.5)} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Compliance Index</p>
            <p className="text-2xl font-extrabold text-white mt-1">82/100</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">Inc. & GST Active</p>
          </div>
          <RadialProgress score={82} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">LTV / CAC Ratio</p>
            <p className="text-2xl font-extrabold text-white mt-1">{(metrics.ltv / metrics.cac).toFixed(1)}x</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">High Scale Efficiency</p>
          </div>
          <RadialProgress score={94} size={65} strokeWidth={6} />
        </GlassCard>
      </div>

      {/* 3. Executive AI Verdict Banner */}
      <GlassCard className="p-6 border-l-2 border-l-white bg-neutral-950">
        <div className="flex items-start space-x-4">
          <div className="p-2.5 rounded-xl bg-white text-black shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                ISAAC&apos;S STAGE AUDIT & EXECUTIVE VERDICT
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              &quot;Your B2B SaaS economics are solid with a 17.1x LTV/CAC ratio and $148.8k ARR. Priority focus for Q3: Complete Stage 3 (Delaware Incorporation & Founder Agreement) and submit Stage 4 (Startup India Seed Fund Scheme grant) before scaling marketing spend.&quot;
            </p>
          </div>
        </div>
      </GlassCard>

      {/* 4. The 6 Interactive Founder OS Stages Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-neutral-400" />
            Founder Execution Pipeline (6 Stages)
          </h2>
          <span className="text-xs font-mono text-neutral-400">Connected Graph Memory</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.filter((n) => n.id !== "overview").map((node) => {
            const Icon = stageIcons[node.id as string] || Target;
            return (
              <GlassCard
                key={node.id}
                onClick={() => router.push(`/dashboard/${node.id}`)}
                className="p-5 cursor-pointer group hover:border-white/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold rounded-full bg-white/10 text-white">
                      {node.completionPercentage}% Complete
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {node.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-[10px]">Agent: {node.assignedAgent.name}</span>
                  <div className="flex items-center space-x-1 text-white font-medium group-hover:translate-x-1 transition-transform">
                    <span>Open Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
