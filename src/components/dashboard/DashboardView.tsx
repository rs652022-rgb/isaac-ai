"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { AI_AGENTS } from "@/lib/agents/agent-registry";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Flame,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Rocket,
  Cpu,
  ArrowUpRight,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";

export function DashboardView() {
  const { founderProfile, scores, roadmapTasks, toggleTaskStatus, setActiveTab, setSelectedAgent } = useApp();

  const activeMilestones = roadmapTasks.slice(0, 4);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ISAAC.AI OS :: ACTIVE SYSTEM CONTEXT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {founderProfile.startupName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            "{founderProfile.tagline}" • {founderProfile.industry} • {founderProfile.fundingStage} Stage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("validation")}
            className="px-4 py-2 rounded-xl border border-white/10 bg-slate-900/80 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Run Re-Validation Audit
          </button>
          <GlowingButton
            onClick={() => setActiveTab("chat")}
            icon={<Cpu className="w-4 h-4" />}
          >
            Launch AI Workspace
          </GlowingButton>
        </div>
      </div>

      {/* Main Score & Readiness Gauge Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard glow="indigo" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Startup Score</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.overallScore}/100</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">↑ VC Ready Tier</p>
          </div>
          <RadialProgress score={scores.overallScore} size={70} strokeWidth={6} color="indigo" />
        </GlassCard>

        <GlassCard glow="cyan" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Market Potential</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.marketScore}/100</p>
            <p className="text-[11px] text-cyan-400 font-medium mt-1">Strong TAM Growth</p>
          </div>
          <RadialProgress score={scores.marketScore} size={70} strokeWidth={6} color="cyan" />
        </GlassCard>

        <GlassCard glow="emerald" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Execution Index</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.executionScore}/100</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">MVP 30-Day Sprint</p>
          </div>
          <RadialProgress score={scores.executionScore} size={70} strokeWidth={6} color="emerald" />
        </GlassCard>

        <GlassCard glow="amber" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Risk Matrix</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.riskScore}/100</p>
            <p className="text-[11px] text-amber-400 font-medium mt-1">Low-Medium Risk</p>
          </div>
          <RadialProgress score={100 - scores.riskScore} size={70} strokeWidth={6} color="amber" />
        </GlassCard>
      </div>

      {/* Sugarcoat-Free Executive Assessment Banner */}
      <GlassCard className="p-6 border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-950/20 via-slate-950/80 to-slate-950/80">
        <div className="flex items-start space-x-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Isaac's Executive Verdict (No Sugarcoating)
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
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
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Rocket className="w-4 h-4 text-indigo-400" />
              Priority Action Roadmap
            </h2>
            <button
              onClick={() => setActiveTab("roadmap")}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
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
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                        : "bg-slate-900 border-white/10 text-slate-500 hover:border-slate-600"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-semibold ${task.status === "Completed" ? "line-through text-slate-500" : "text-white"}`}>
                        {task.title}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300">
                        {task.timeline}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{task.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block font-mono">Assigned to</span>
                  <span className="text-xs text-indigo-300 font-medium">{task.assignedAgent}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Active C-Suite AI Agents */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              Active C-Suite Agents
            </h2>
            <button
              onClick={() => setActiveTab("chat")}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium"
            >
              Open Agent Mesh
            </button>
          </div>

          <GlassCard className="p-4 space-y-3 divide-y divide-white/5">
            {AI_AGENTS.slice(0, 5).map((agent) => (
              <div
                key={agent.id}
                onClick={() => { setSelectedAgent(agent); setActiveTab("chat"); }}
                className="pt-2.5 first:pt-0 flex items-center justify-between cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-all"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{agent.avatar}</span>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {agent.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{agent.title}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 text-[9px] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready
                </span>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Quick Execution Modules Grid */}
      <div className="pt-4 border-t border-white/10">
        <h2 className="text-base font-bold text-white mb-4">Founder Execution Hub</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard onClick={() => setActiveTab("registration")} className="p-5 cursor-pointer group glow-indigo">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white">Incorporation Assistant</h3>
            <p className="text-xs text-slate-400 mt-1">Compare Delaware C-Corp vs India Pvt Ltd legal costs & timeline.</p>
          </GlassCard>

          <GlassCard onClick={() => setActiveTab("documents")} className="p-5 cursor-pointer group glow-cyan">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white">AI Document Studio</h3>
            <p className="text-xs text-slate-400 mt-1">Generate Pitch Deck, PRD, NDA, Cap Table & Financial Models.</p>
          </GlassCard>

          <GlassCard onClick={() => setActiveTab("product-builder")} className="p-5 cursor-pointer group glow-emerald">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white">Product & Tech Stack</h3>
            <p className="text-xs text-slate-400 mt-1">Design DB schema, Next.js architecture, and sprint tasks.</p>
          </GlassCard>

          <GlassCard onClick={() => setActiveTab("funding")} className="p-5 cursor-pointer group glow-amber">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white">Funding & VC Griller</h3>
            <p className="text-xs text-slate-400 mt-1">Audit pitch deck and simulate tough investor Q&A interviews.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
