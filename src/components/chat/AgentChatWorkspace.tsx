"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { AI_AGENTS } from "@/lib/agents/agent-registry";
import { AIAgent } from "@/types";
import {
  Cpu,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  ChevronUp,
  Brain,
  Wrench,
  Flame,
  CheckCircle2,
  Paperclip,
  Code,
  Shield,
  Layers,
  Copy
} from "lucide-react";

export function AgentChatWorkspace() {
  const { messages, sendMessage, selectedAgent, setSelectedAgent, isThinking, founderProfile } = useApp();
  const [inputText, setInputText] = useState("");
  const [showReasoning, setShowReasoning] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    sendMessage(inputText.trim(), selectedAgent.id);
    setInputText("");
  };

  const toggleReasoning = (id: string) => {
    setShowReasoning((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      {/* Left Column: 25 C-Suite Agent Selector Drawer */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col glass-panel rounded-2xl p-4 space-y-4 max-h-60 lg:max-h-full overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">C-Suite Agent Mesh</h2>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/20 text-indigo-300">
            25 Active
          </span>
        </div>

        <div className="space-y-1 flex-1">
          {AI_AGENTS.map((agent) => {
            const isSelected = selectedAgent.id === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all group ${
                  isSelected
                    ? "bg-indigo-600/30 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{agent.avatar}</span>
                  <div>
                    <p className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                      {agent.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{agent.title}</p>
                  </div>
                </div>
                {isSelected && <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden relative">
        {/* Chat Header: Active Agent Banner */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedAgent.avatar}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-white">{selectedAgent.name}</h2>
                <span className="text-[10px] text-slate-400 font-mono">({selectedAgent.title})</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-md">
                Tools: {selectedAgent.tools.join(" • ")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs text-slate-400 font-mono">Persistent Memory Context Loaded</span>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                    isUser
                      ? "bg-purple-600 text-white"
                      : "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white"
                  }`}
                >
                  {isUser ? "👤" : msg.avatar || "🤖"}
                </div>

                <div className={`space-y-2 max-w-2xl ${isUser ? "text-right" : ""}`}>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Card */}
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? "bg-indigo-600/30 border border-indigo-500/40 text-white"
                        : "glass-card text-slate-200 border-white/10"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                    {/* Reasoning Accordion for Agent Messages */}
                    {!isUser && msg.reasoning && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <button
                          onClick={() => toggleReasoning(msg.id)}
                          className="flex items-center space-x-1 text-[10px] font-mono text-indigo-400 hover:text-indigo-300"
                        >
                          <Brain className="w-3 h-3" />
                          <span>{showReasoning[msg.id] ? "Hide Agent Thinking" : "View Agent Reasoning Steps"}</span>
                          {showReasoning[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {showReasoning[msg.id] && (
                          <ul className="mt-2 space-y-1 pl-2 border-l border-indigo-500/30 text-[10px] text-slate-400 font-mono">
                            {msg.reasoning.map((step, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Agent Thinking Skeleton Indicator */}
          {isThinking && (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm animate-pulse">
                🤖
              </div>
              <div className="p-3 rounded-2xl glass-card text-xs text-indigo-300 flex items-center space-x-2">
                <Cpu className="w-4 h-4 animate-spin" />
                <span>{selectedAgent.name} is synthesizing response across persistent memory...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Suggested Prompts */}
        <div className="px-6 py-2 border-t border-white/5 flex items-center space-x-2 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-500 font-mono whitespace-nowrap">Suggested:</span>
          <button
            onClick={() => sendMessage("Audit my business model for weakness", "devils_advocate")}
            className="px-2.5 py-1 rounded-lg border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-slate-300 whitespace-nowrap"
          >
            🔥 Audit Business Model
          </button>
          <button
            onClick={() => sendMessage("Generate Delaware C-Corp vs India Pvt Ltd breakdown", "legal_advisor")}
            className="px-2.5 py-1 rounded-lg border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-slate-300 whitespace-nowrap"
          >
            ⚖️ Legal Incorporation Guide
          </button>
          <button
            onClick={() => sendMessage("Draft 3-year Financial Model & Runway Projection", "finance_cfo")}
            className="px-2.5 py-1 rounded-lg border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-slate-300 whitespace-nowrap"
          >
            💰 Draft Financial Model
          </button>
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-slate-950/90 flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask ${selectedAgent.name} (${selectedAgent.title})...`}
            className="flex-1 px-4 py-3 rounded-xl glass-input text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <GlowingButton type="submit" loading={isThinking} icon={<Send className="w-4 h-4" />}>
            Send Directive
          </GlowingButton>
        </form>
      </div>
    </div>
  );
}
