"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AI_AGENTS } from "@/lib/agents/agent-registry";
import { Sliders } from "lucide-react";

export function AdminPanelView() {
  const [selectedAgent, setSelectedAgent] = useState(AI_AGENTS[0]);
  const [promptText, setPromptText] = useState(selectedAgent.systemPrompt);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Sliders className="w-3.5 h-3.5 text-white" />
            <span>SYSTEM CONTROL & AGENT PROMPT STUDIO</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Platform Admin Panel</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage prompt templates, agent metrics, token logs, and user roles.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 uppercase font-mono">Total Users</span>
          <p className="text-2xl font-bold text-white">1,420</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 uppercase font-mono">Agent Mesh</span>
          <p className="text-2xl font-bold text-white">25 / 25 Online</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 uppercase font-mono">Tokens Consumed</span>
          <p className="text-2xl font-bold text-white">4.2M Tokens</p>
        </GlassCard>
        <GlassCard className="p-4 space-y-1">
          <span className="text-[9px] text-neutral-500 uppercase font-mono">Avg Latency</span>
          <p className="text-2xl font-bold text-neutral-300">340 ms</p>
        </GlassCard>
      </div>

      {/* Agent System Prompt Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">System Prompts</h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {AI_AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => { setSelectedAgent(agent); setPromptText(agent.systemPrompt); }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                  selectedAgent.id === agent.id
                    ? "bg-white text-black font-bold"
                    : "hover:bg-white/5 text-neutral-400"
                }`}
              >
                <span>{agent.name}</span>
                <span className="text-[9px] font-mono">{agent.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-xs font-bold text-white">Edit System Prompt ({selectedAgent.name})</h3>
              <span className="text-[10px] text-neutral-500 font-mono">ID: {selectedAgent.id}</span>
            </div>
            <textarea
              rows={8}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-4 rounded-xl glass-input text-xs font-mono text-neutral-200 resize-none focus:outline-none"
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold">
                Save Prompt Template
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
