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
  Command,
  Mic,
  Cpu,
  Layers,
  Target,
  FileCheck,
  Building2,
  Users
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
      text: "👋 Welcome to Isaac OS.\n\nI'm your AI Co-Founder.\n\nI'll help you build and grow your startup from Day 0 idea validation to Delaware incorporation, pitch decks, and seed funding.\n\nTo initialize your Founder Graph Memory: **What startup idea or problem are you building today?**",
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

  // Categorized Templates
  const templateCategories = [
    {
      id: "ai",
      label: "AI & B2B SaaS",
      prompt: "Building an Autonomous AI Workflow Agent for B2B Enterprise Operations",
      icon: "🤖",
    },
    {
      id: "fintech",
      label: "Fintech & Payments",
      prompt: "E-Commerce Micro-Lending API and Cross-Border Treasury Protocol",
      icon: "💳",
    },
    {
      id: "health",
      label: "Healthcare & Bio",
      prompt: "AI-Powered Clinical Trial Workflow and Medical Records Platform",
      icon: "🧬",
    },
    {
      id: "devtools",
      label: "Developer Tools",
      prompt: "Real-time Edge API Performance Optimization Engine for Cloud Engineers",
      icon: "⚡",
    },
  ];

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
    } font-sans finally {
      setIsTyping(false);
    }
  };

  const handleCompleteAndEnterDashboard = () => {
    setIsOnboardingCompleted(true);
    onClose();
    router.push("/dashboard");
  };

  if (!isOpen) return null;

  // Determine current stage index based on profile completeness
  const currentStageIndex = completeness < 30 ? 0 : completeness < 55 ? 1 : completeness < 80 ? 2 : 3;
  const stages = [
    { label: "1. Founder Profile", active: currentStageIndex >= 0 },
    { label: "2. Idea Core", active: currentStageIndex >= 1 },
    { label: "3. ICP & Market", active: currentStageIndex >= 2 },
    { label: "4. Stage 1 Roadmap", active: currentStageIndex >= 3 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Glassmorphism Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-3xl"
        />

        {/* Centered Modal Container (Max Width: 1000px / max-w-5xl) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[90vh] sm:h-[86vh] bg-[#090a0f] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.95)] backdrop-blur-3xl flex flex-col overflow-hidden text-white z-10"
        >
          {/* 1. Header Navigation Bar */}
          <div className="px-6 py-4 border-b border-white/[0.08] bg-black/60 backdrop-blur-xl flex items-center justify-between gap-4 shrink-0">
            {/* Logo Mark & Status */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                IS
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold tracking-tight text-white font-sans">
                    ISAAC<span className="text-neutral-500 font-light">.OS</span>
                  </span>
                  <span className="hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Graph Sync</span>
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-mono hidden md:block">
                  Autonomous Founder Onboarding & Memory Engine
                </p>
              </div>
            </div>

            {/* Multi-Stage Tracker Bar */}
            <div className="hidden lg:flex items-center space-x-3 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full">
              {stages.map((stg, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      stg.active
                        ? "bg-white text-black font-extrabold"
                        : "text-neutral-500 bg-white/5"
                    }`}
                  >
                    {stg.label}
                  </span>
                  {i < stages.length - 1 && <span className="text-neutral-600 text-[10px]">→</span>}
                </div>
              ))}
            </div>

            {/* Completeness Bar & Action Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Completeness</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{completeness}%</span>
                </div>
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completeness}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-400 via-white to-indigo-400"
                  />
                </div>
              </div>

              <button
                onClick={handleCompleteAndEnterDashboard}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-neutral-300 transition-all cursor-pointer"
              >
                <span>Skip to OS</span>
                <ArrowRight className="w-3 h-3 text-neutral-400" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
                title="Close Onboarding Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Main Executive Stream Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 scroll-smooth">
            {/* System Onboarding Briefing Card (Welcome Screen) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-xl space-y-5 shadow-2xl relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>ISAAC OS :: SYSTEM ONBOARDING BRIEFING</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
                  <span>Estimated Time: ~3 mins</span>
                  <span>•</span>
                  <span>25 AI Agents Ready</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Welcome to Isaac Founder OS
                </h3>
                <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed font-sans max-w-3xl">
                  Autonomous C-Suite intelligence guiding entrepreneurs from Day 0 idea validation to Delaware C-Corp incorporation, technical PRDs, 3-year financial models, and VC pitch grilling.
                </p>
              </div>

              {/* 4 Capabilities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-white">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>Idea Validation</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono">YC partner challenge mode & SWOT matrix.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-white">
                    <FileCheck className="w-4 h-4 text-cyan-400" />
                    <span>Legal & Compliance</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono">Delaware C-Corp, vesting & 83(b) tax docs.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-white">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>Grant Engine</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono">AI matching for non-dilutive government funds.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-white">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Investor CRM</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono">Pitch deck reviews & VC check matching.</p>
                </div>
              </div>
            </motion.div>

            {/* Conversation Stream Messages */}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex space-x-3.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-1">
                    IS
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-white text-black font-medium rounded-tr-none shadow-md"
                      : "bg-[#0d0e14] border border-white/10 text-neutral-200 rounded-tl-none shadow-xl"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/5 text-[10px] font-mono text-neutral-400">
                    <span className={msg.sender === "user" ? "text-neutral-700 font-bold" : "text-emerald-400 font-bold"}>
                      {msg.sender === "user" ? "Founder" : "Isaac AI Co-Founder"}
                    </span>
                    <span className={msg.sender === "user" ? "text-neutral-500" : "text-neutral-500"}>
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/15 flex items-center justify-center shrink-0 text-white text-xs mt-1">
                    👤
                  </div>
                )}
              </motion.div>
            ))}

            {/* Thinking / Synthesizing State */}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex space-x-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  IS
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#0d0e14] border border-white/10 flex items-center space-x-2 text-xs font-mono text-neutral-300">
                  <Cpu className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>Synthesizing founder context & graph memory...</span>
                </div>
              </motion.div>
            )}

            {/* Generated Profile & Stage Roadmap Card upon completion */}
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-neutral-950 border border-white/15 backdrop-blur-2xl space-y-4 my-4 shadow-2xl"
              >
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">Your Stage 1 Founder Profile & Roadmap Are Synchronized!</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Stage 1 Readiness</span>
                    <p className="text-xl font-extrabold text-white mt-1">88 / 100</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Target Industry</span>
                    <p className="text-xs font-bold text-white mt-1 truncate">{extractedData.industry || "B2B AI SaaS"}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Graph Memory Status</span>
                    <p className="text-xs font-bold text-emerald-400 mt-1">Active Sync</p>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCompleteAndEnterDashboard}
                    className="w-full py-3 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-extrabold flex items-center justify-center space-x-2 shadow-lg shadow-white/10 cursor-pointer"
                  >
                    <Rocket className="w-4 h-4 text-black" />
                    <span>Enter Isaac OS Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. Categorized Startup Template Grid */}
          {messages.length <= 2 && (
            <div className="px-6 py-3 border-t border-white/[0.08] bg-black/40 space-y-2 shrink-0">
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                <span>STARTUP TEMPLATE SUGGESTIONS</span>
                <span>Click to Select</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {templateCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSendMessage(cat.prompt)}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{cat.icon}</span>
                      <span className="text-xs font-bold text-white group-hover:text-neutral-200">{cat.label}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 line-clamp-1 font-mono mt-1">
                      {cat.prompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Linear/Perplexity Command Interface Composer */}
          <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-black/80 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2 rounded-2xl border border-white/12 bg-[#0a0b10] focus-within:border-white/30 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all flex items-center justify-between gap-3"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your startup details or answer Isaac's question..."
                className="flex-1 px-4 py-2 bg-transparent text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none font-sans"
              />

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Upload Pitch Deck or PRD"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
                  title="Voice Input (AI Voice Agent)"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded border border-white/10 bg-black text-[9px] font-mono text-neutral-400">
                  <Command className="w-2.5 h-2.5" /> ↵
                </kbd>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-2 rounded-xl bg-white text-black font-extrabold text-xs disabled:opacity-40 hover:bg-neutral-200 transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5 text-black" />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
