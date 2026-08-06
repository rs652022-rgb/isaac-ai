"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  ArrowRight,
  Bot,
  User as UserIcon,
  CheckCircle2,
  Paperclip,
  Zap,
  BarChart3,
  Rocket,
  ShieldCheck,
  BrainCircuit,
  Lock
} from "lucide-react";
import { useApp } from "@/lib/store/app-context";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { useRouter } from "next/navigation";
import { FounderProfile } from "@/types";

interface AIOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export function AIOnboardingModal({ isOpen, onClose }: AIOnboardingModalProps) {
  const { user, founderProfile, updateFounderProfile, setIsOnboardingCompleted } = useApp();
  const { updateProfileFromChat } = useFounderGraph();
  const router = useRouter();

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_init",
      sender: "ai",
      text: "👋 Welcome to Isaac OS.\n\nI'm your AI Co-Founder.\n\nI'll help you build and grow your startup from idea to scale.\n\nLet's start with one simple question.\n\nWhat are you building?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [extractedData, setExtractedData] = useState<Partial<FounderProfile>>({});
  const [completeness, setCompleteness] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Recalculate completeness
  const calculateCompleteness = (profile: Partial<FounderProfile>) => {
    const fields = [
      profile.startupName,
      profile.industry,
      profile.problem,
      profile.solution,
      profile.targetAudience,
      profile.country,
      profile.businessModel,
      profile.pricing,
      profile.fundingStage,
      profile.budget,
      profile.timeline,
      profile.differentiation,
    ];
    const filledCount = fields.filter((f) => f && f.toString().trim().length > 0).length;
    return Math.min(100, Math.max(15, Math.round(15 + (filledCount / fields.length) * 85)));
  };

  // Process user response & generate streaming AI response
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Heuristic extraction of founder information from conversation
    const newExtracted = { ...extractedData };
    const lower = query.toLowerCase();

    if (!newExtracted.startupName && (query.length < 40 || lower.includes("building") || lower.includes("called"))) {
      const words = query.split(" ");
      newExtracted.startupName = words.slice(0, 3).join(" ").replace(/[^a-zA-Z0-9 ]/g, "");
    }
    if (lower.includes("b2b") || lower.includes("saas") || lower.includes("ai") || lower.includes("app") || lower.includes("platform")) {
      newExtracted.industry = lower.includes("b2b") ? "B2B SaaS" : lower.includes("ai") ? "AI Software" : "Tech Startup";
    }
    if (lower.includes("help") || lower.includes("solve") || lower.includes("problem")) {
      newExtracted.problem = query;
    } else if (!newExtracted.problem) {
      newExtracted.problem = query;
    }
    if (lower.includes("for") || lower.includes("target") || lower.includes("founders") || lower.includes("users")) {
      newExtracted.targetAudience = query;
    }

    setExtractedData(newExtracted);
    updateFounderProfile(newExtracted);
    updateProfileFromChat(newExtracted);

    const newCompleteness = calculateCompleteness(newExtracted);
    setCompleteness(newCompleteness);

    // Fetch AI streaming response
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are Isaac, an elite Y-Combinator level AI Co-Founder. You are conducting an engaging conversational onboarding interview. Ask 1 short, razor-sharp follow-up question to learn more about the founder's target customer, revenue model, or country location. Keep responses concise, warm, and highly professional under 60 words.",
            },
            ...messages.map((m) => ({
              role: m.sender === "ai" ? "assistant" : "user",
              content: m.text,
            })),
            { role: "user", content: query },
          ],
          agentId: "orchestrator",
          profile: newExtracted,
        }),
      });

      if (!res.ok) throw new Error("AI Stream Error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      const aiMsgId = `ai_${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: "ai",
          text: "",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          aiText += chunk;
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMsgId ? { ...m, text: aiText } : m))
          );
        }
      }

      // Check if onboarding condition is satisfied
      if (messages.length >= 5 || newCompleteness >= 70) {
        setIsFinished(true);
        if (!user || user.id === "guest_founder") {
          setShowSignupPrompt(true);
        }
      }
    } catch (err) {
      // Fallback response if offline/error
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_fallback_${Date.now()}`,
          sender: "ai",
          text: "Understood! That sounds like a high-potential market opportunity. I've logged these insights into your Founder Graph Memory.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsFinished(true);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCompleteAndEnterDashboard = () => {
    setIsOnboardingCompleted(true);
    onClose();
    router.push("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Glassmorphism Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
        />

        {/* Fullscreen/Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[88vh] sm:h-[85vh] bg-[#0c0d12]/95 border border-white/15 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl flex flex-col overflow-hidden text-white"
        >
          {/* 1. Modal Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center font-bold text-xs">
                  IS
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold tracking-wide">Isaac AI Co-Founder</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-mono">Autonomous Founder Onboarding & Memory Sync</p>
              </div>
            </div>

            {/* Completeness Progress & Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Profile Completeness</span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <div className="w-28 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completeness}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400"
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">{completeness}%</span>
                </div>
              </div>

              <button
                onClick={handleCompleteAndEnterDashboard}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-neutral-300 transition-all"
              >
                <span>Skip to OS</span>
                <ArrowRight className="w-3 h-3 text-neutral-400" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Main Chat Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 scroll-smooth">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex space-x-3.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-cyan-300 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-md shadow-indigo-600/20"
                      : "bg-white/[0.04] border border-white/10 text-neutral-200 rounded-tl-none backdrop-blur-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="block text-[10px] text-neutral-400 font-mono mt-2 text-right opacity-60">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-300 mt-1">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex space-x-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-cyan-300">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}

            {/* Generated Profile & Value Delivery Card upon completion */}
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-black border border-indigo-500/30 backdrop-blur-2xl space-y-4 my-4 shadow-xl"
              >
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">Your Personalized Startup Profile & Roadmap Are Ready!</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Stage 1 Readiness</span>
                    <p className="text-xl font-extrabold text-cyan-300 mt-1">88 / 100</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Target Industry</span>
                    <p className="text-sm font-bold text-white mt-1 truncate">{extractedData.industry || "B2B AI SaaS"}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Graph Memory Status</span>
                    <p className="text-sm font-bold text-emerald-400 mt-1">Active Sync</p>
                  </div>
                </div>

                {showSignupPrompt && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start space-x-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Your startup roadmap is generated.</p>
                      <p className="text-neutral-300 mt-0.5">Create a free Isaac account to save your progress and access 25+ AI Co-Founders.</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCompleteAndEnterDashboard}
                    className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white text-sm font-bold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/25 cursor-pointer"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Enter Isaac OS Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. Suggestion Quick Chips */}
          {messages.length <= 2 && (
            <div className="px-6 py-2 flex items-center space-x-2 overflow-x-auto scrollbar-none border-t border-white/5 bg-white/[0.01]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase shrink-0">Suggestions:</span>
              {[
                "Building an AI B2B SaaS platform",
                "Mobile healthcare app for doctors",
                "E-commerce automation API",
                "Fintech micro-lending engine"
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 whitespace-nowrap transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* 4. Chat Input Controls */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your startup details or answer Isaac's question..."
                className="w-full pl-5 pr-28 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              />

              <div className="absolute right-2 flex items-center space-x-1">
                <button
                  type="button"
                  className="p-2 rounded-xl text-neutral-400 hover:text-white transition-colors"
                  title="Upload Pitch Deck or PRD"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
