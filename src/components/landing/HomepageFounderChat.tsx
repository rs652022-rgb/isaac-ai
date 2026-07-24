"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Send, Cpu, ArrowRight, Brain, ChevronUp, ChevronDown } from "lucide-react";

export function HomepageFounderChat() {
  const { messages, sendMessage, isThinking, setActiveTab, setUser } = useApp();
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
    sendMessage(inputText.trim(), "orchestrator");
    setInputText("");
  };

  const toggleReasoning = (id: string) => {
    setShowReasoning((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogin = () => {
    // Mock login for now, setting user and going to dashboard
    setUser({
      id: "usr_01",
      name: "Alex Vance",
      email: "alex@isaacai.io",
      role: "Founder",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      subscriptionPlan: "Pro",
      createdAt: "2026-07-01"
    });
    setActiveTab("dashboard");
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col glass-panel rounded-3xl overflow-hidden border-white/20 bg-[#050505]/80 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] h-[600px] animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            IS
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Isaac.AI Co-Founder</h2>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online & Ready
            </p>
          </div>
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
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                  isUser ? "bg-white text-black" : "bg-neutral-900 border border-white/20 text-white"
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

                <div
                  className={`p-5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? "bg-white text-black font-medium"
                      : "glass-card text-neutral-200 border-white/10"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                  {/* Reasoning Accordion */}
                  {!isUser && msg.reasoning && msg.reasoning.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <button
                        onClick={() => toggleReasoning(msg.id)}
                        className="flex items-center space-x-1.5 text-[10px] font-mono text-neutral-400 hover:text-white transition-colors"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>{showReasoning[msg.id] ? "Hide Thinking" : "View Extraction Process"}</span>
                        {showReasoning[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {showReasoning[msg.id] && (
                        <ul className="mt-3 space-y-2 pl-3 border-l border-white/20 text-[10px] text-neutral-400 font-mono">
                          {msg.reasoning.map((step, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Login Action Prompt */}
                  {!isUser && msg.action === "login" && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col items-start space-y-3">
                      <p className="text-xs text-neutral-400 font-medium">Memory sync ready. Log in to generate your Founder Dashboard.</p>
                      <GlowingButton onClick={handleLogin} icon={<ArrowRight className="w-4 h-4" />}>
                        Create Free Account
                      </GlowingButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Thinking State */}
        {isThinking && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-white text-sm animate-pulse">
              🤖
            </div>
            <div className="p-4 rounded-2xl glass-card text-xs text-neutral-300 flex items-center space-x-3 font-mono">
              <Cpu className="w-4 h-4 animate-spin" />
              <span>Isaac is synthesizing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar Form */}
      <form onSubmit={handleSend} className="p-4 sm:p-6 border-t border-white/10 bg-black/60 flex items-center gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tell Isaac about your startup..."
          className="flex-1 px-5 py-4 rounded-full glass-input text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/30"
          autoFocus
        />
        <GlowingButton type="submit" loading={isThinking} icon={<Send className="w-4 h-4" />}>
          Send
        </GlowingButton>
      </form>
    </div>
  );
}
