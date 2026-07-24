"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { RadialProgress } from "@/components/ui/RadialProgress";
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Zap,
  TrendingUp,
  Globe,
  FileText,
  CheckCircle2,
  Lock,
  Layers,
  Flame,
  Code,
  Users
} from "lucide-react";

export function LandingPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="relative min-h-screen bg-[#07080c] text-white overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Radial Lights & Video Gradient Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-radial-grid opacity-30 pointer-events-none" />

      {/* Top Header Banner */}
      <header className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6 border-b border-white/10 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px] shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            ISAAC<span className="text-indigo-400">.AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#agents" className="hover:text-white transition-colors">25+ AI Agents</a>
          <a href="#validation" className="hover:text-white transition-colors">Validation Engine</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("auth")}
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
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
      <section className="relative z-10 pt-16 pb-24 px-6 text-center max-w-5xl mx-auto">
        {/* Futuristic Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-xs font-medium text-indigo-300 mb-8 shadow-[0_0_20px_rgba(99,102,241,0.2)] animate-float">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>The World's First AI Founder Operating System</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          The AI Co-Founder <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent glow-text">
            Every Founder Deserves
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          From Day 0 idea validation to Delaware/Global incorporation, product architecture, financial modeling, and VC pitch grilling — powered by 25+ specialized C-suite AI agents working in parallel. Zero sugarcoating.
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <GlowingButton
            onClick={() => setActiveTab("dashboard")}
            size="lg"
            icon={<Zap className="w-5 h-5" />}
          >
            Enter Founder Workspace
          </GlowingButton>
          <button
            onClick={() => setActiveTab("validation")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-sm font-medium transition-all"
          >
            Run Free Idea Validation
          </button>
        </div>

        {/* Futuristic Live Operating System Dashboard Mockup Card */}
        <div className="relative rounded-3xl border border-indigo-500/30 bg-slate-950/80 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,0.2)] max-w-4xl mx-auto text-left">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-slate-500">isaac-os://workspace/startup-index</span>
            </div>
            <div className="flex items-center space-x-2 text-indigo-400 font-mono">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>Orchestrator Mesh: 25 Agents Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
              <RadialProgress score={84} label="Startup Score" color="indigo" />
              <p className="mt-2 text-xs text-slate-400 font-medium">Delaware C-Corp Ready</p>
            </GlassCard>

            <GlassCard className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-400" /> Devil's Advocate
                </span>
                <span className="text-[10px] text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-500/30">Warning</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Your $49/mo pricing plan will suffer 14% monthly churn unless you embed automated PRD generation into week 1."
              </p>
            </GlassCard>

            <GlassCard className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-emerald-400" /> CTO Architect
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">Ready</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "DB Schema & Next.js 14 server action handlers generated for 30-day MVP release."
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything A Founder Needs From Day 0 to Scale
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Stop juggling 12 different tools, expensive law firms, and generic chatbots. Isaac.AI provides enterprise-grade startup orchestration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard glow="indigo" className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Startup Validation Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates non-sugarcoated Idea Scores, SWOT analysis, PESTLE matrices, Porter's 5 forces, and moat metrics before spending $1 on development.
            </p>
          </GlassCard>

          <GlassCard glow="cyan" className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Country Incorporation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare DIY vs CA vs Law Firm incorporation across US (Delaware C-Corp), UK, India (Pvt Ltd), Singapore, and UAE with step-by-step checklists.
            </p>
          </GlassCard>

          <GlassCard glow="emerald" className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Document Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly generate VC Pitch Decks, PRDs, Founder Agreements, NDAs, ESOP plans, Cap Tables, and 3-year Financial Models.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
        <p className="text-slate-400 text-sm mb-12">Cancel anytime. 14-day money-back guarantee.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          <GlassCard className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Free Starter</h3>
              <p className="text-xs text-slate-400">Ideal for exploring startup ideas</p>
              <div className="mt-4 text-3xl font-extrabold text-white">$0</div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Basic Idea Score & SWOT</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 3 AI Agent Conversations/day</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Basic Delaware/India Legal Guide</li>
            </ul>
            <GlowingButton onClick={() => setActiveTab("onboarding")} variant="secondary" className="w-full">Get Started Free</GlowingButton>
          </GlassCard>

          <GlassCard glow="indigo" className="p-6 space-y-6 border-indigo-500/50 bg-indigo-950/20 relative">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider">Most Popular</div>
            <div>
              <h3 className="text-lg font-bold text-white">Founder Pro</h3>
              <p className="text-xs text-indigo-300">For serious builders & early startups</p>
              <div className="mt-4 text-3xl font-extrabold text-white">$49 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited 25+ AI Agent Access</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Full Document Studio (Pitch Deck, PRD, NDA)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Interactive Action Roadmap (7 to 90 Days)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Multi-Country Incorporation Assistant</li>
            </ul>
            <GlowingButton onClick={() => setActiveTab("billing")} variant="primary" className="w-full">Start Pro Trial</GlowingButton>
          </GlassCard>

          <GlassCard className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Business & Incubator</h3>
              <p className="text-xs text-slate-400">For teams, advisors & incubators</p>
              <div className="mt-4 text-3xl font-extrabold text-white">$199 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Multi-User Team Access & Role Management</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> VC Matching & Pitch Deck Griller</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dedicated Prompt & Memory Indexing</li>
            </ul>
            <GlowingButton onClick={() => setActiveTab("billing")} variant="secondary" className="w-full">Contact Enterprise</GlowingButton>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-slate-500">
        <p>© 2026 ISAAC.AI Inc. All rights reserved. The AI Co-Founder Every Founder Deserves.</p>
      </footer>
    </div>
  );
}
