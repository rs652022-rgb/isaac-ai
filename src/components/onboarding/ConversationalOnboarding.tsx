"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { FounderProfile } from "@/types";
import { Sparkles, Send, CheckCircle2, ArrowRight, Bot, User, RefreshCw } from "lucide-react";

interface StepQuestion {
  id: keyof FounderProfile;
  question: string;
  placeholder: string;
  agentName: string;
}

const initialOnboardingState: Partial<FounderProfile> = {
  startupName: "Isaac.AI",
  industry: "B2B SaaS / Artificial Intelligence",
  country: "US",
  problem: "First-time founders waste months on legal compliance, PRDs, pitch decks, and tech architecture without C-suite advice.",
  solution: "Autonomous multi-agent founder operating system delivering non-sugarcoated guidance and automated execution.",
  targetAudience: "Solopreneurs, early-stage founders, incubators",
  budget: "$15,000",
  fundingStage: "Pre-Seed"
};

export function ConversationalOnboarding() {
  const { updateFounderProfile, setActiveTab } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FounderProfile>>(initialOnboardingState);
  const [currentInput, setCurrentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const QUESTIONS: StepQuestion[] = [
    {
      id: "startupName",
      question: "Hello! I am Isaac, your Master AI Orchestrator. What is the name of your startup or project idea?",
      placeholder: "e.g., Isaac.AI, Acme Cloud, MedSync",
      agentName: "Master Orchestrator"
    },
    {
      id: "industry",
      question: "Which primary industry or sector does your startup operate in?",
      placeholder: "e.g., B2B SaaS, HealthTech, FinTech, E-commerce, EdTech",
      agentName: "Market Analyst"
    },
    {
      id: "country",
      question: "Which country do you plan to incorporate or operate in?",
      placeholder: "e.g., US, UK, India, Singapore, UAE, Germany",
      agentName: "Legal Counsel & CA"
    },
    {
      id: "problem",
      question: "What core problem are you solving for your target customers? Be specific.",
      placeholder: "e.g., Founders struggle to navigate incorporation and pitch decks...",
      agentName: "Devil's Advocate"
    },
    {
      id: "solution",
      question: "What is your core product or solution? How does it solve this problem?",
      placeholder: "e.g., An autonomous AI Operating System with 25 C-suite agents...",
      agentName: "Chief Product Officer"
    },
    {
      id: "budget",
      question: "What is your estimated initial budget or available capital?",
      placeholder: "e.g., $5,000, $25,000, Bootstrapped",
      agentName: "CFO & Financial Advisor"
    }
  ];

  const handleNextStep = () => {
    if (currentInput.trim()) {
      const fieldId = QUESTIONS[currentStep].id;
      const updated = { ...answers, [fieldId]: currentInput.trim() };
      setAnswers(updated);
      setCurrentInput("");
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        updateFounderProfile(answers);
        setIsProcessing(false);
        setActiveTab("dashboard");
      }, 1200);
    }
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Onboarding Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>AI Founder Memory Synchronization</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Step {currentStep + 1} of {QUESTIONS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Conversational AI Card */}
        <GlassCard glow="indigo" className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-300">{currentQ.agentName}</span>
                <span className="px-2 py-0.5 text-[9px] rounded bg-indigo-500/20 text-indigo-400 font-mono">
                  Online
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>
            </div>
          </div>

          {/* User Input Area */}
          <div className="space-y-4 pt-2">
            <textarea
              rows={3}
              value={currentInput || (answers[currentQ.id] as string) || ""}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentQ.placeholder}
              className="w-full p-4 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none resize-none"
            />

            <div className="flex items-center justify-between">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back
                </button>
              ) : <div />}

              <GlowingButton
                onClick={handleNextStep}
                loading={isProcessing}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {currentStep === QUESTIONS.length - 1 ? "Complete Memory Sync" : "Continue"}
              </GlowingButton>
            </div>
          </div>
        </GlassCard>

        {/* Summary of Saved Memory */}
        <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 text-xs text-slate-400 space-y-1">
          <p className="font-mono text-slate-500 text-[10px] uppercase">Active Persistent Memory Buffer:</p>
          <p><strong className="text-slate-300">Startup Name:</strong> {answers.startupName}</p>
          <p><strong className="text-slate-300">Industry:</strong> {answers.industry}</p>
          <p><strong className="text-slate-300">Region:</strong> {answers.country}</p>
        </div>
      </div>
    </div>
  );
}
