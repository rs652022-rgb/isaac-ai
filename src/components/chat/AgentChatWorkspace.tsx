"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/store/app-context";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { MarkdownRenderer } from "@/components/chat/MarkdownRenderer";
import { AI_AGENTS } from "@/lib/agents/agent-registry";

import {
  Cpu,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Brain,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

export function AgentChatWorkspace() {
  const { messages, sendMessage, selectedAgent, setSelectedAgent, isThinking } = useApp();
  const router = useRouter();
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
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300 relative z-10">
      {/* Left Column: 25 C-Suite Agent Selector Drawer */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col glass-panel rounded-2xl p-3.5 space-y-3 max-h-60 lg:max-h-full overflow-y-auto border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 px-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-white animate-pulse" />
            <h2 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Agent Mesh</h2>
          </div>
          <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-white/10 text-white">
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
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all group cursor-pointer ${
                  isSelected
                    ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "hover:bg-white/5 text-neutral-400 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-base">{agent.avatar}</span>
                  <div>
                    <p className={`text-xs ${isSelected ? "font-bold text-black" : "font-medium group-hover:text-white"}`}>
                      {agent.name}
                    </p>
                    <p className={`text-[9px] font-mono ${isSelected ? "text-neutral-700" : "text-neutral-500"}`}>
                      {agent.title}
                    </p>
                  </div>
                </div>
                {isSelected && <Sparkles className="w-3 h-3 text-black animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden relative border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        {/* Chat Header: Active Agent Banner */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/80">
          <div className="flex items-center space-x-3">
            <span className="text-xl">{selectedAgent.avatar}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xs font-bold text-white">{selectedAgent.name}</h2>
                <span className="text-[10px] text-neutral-500 font-mono">({selectedAgent.title})</span>
              </div>
              <p className="text-[10px] text-neutral-400 truncate max-w-md font-mono">
                Tools: {selectedAgent.tools.join(" • ")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] text-neutral-400 font-mono hidden md:inline">Memory Context Loaded</span>
            </div>

            {/* Go To Dashboard Button (Requirement 5) */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/dashboard")}
              className="group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium backdrop-blur-md transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              tabIndex={0}
              aria-label="Go To Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" />
              <span className="hidden sm:inline font-medium">Go To Dashboard</span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: isUser ? 8 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isUser ? "bg-white text-black" : "bg-neutral-900 border border-white/10 text-white"
                    }`}
                  >
                    {isUser ? "👤" : msg.avatar || "🤖"}
                  </div>

                  <div className={`space-y-1.5 max-w-2xl ${isUser ? "text-right" : ""}`}>
                    <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono">
                      <span className="font-semibold text-neutral-300">{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Message Card */}
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? "bg-white text-black font-medium"
                          : "glass-card text-neutral-200 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {isUser ? (
                        <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                      ) : (
                        <MarkdownRenderer content={msg.content} isStreaming={msg.isStreaming} />
                      )}

                      {/* Reasoning Accordion */}
                      {!isUser && msg.reasoning && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <button
                            onClick={() => toggleReasoning(msg.id)}
                            className="flex items-center space-x-1 text-[10px] font-mono text-neutral-400 hover:text-white cursor-pointer"
                          >
                            <Brain className="w-3 h-3" />
                            <span>{showReasoning[msg.id] ? "Hide Thinking" : "View Reasoning Steps"}</span>
                            {showReasoning[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>

                          {showReasoning[msg.id] && (
                            <ul className="mt-2 space-y-1 pl-2 border-l border-white/20 text-[10px] text-neutral-400 font-mono">
                              {msg.reasoning.map((step, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-white" />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Thinking State */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white text-xs animate-pulse">
                🤖
              </div>
              <div className="p-3 rounded-2xl glass-card text-xs text-neutral-300 flex items-center space-x-2 font-mono">
                <Cpu className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>{selectedAgent.name} is synthesizing response...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-2 border-t border-white/5 flex items-center space-x-2 overflow-x-auto text-[10px] no-scrollbar font-mono">
          <span className="text-neutral-500 whitespace-nowrap">Suggested:</span>
          <button
            onClick={() => sendMessage("Audit my business model for weakness", "devils_advocate")}
            className="px-2.5 py-1 rounded-full border border-white/10 bg-neutral-950 hover:bg-white/10 text-neutral-300 whitespace-nowrap transition-colors cursor-pointer"
          >
            🔥 Audit Business Model
          </button>
          <button
            onClick={() => sendMessage("Generate Delaware C-Corp vs India Pvt Ltd breakdown", "legal_advisor")}
            className="px-2.5 py-1 rounded-full border border-white/10 bg-neutral-950 hover:bg-white/10 text-neutral-300 whitespace-nowrap transition-colors cursor-pointer"
          >
            ⚖️ Legal Incorporation Guide
          </button>
          <button
            onClick={() => sendMessage("Draft 3-year Financial Model & Runway Projection", "finance_cfo")}
            className="px-2.5 py-1 rounded-full border border-white/10 bg-neutral-950 hover:bg-white/10 text-neutral-300 whitespace-nowrap transition-colors cursor-pointer"
          >
            💰 Draft Financial Model
          </button>
        </div>

        {/* Input Bar Form */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-white/10 bg-black flex items-center gap-3 focus-within:bg-white/[0.02] transition-all"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask ${selectedAgent.name} (${selectedAgent.title})...`}
            className="flex-1 px-4 py-3 rounded-full glass-input text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all"
          />
          <GlowingButton type="submit" loading={isThinking} icon={<Send className="w-3.5 h-3.5" />}>
            Send
          </GlowingButton>
        </form>
      </div>
    </div>
  );
}
