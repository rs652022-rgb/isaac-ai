"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { RadialProgress } from "@/components/ui/RadialProgress";
import Silk from "@/components/background/Silk";
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Zap,
  Globe,
  FileText,
  CheckCircle2,
  Flame,
  Code
} from "lucide-react";

export function LandingPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      {/* Silk Background Shader */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
        <Silk
          speed={5}
          scale={1}
          color="#ffffff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Dark overlay for optimal text readability */}
      <div className="absolute inset-0 bg-black/50 -z-10 pointer-events-none"></div>

      {/* Existing Homepage Content */}
      <div className="relative z-10">
        {/* Top Header Banner */}
        <header className="flex items-center justify-between px-6 lg:px-12 py-6 border-b border-white/[0.08] max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              IS
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ISAAC<span className="text-neutral-500 font-light">.AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#agents" className="hover:text-white transition-colors">25+ AI Agents</a>
            <a href="#validation" className="hover:text-white transition-colors">Validation Engine</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab("auth")}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <GlowingButton
              onClick={() => setActiveTab("onboarding")}
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Launch Isaac OS
            </GlowingButton>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-20 pb-24 px-6 text-center max-w-5xl mx-auto">
          {/* Futuristic Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/10 bg-neutral-950 text-xs font-medium text-neutral-300 mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>The World's First AI Founder Operating System</span>
            <span className="w-1 h-1 rounded-full bg-white" />
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6 text-white">
            The AI Co-Founder <br />
            <span className="font-serif-accent italic font-normal text-neutral-300">
              Every Founder Deserves
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            From Day 0 idea validation to Delaware/Global incorporation, product architecture, financial modeling, and VC pitch grilling — powered by 25+ specialized C-suite AI agents. Zero sugarcoating.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <GlowingButton
              onClick={() => setActiveTab("dashboard")}
              size="lg"
              icon={<Zap className="w-4 h-4" />}
            >
              Enter Founder Workspace
            </GlowingButton>
            <button
              onClick={() => setActiveTab("validation")}
              className="w-full sm:w-auto px-7 py-3 rounded-full border border-white/15 bg-black hover:bg-neutral-900 text-neutral-200 text-sm font-medium transition-all"
            >
              Run Free Idea Validation
            </button>
          </div>

          {/* Neuralyn Dark Floating Operating System Mockup Card */}
          <div className="relative rounded-3xl border border-white/10 bg-[#050505] p-5 sm:p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs text-neutral-400 font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="ml-2 text-neutral-500">isaac-os://workspace/startup-index</span>
              </div>
              <div className="flex items-center space-x-2 text-white font-mono">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>Orchestrator Mesh: 25 Agents Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
              <GlassCard className="p-5 flex flex-col items-center justify-center text-center">
                <RadialProgress score={84} label="Startup Score" />
                <p className="mt-2 text-xs text-neutral-400 font-medium">Delaware C-Corp Ready</p>
              </GlassCard>

              <GlassCard className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-400" /> Devil's Advocate
                  </span>
                  <span className="text-[10px] text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/20 font-mono">Warning</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  "Your $49/mo pricing plan will suffer 14% monthly churn unless you embed automated PRD generation into week 1."
                </p>
              </GlassCard>

              <GlassCard className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-emerald-400" /> CTO Architect
                  </span>
                  <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">Ready</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  "DB Schema & Next.js 14 server action handlers generated for 30-day MVP release."
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Everything A Founder Needs <br />
              <span className="font-serif-accent italic font-normal text-neutral-400">From Day 0 to Scale</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">
              Stop juggling 12 different tools, expensive law firms, and generic chatbots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-8 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Startup Validation Engine</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Generates non-sugarcoated Idea Scores, SWOT analysis, PESTLE matrices, Porter's 5 forces, and moat metrics before spending $1 on development.
              </p>
            </GlassCard>

            <GlassCard className="p-8 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Country Incorporation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Compare DIY vs CA vs Law Firm incorporation across US (Delaware C-Corp), UK, India (Pvt Ltd), Singapore, and UAE with step-by-step checklists.
              </p>
            </GlassCard>

            <GlassCard className="p-8 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Document Studio</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Instantly generate VC Pitch Decks, PRDs, Founder Agreements, NDAs, ESOP plans, Cap Tables, and 3-year Financial Models.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08] text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Transparent Pricing</h2>
          <p className="text-neutral-400 text-sm mb-16">Cancel anytime. 14-day money-back guarantee.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            <GlassCard className="p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Free Starter</h3>
                <p className="text-xs text-neutral-400">Ideal for exploring startup ideas</p>
                <div className="text-4xl font-extrabold text-white">$0</div>
                <ul className="space-y-2 text-xs text-neutral-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Basic Idea Score & SWOT</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> 3 AI Agent Conversations/day</li>
                </ul>
              </div>
              <GlowingButton onClick={() => setActiveTab("onboarding")} variant="secondary" className="w-full">Get Started Free</GlowingButton>
            </GlassCard>

            <GlassCard className="p-8 space-y-6 flex flex-col justify-between border-white/30 bg-neutral-950 relative">
              <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest font-mono">Recommended</div>
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Founder Pro</h3>
                <p className="text-xs text-neutral-400">For serious builders & early startups</p>
                <div className="text-4xl font-extrabold text-white">$49 <span className="text-xs font-normal text-neutral-400">/ mo</span></div>
                <ul className="space-y-2 text-xs text-neutral-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Unlimited 25+ AI Agent Access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Full Document Studio (Pitch Deck, PRD, NDA)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Interactive Action Roadmap (7 to 90 Days)</li>
                </ul>
              </div>
              <GlowingButton onClick={() => setActiveTab("billing")} variant="primary" className="w-full">Start Pro Trial</GlowingButton>
            </GlassCard>

            <GlassCard className="p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Business & Incubator</h3>
                <p className="text-xs text-neutral-400">For teams, advisors & incubators</p>
                <div className="text-4xl font-extrabold text-white">$199 <span className="text-xs font-normal text-neutral-400">/ mo</span></div>
                <ul className="space-y-2 text-xs text-neutral-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Multi-User Team Access & Role Management</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> VC Matching & Pitch Deck Griller</li>
                </ul>
              </div>
              <GlowingButton onClick={() => setActiveTab("billing")} variant="secondary" className="w-full">Contact Enterprise</GlowingButton>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/[0.08] text-center text-xs text-neutral-500 font-mono">
          <p>© 2026 ISAAC.AI Inc. All rights reserved. The AI Co-Founder Every Founder Deserves.</p>
        </footer>
      </div>
    </div>
  );
}
