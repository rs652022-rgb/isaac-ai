"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { AI_AGENTS } from "@/lib/agents/agent-registry";
import {
  Sparkles,
  Rocket,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Flame,
  CheckCircle2,
  FileText,
  Layers,
  ChevronRight
} from "lucide-react";

import { useRouter } from "next/navigation";

export function DashboardView() {
  const { founderProfile, scores, roadmapTasks, toggleTaskStatus, setSelectedAgent } = useApp();
  const router = useRouter();

  const activeMilestones = roadmapTasks.slice(0, 4);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>ISAAC.AI OS :: ACTIVE SYSTEM CONTEXT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {founderProfile.startupName || "Your Startup"}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            {founderProfile.tagline ? `"${founderProfile.tagline}" • ` : ""}
            <span className="font-serif-accent italic text-neutral-300">
              {founderProfile.industry || "Industry Analysis Pending"}
            </span>
            {founderProfile.fundingStage ? ` • ${founderProfile.fundingStage} Stage` : ""}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/validation")}
            className="px-4 py-2 rounded-full border border-white/10 bg-neutral-950 text-xs font-medium text-neutral-200 hover:bg-neutral-900 transition-colors"
          >
            Re-Validation Audit
          </button>
          <GlowingButton
            onClick={() => router.push("/chat")}
            icon={<Cpu className="w-4 h-4" />}
          >
            Launch AI Workspace
          </GlowingButton>
        </div>
      </div>

      {/* Main Score & Readiness Gauge Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Startup Score</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.overallScore}/100</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">VC Ready Tier</p>
          </div>
          <RadialProgress score={scores.overallScore} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Market Potential</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.marketScore}/100</p>
            <p className="text-[11px] text-neutral-300 font-mono mt-1">Strong TAM Growth</p>
          </div>
          <RadialProgress score={scores.marketScore} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Execution Index</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.executionScore}/100</p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">MVP 30-Day Sprint</p>
          </div>
          <RadialProgress score={scores.executionScore} size={65} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Safety Index</p>
            <p className="text-2xl font-extrabold text-white mt-1">{100 - scores.riskScore}/100</p>
            <p className="text-[11px] text-neutral-300 font-mono mt-1">Low-Medium Risk</p>
          </div>
          <RadialProgress score={100 - scores.riskScore} size={65} strokeWidth={6} />
        </GlassCard>
      </div>

      {/* Sugarcoat-Free Executive Assessment Banner */}
      <GlassCard className="p-6 border-l-2 border-l-white bg-neutral-950">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-xl bg-white text-black shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                Isaac&apos;s Executive Verdict (No Sugarcoating)
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {scores.verdict}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Two Column Grid: Milestones & Agent Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active 90-Day Roadmap Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Rocket className="w-4 h-4 text-neutral-400" />
              Priority Action Roadmap
            </h2>
            <button
              onClick={() => router.push("/roadmap")}
              className="text-xs text-neutral-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
            >
              View Full 24-Month Timeline <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeMilestones.map((task) => (
              <GlassCard key={task.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`mt-0.5 p-1 rounded-lg border transition-colors ${
                      task.status === "Completed"
                        ? "bg-white border-white text-black"
                        : "bg-black border-white/20 text-neutral-500 hover:border-white/40"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-bold ${task.status === "Completed" ? "line-through text-neutral-500" : "text-white"}`}>
                        {task.title}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded bg-white/10 text-neutral-300">
                        {task.timeline}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">{task.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[9px] text-neutral-500 block font-mono">Agent</span>
                  <span className="text-xs text-white font-medium">{task.assignedAgent}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Active C-Suite AI Agents */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neutral-400" />
              Active C-Suite Agents
            </h2>
            <button
              onClick={() => router.push("/chat")}
              className="text-xs text-neutral-400 hover:text-white font-medium"
            >
              Open Mesh
            </button>
          </div>

          <GlassCard className="p-3 space-y-2">
            {AI_AGENTS.slice(0, 5).map((agent) => (
              <div
                key={agent.id}
                onClick={() => { setSelectedAgent(agent); router.push("/chat"); }}
                className="flex items-center justify-between cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-all"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{agent.avatar}</span>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {agent.name}
                    </p>
                    <p className="text-[10px] text-neutral-500 font-mono">{agent.title}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 text-[9px] rounded-full bg-white/10 text-neutral-300 font-mono">
                  Ready
                </span>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Quick Execution Modules Grid */}
      <div className="pt-4 border-t border-white/[0.08]">
        <h2 className="text-sm font-bold text-white mb-4">Founder Execution Hub</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard onClick={() => router.push("/registration")} className="p-5 cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-white">Incorporation Assistant</h3>
            <p className="text-[11px] text-neutral-400 mt-1">Delaware C-Corp vs India Pvt Ltd legal guide.</p>
          </GlassCard>

          <GlassCard onClick={() => router.push("/documents")} className="p-5 cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-white">AI Document Studio</h3>
            <p className="text-[11px] text-neutral-400 mt-1">Pitch Decks, PRDs, NDAs & Financial Models.</p>
          </GlassCard>

          <GlassCard onClick={() => router.push("/product-builder")} className="p-5 cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-white">Product & Tech Stack</h3>
            <p className="text-[11px] text-neutral-400 mt-1">DB schema, Next.js architecture, & sprint tasks.</p>
          </GlassCard>

          <GlassCard onClick={() => router.push("/funding")} className="p-5 cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                <TrendingUp className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-white">Funding & VC Griller</h3>
            <p className="text-[11px] text-neutral-400 mt-1">Audit pitch deck & simulate tough investor Q&A.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
