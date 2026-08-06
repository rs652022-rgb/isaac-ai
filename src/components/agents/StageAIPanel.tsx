"use client";

import React, { useState } from "react";
import { X, Send, Bot, Sparkles, RefreshCw, Cpu } from "lucide-react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";

interface StageAIPanelProps {
  stageId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function StageAIPanel({ stageId, isOpen, onClose }: StageAIPanelProps) {
  const { nodes, ideaData, metrics } = useFounderGraph();
  const { sendMessage, isThinking, messages } = useApp();
  const [inputMsg, setInputMsg] = useState("");

  if (!isOpen) return null;

  const currentNode = nodes.find((n) => n.id === stageId) || nodes[0];
  const agent = currentNode.assignedAgent;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || isThinking) return;

    // Attach contextual stage prompt prefix
    const contextPrompt = `[STAGE CONTEXT: ${currentNode.title} | Startup: ${metrics.businessName} (${metrics.industry}) | Current ARR: $${metrics.arr}] ${inputMsg.trim()}`;
    const textToSend = inputMsg.trim();
    setInputMsg("");
    await sendMessage(contextPrompt, agent.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-neutral-950 border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        {/* Header Persona */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{agent.avatar}</span>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {agent.name}
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                    STAGE AI
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono">{agent.role}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Context Banner */}
          <GlassCard className="p-3 mb-4 text-xs space-y-1 bg-white/5 border-white/10">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
              <Sparkles className="w-3 h-3 text-white" />
              <span>CENTRAL MEMORY INHERITED</span>
            </div>
            <p className="text-neutral-300 text-[11px]">
              Business: <span className="text-white font-bold">{metrics.businessName}</span> • Industry: {metrics.industry}
            </p>
          </GlassCard>

          {/* Chat Messages */}
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-2">
              <p className="font-bold text-white">
                Greetings! I am your dedicated {agent.role}.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                I have full access to your {currentNode.title} data and founder memory. Ask me to refine strategies, draft document terms, or audit risks.
              </p>
            </div>

            {messages
              .filter((m) => m.sender === agent.id || m.sender === "user")
              .slice(-6)
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-white text-black font-medium ml-8"
                      : "bg-neutral-900 border border-white/10 text-neutral-200 mr-8"
                  }`}
                >
                  {msg.content}
                </div>
              ))}

            {isThinking && (
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                <span>{agent.name} is reasoning with Graph Memory...</span>
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="pt-4 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder={`Ask ${agent.name} about ${currentNode.title}...`}
            className="flex-1 bg-black border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            disabled={isThinking || !inputMsg.trim()}
            className="p-3 rounded-2xl bg-white text-black hover:bg-neutral-200 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
