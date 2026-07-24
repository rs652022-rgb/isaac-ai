"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { FounderProfile } from "@/types";
import { Sparkles, ArrowRight, Bot } from "lucide-react";

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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-black">
      <div className="w-full max-w-2xl space-y-6">
        {/* Onboarding Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI FOUNDER MEMORY SYNC</span>
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            Step {currentStep + 1} of {QUESTIONS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 rounded-full bg-neutral-900 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Conversational AI Card */}
        <GlassCard className="p-6 sm:p-8 space-y-6 border-white/10 bg-[#080808]">
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-white">{currentQ.agentName}</span>
                <span className="px-2 py-0.5 text-[9px] rounded bg-white/10 text-neutral-300 font-mono">
                  Online
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-relaxed">
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
              className="w-full p-4 rounded-xl glass-input text-xs text-white placeholder-neutral-500 focus:outline-none resize-none"
            />

            <div className="flex items-center justify-between">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="text-xs text-neutral-400 hover:text-white"
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
        <div className="p-4 rounded-xl border border-white/5 bg-neutral-950 text-xs text-neutral-400 space-y-1">
          <p className="font-mono text-neutral-500 text-[10px] uppercase">Active Memory Buffer:</p>
          <p><strong className="text-white">Startup Name:</strong> {answers.startupName}</p>
          <p><strong className="text-white">Industry:</strong> {answers.industry}</p>
          <p><strong className="text-white">Region:</strong> {answers.country}</p>
        </div>
      </div>
    </div>
  );
}
