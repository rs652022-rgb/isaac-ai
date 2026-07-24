"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AI_AGENTS } from "@/lib/agents/agent-registry";
import { Sliders, Cpu, Users, Activity, FileCode, Shield, Server, Terminal } from "lucide-react";

export function AdminPanelView() {
  const [selectedAgent, setSelectedAgent] = useState(AI_AGENTS[0]);
  const [promptText, setPromptText] = useState(selectedAgent.systemPrompt);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono mb-1">
            <Sliders className="w-4 h-4" />
            <span>SYSTEM CONTROL & AGENT PROMPT STUDIO</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Platform Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage prompt templates, agent metrics, token logs, and user roles.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Total Platform Users</span>
          <p className="text-2xl font-bold text-white">1,420</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Active Agent Mesh</span>
          <p className="text-2xl font-bold text-indigo-400">25 / 25 Online</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">LLM Tokens Consumed</span>
          <p className="text-2xl font-bold text-emerald-400">4.2M Tokens</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Avg Agent Latency</span>
          <p className="text-2xl font-bold text-purple-400">340 ms</p>
        </GlassCard>
      </div>

      {/* Agent System Prompt Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-slate-400">Agent System Prompts</h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {AI_AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => { setSelectedAgent(agent); setPromptText(agent.systemPrompt); }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all ${
                  selectedAgent.id === agent.id
                    ? "bg-indigo-600/30 border border-indigo-500/50 text-white font-bold"
                    : "hover:bg-white/5 text-slate-400"
                }`}
              >
                <span>{agent.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">{agent.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Edit System Prompt ({selectedAgent.name})</h3>
              <span className="text-xs text-indigo-400 font-mono">ID: {selectedAgent.id}</span>
            </div>
            <textarea
              rows={8}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-4 rounded-xl glass-input text-xs font-mono text-slate-200 resize-none focus:outline-none"
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold">
                Save Prompt Template
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
