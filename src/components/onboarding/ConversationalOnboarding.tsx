"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { MarkdownRenderer } from "@/components/chat/MarkdownRenderer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Send, Cpu, ArrowRight, Brain, ChevronUp, ChevronDown, Paperclip, Mic, Lightbulb, TrendingUp, Target, LineChart, Search, CircleDollarSign } from "lucide-react";

import { useRouter } from "next/navigation";

export function ConversationalOnboarding() {
  const { messages, sendMessage, isThinking } = useApp();
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);
  
  const [inputText, setInputText] = useState("");
  const [showReasoning, setShowReasoning] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasStarted) {
      scrollToBottom();
    }
  }, [messages, isThinking, hasStarted]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    sendMessage(inputText.trim(), "orchestrator");
    setInputText("");
  };

  const toggleReasoning = (id: string) => {
    setShowReasoning((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // The final step triggers Dashboard view. The "action" field from the agent message handles this.
  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow for welcome screen */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[120px] pointer-events-none rounded-full" />
        
        <GlassCard className="w-full max-w-2xl p-8 sm:p-14 space-y-10 relative z-10 border-white/[0.08] bg-black/40 text-center shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
          <div className="mx-auto inline-flex w-20 h-20 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 items-center justify-center mb-4 shadow-[0_0_40px_rgba(255,255,255,0.05)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 blur-2xl group-hover:bg-white/30 transition-all duration-700" />
            <span className="text-white font-extrabold text-2xl tracking-tighter relative z-10">IS</span>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">ISAAC.AI</h2>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                AI Founder <br/> Operating System
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest font-semibold">
              <span className="text-white">Build</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white">Validate</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white">Launch</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white">Scale</span>
            </div>

            <div className="max-w-md mx-auto space-y-4 text-neutral-400 text-sm sm:text-base leading-relaxed font-medium bg-white/5 p-6 rounded-2xl border border-white/5">
              <p>&quot;I&apos;m your AI Founder Partner.</p>
              <p>I&apos;ll help you validate your startup, create your business strategy, build your roadmap, generate documents and guide you from idea to scale.&quot;</p>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <GlowingButton
              onClick={() => setHasStarted(true)}
              size="lg"
              className="w-full sm:w-auto px-12"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Start Conversation
            </GlowingButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-8 items-center justify-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[150px] pointer-events-none" />
      
      <div className="w-full max-w-4xl flex flex-col rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] h-[85vh] min-h-[600px] max-h-[900px] animate-in fade-in zoom-in-95 duration-700 z-10 relative">
        {/* Subtle inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        
        {/* Premium Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.08] bg-white/[0.01]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden">
               <div className="absolute inset-0 bg-white/10 blur-xl animate-pulse" />
               <span className="text-white font-extrabold text-sm tracking-tighter relative z-10">IS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">ISAAC.AI</h2>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[9px] font-mono font-bold text-white uppercase tracking-wider">Beta</span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">Your AI Founder Partner</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-widest">Online</span>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scroll-smooth">
          
          {/* Empty State Suggestion Chips */}
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full py-12">
               <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.05)] relative overflow-hidden mb-2">
                 <div className="absolute inset-0 bg-white/10 blur-2xl" />
                 <span className="text-white font-extrabold text-2xl tracking-tighter relative z-10">IS</span>
               </div>
               <h3 className="text-xl font-bold text-white tracking-tight">How can I help you build today?</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-6">
                 {[
                   { text: "Validate my startup idea", icon: <Lightbulb className="w-4 h-4" /> },
                   { text: "Analyse my market", icon: <TrendingUp className="w-4 h-4" /> },
                   { text: "Build my revenue model", icon: <CircleDollarSign className="w-4 h-4" /> },
                   { text: "Create my roadmap", icon: <LineChart className="w-4 h-4" /> },
                   { text: "Generate business strategy", icon: <Target className="w-4 h-4" /> },
                   { text: "Find competitors", icon: <Search className="w-4 h-4" /> },
                 ].map((chip, idx) => (
                   <button 
                     key={idx}
                     onClick={() => {
                        sendMessage(chip.text, "orchestrator");
                     }}
                     className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all text-left text-sm font-medium text-neutral-300 hover:text-white hover:-translate-y-0.5 group shadow-lg"
                   >
                     <span className="text-neutral-500 group-hover:text-white transition-colors">{chip.icon}</span>
                     <span>{chip.text}</span>
                   </button>
                 ))}
               </div>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-4 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 relative overflow-hidden shadow-lg ${
                    isUser ? "bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/10 text-white" : "bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  }`}
                >
                  {!isUser && <div className="absolute inset-0 bg-white/20 blur-xl animate-pulse" />}
                  <span className="relative z-10 tracking-tighter">{isUser ? "ME" : "IS"}</span>
                </div>

                <div className={`space-y-1.5 max-w-[85%] sm:max-w-[75%] ${isUser ? "text-right" : ""}`}>
                  <div className={`flex items-center space-x-2 text-[10px] text-neutral-500 font-mono ${isUser ? "justify-end" : ""}`}>
                    <span className="font-bold text-neutral-400">{isUser ? "Founder" : msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-5 rounded-2xl text-[15px] leading-relaxed shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                      isUser
                        ? "bg-gradient-to-br from-neutral-200 to-white text-black font-medium rounded-tr-sm"
                        : "bg-white/[0.03] backdrop-blur-md border border-white/[0.08] text-neutral-200 rounded-tl-sm"
                    }`}
                  >
                    {isUser ? (
                      <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                    ) : (
                      <MarkdownRenderer content={msg.content} isStreaming={msg.isStreaming} />
                    )}

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

                    {/* Dashboard Transition Prompt */}
                    {!isUser && msg.action === "login" && (
                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col items-start space-y-3">
                        <p className="text-xs text-neutral-400 font-medium">Memory sync ready. Let&apos;s generate your Founder Dashboard.</p>
                        <GlowingButton onClick={handleGoToDashboard} icon={<ArrowRight className="w-4 h-4" />}>
                          Generate Dashboard
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
            <div className="flex items-start space-x-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-white/20 blur-xl animate-pulse" />
                 <span className="text-white font-extrabold text-sm tracking-tighter relative z-10">IS</span>
               </div>
               <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono">
                    <span className="font-bold text-neutral-400">Isaac.AI</span>
                    <span>•</span>
                    <span>Thinking...</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] text-xs text-neutral-300 flex items-center space-x-3 font-mono rounded-tl-sm shadow-lg w-fit">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span>Synthesizing intelligence...</span>
                  </div>
               </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Bar Form */}
        <div className="p-6 bg-black/20 border-t border-white/[0.08] backdrop-blur-xl relative z-20">
          <form onSubmit={handleSend} className="relative flex items-end gap-3 p-2 bg-white/[0.03] border border-white/[0.12] rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:bg-white/[0.05] focus-within:border-white/20 transition-all">
            
            <button type="button" className="p-3 text-neutral-500 hover:text-white transition-colors shrink-0 rounded-full hover:bg-white/10 self-end">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e as unknown as React.FormEvent);
                }
              }}
              placeholder="Describe your startup idea..."
              className="flex-1 max-h-32 min-h-[44px] py-3 bg-transparent text-[15px] text-white placeholder-neutral-500 focus:outline-none resize-none font-medium"
              rows={1}
              autoFocus
            />
            
            <div className="flex items-center gap-1 self-end pr-1 pb-1">
              <button type="button" className="p-2.5 text-neutral-500 hover:text-white transition-colors shrink-0 rounded-full hover:bg-white/10">
                <Mic className="w-5 h-5" />
              </button>
              <button 
                type="submit" 
                disabled={isThinking || !inputText.trim()}
                className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
                  inputText.trim() && !isThinking ? "bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-white/10 text-neutral-500 cursor-not-allowed"
                }`}
              >
                {isThinking ? <Cpu className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
              </button>
            </div>
          </form>
          
          <div className="flex items-center justify-between mt-4 text-[10px] text-neutral-500 font-mono">
             <span>ISAAC.AI can make mistakes. Consider verifying important metrics.</span>
             <div className="flex items-center gap-1.5 uppercase tracking-widest hidden sm:flex">
               <span>Powered by ISAAC.AI</span>
               <span className="w-1 h-1 rounded-full bg-white/20" />
               <span>AI Founder OS</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
