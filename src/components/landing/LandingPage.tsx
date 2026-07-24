"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
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
  Globe,
  FileText,
  CheckCircle2,
  Flame,
  Code,
  Users,
  ChevronDown,
  Building2,
  TrendingUp,
  Award,
  Layers,
  Terminal,
  ShieldCheck,
  ZapOff,
  Scale,
  DollarSign,
  Rocket
} from "lucide-react";

// Client-only dynamic import of Iridescence WebGL background shader
const Iridescence = dynamic(() => import("@/components/background/Iridescence"), {
  ssr: false
});

export function LandingPage() {
  const { setActiveTab } = useApp();
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const showcaseTabs = [
    {
      title: "Validation Engine",
      subtitle: "Non-sugarcoated market reality check",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-neutral-400">Startup Viability Index</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">84 / 100 — High Potential</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-neutral-500 block text-[10px] uppercase font-mono">SWOT Assessment</span>
              <p className="text-white font-medium mt-1">High B2B retention, competitive moat via multi-agent memory.</p>
            </div>
            <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20">
              <span className="text-red-400 block text-[10px] uppercase font-mono">Devil's Advocate Warning</span>
              <p className="text-red-200 mt-1">14% monthly churn risk if onboarding exceeds 3 minutes.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Global Incorporation",
      subtitle: "Delaware C-Corp, UK & India Fast-Track",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-neutral-400">Incorporation Route</span>
            <span className="text-xs font-mono text-white font-bold">Delaware C-Corp (Stripe Atlas / DIY)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
              <span className="text-neutral-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certificate of Incorporation</span>
              <span className="text-[10px] text-emerald-400 font-mono">Generated</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
              <span className="text-neutral-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> US Federal EIN Number</span>
              <span className="text-[10px] text-emerald-400 font-mono">Ready for IRS</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
              <span className="text-neutral-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 83(b) Tax Election Filing</span>
              <span className="text-[10px] text-yellow-400 font-mono">Action Needed (30 Days)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Document Studio",
      subtitle: "Instant PRD, Pitch Deck & Cap Table",
      content: (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-950 border border-white/10 text-neutral-300">
            <span className="text-neutral-500"># Generated Executive Summary</span>
            <p className="mt-1 text-white font-sans">"Isaac.AI is an autonomous multi-agent co-founder OS that replaces $15,000+ in initial legal, advisory, and agency costs for pre-seed founders."</p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>📄 Pitch_Deck_v2.pdf (10 Slides)</span>
            <span>📄 Founder_Agreement_Delaware.docx</span>
          </div>
        </div>
      )
    },
    {
      title: "VC Pitch Griller",
      subtitle: "Brutally honest YC partner simulation",
      content: (
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-200">
            <span className="font-bold text-red-400 flex items-center gap-1.5"><Flame className="w-4 h-4" /> YC Advisor Simulation:</span>
            <p className="mt-1 font-sans text-neutral-200">"Why would a founder pay $49/mo instead of just prompting ChatGPT?"</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Winning Response Defense:</span>
            <p className="mt-1 font-sans text-neutral-200">"ChatGPT lacks persistent multi-agent memory, direct Delaware incorporation automation, and non-sugarcoated SWOT score tracking."</p>
          </div>
        </div>
      )
    }
  ];

  const faqs = [
    {
      q: "How does Isaac.AI differ from standard AI chatbots like ChatGPT or Claude?",
      a: "Isaac.AI is not a generic prompt box. It is an autonomous Operating System powered by 25+ specialized C-suite agents (CTO, Legal Counsel, CFO, VC Griller) that maintain persistent memory, generate legally valid Delaware incorporation docs, build DB schemas, and stress-test your startup metrics continuously."
    },
    {
      q: "Can Isaac.AI help me incorporate my startup legally in Delaware, UK, or India?",
      a: "Yes. Isaac.AI features a dedicated Registration Assistant that provides step-by-step guides, automatically prepares Delaware C-Corp documentation, generates founder vesting agreements, and guides you through EIN, 83(b) tax elections, and banking setup with zero guesswork."
    },
    {
      q: "Is my startup idea and intellectual property secure?",
      a: "Absolutely. All founder data is encrypted using enterprise-grade AES-256 at rest and TLS 1.3 in transit. We do not use your proprietary business plans or startup metrics to train public AI models."
    },
    {
      q: "What happens if I need to export my generated pitch decks, PRDs, and financial models?",
      a: "You retain 100% ownership of every document generated. You can instantly export all documents in PDF, Markdown, Word (.docx), and CSV format with one click."
    },
    {
      q: "Can I upgrade or cancel my subscription plan at any time?",
      a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from the Billing View. There are no hidden lock-in contracts."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      {/* Iridescence WebGL Background Shader */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-50">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.08}
          speed={0.75}
        />
      </div>

      {/* Dark Gradient Overlay for Maximum Visual Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 -z-10 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-radial-grid opacity-20 pointer-events-none -z-10" />

      {/* 1. Floating Glass Navbar */}
      <header className="sticky top-4 z-50 px-4 sm:px-6 max-w-7xl mx-auto">
        <nav className="flex items-center justify-between px-6 py-3.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
            <div className="w-8 h-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              IS
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              ISAAC<span className="text-neutral-500 font-light">.AI</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-xs font-medium text-neutral-400">
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#agents" className="hover:text-white transition-colors">25+ Agents</a>
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#comparison" className="hover:text-white transition-colors">Why Isaac</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab("auth")}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors px-3 py-1.5"
            >
              Sign In
            </button>
            <GlowingButton
              onClick={() => setActiveTab("onboarding")}
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Launch Isaac OS
            </GlowingButton>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-6 text-center max-w-6xl mx-auto">
        {/* Futuristic Pill Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-medium text-neutral-300 mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>The World's First Autonomous AI Founder OS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Hero Title with Instrument Serif Emphasis */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.04] mb-6 text-white">
          The AI Co-Founder <br />
          <span className="font-serif-accent italic font-normal text-neutral-300">
            Every Founder Deserves
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          From Day 0 idea validation to Delaware C-Corp incorporation, technical PRDs, 3-year financial models, and VC pitch grilling — powered by 25+ specialized C-suite AI agents working in parallel. Zero sugarcoating.
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <GlowingButton
            onClick={() => setActiveTab("dashboard")}
            size="lg"
            icon={<Zap className="w-4 h-4" />}
          >
            Enter Founder Workspace
          </GlowingButton>
          <button
            onClick={() => setActiveTab("validation")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/15 bg-black/60 hover:bg-neutral-900 text-neutral-200 text-sm font-medium transition-all backdrop-blur-md hover:border-white/30"
          >
            Run Free Idea Validation
          </button>
        </div>

        {/* Neuralyn Dark Floating Operating System Mockup Card */}
        <div className="relative rounded-3xl border border-white/10 bg-[#050505]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] max-w-5xl mx-auto text-left">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs text-neutral-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="ml-2 text-neutral-500">isaac-os://workspace/startup-index</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400 font-mono">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>25 Active Agents Mesh Synchronized</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <GlassCard className="p-5 flex flex-col items-center justify-center text-center">
              <RadialProgress score={84} label="Startup Score" />
              <p className="mt-3 text-xs text-neutral-400 font-medium">Delaware C-Corp Ready</p>
            </GlassCard>

            <GlassCard className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-400" /> Devil's Advocate
                </span>
                <span className="text-[10px] text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/20 font-mono">Risk Alert</span>
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
                <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">PRD Ready</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                "DB Schema & Next.js 14 server action handlers generated for 30-day MVP release."
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 3. Trusted By Marquee */}
      <section className="py-12 border-y border-white/[0.08] bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-8">
            Empowering Founders Backed By Global Accelerators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-60 text-xs font-semibold tracking-wider text-neutral-300">
            <span>Y COMBINATOR</span>
            <span>TECHSTARS</span>
            <span>SEQUOIA CAPITAL</span>
            <span>ANDREESSEN HOROWITZ</span>
            <span>STRIPE ATLAS</span>
            <span>FOUNDER INSTITUTE</span>
          </div>
        </div>
      </section>

      {/* 4. Product Showcase Tabs */}
      <section id="showcase" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Interactive Product Workspace <br />
            <span className="font-serif-accent italic font-normal text-neutral-400">See Isaac OS In Action</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm">
            Switch between core OS modules to inspect automated outputs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {showcaseTabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveShowcaseTab(idx)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeShowcaseTab === idx
                  ? "border-white/40 bg-white/10 text-white shadow-lg"
                  : "border-white/10 bg-black/40 text-neutral-400 hover:border-white/20"
              }`}
            >
              <div className="text-xs font-bold">{tab.title}</div>
              <div className="text-[10px] text-neutral-500 truncate mt-1">{tab.subtitle}</div>
            </button>
          ))}
        </div>

        <GlassCard className="p-8 border-white/20">
          {showcaseTabs[activeShowcaseTab].content}
        </GlassCard>
      </section>

      {/* 5. AI Features Grid */}
      <section id="agents" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
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

      {/* 6. Multi-Agent Architecture Mesh */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            25+ Specialized C-Suite AI Agents <br />
            <span className="font-serif-accent italic font-normal text-neutral-400">Working In Parallel For You</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm">
            Each agent brings domain-specific expertise from top tech companies and venture firms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { role: "CTO Architect", icon: <Code className="w-5 h-5 text-emerald-400" /> },
            { role: "Legal Counsel", icon: <Scale className="w-5 h-5 text-blue-400" /> },
            { role: "CFO & Finance", icon: <DollarSign className="w-5 h-5 text-yellow-400" /> },
            { role: "CMO Growth", icon: <TrendingUp className="w-5 h-5 text-purple-400" /> },
            { role: "Devil's Advocate", icon: <Flame className="w-5 h-5 text-red-400" /> },
            { role: "VC Advisor", icon: <Award className="w-5 h-5 text-amber-400" /> }
          ].map((agent, idx) => (
            <GlassCard key={idx} className="p-4 text-center space-y-2 hover:border-white/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center">
                {agent.icon}
              </div>
              <div className="text-xs font-bold text-white">{agent.role}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 7. Platform Capabilities Bento Grid */}
      <section id="capabilities" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Platform Capabilities Bento <br />
            <span className="font-serif-accent italic font-normal text-neutral-400">Built For High Execution</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GlassCard className="md:col-span-2 p-8 space-y-4">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Module 01</div>
            <h3 className="text-xl font-bold text-white">Autonomous Action Roadmap (7 to 90 Days)</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Automatically breaks down giant goals into daily micro-sprints assigned to relevant agents with status tracking.
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Module 02</div>
            <h3 className="text-xl font-bold text-white">Delaware & International Incorporation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Step-by-step filings for US Delaware C-Corp, UK Ltd, and India Pvt Ltd.
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Module 03</div>
            <h3 className="text-xl font-bold text-white">VC Pitch Griller</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Prepares you for hard partner questions with brutal reality check simulations.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 8. Why Isaac.AI Comparison */}
      <section id="comparison" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Traditional Methods vs Isaac.AI OS <br />
            <span className="font-serif-accent italic font-normal text-neutral-400">Why Founders Choose Isaac</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-8 space-y-4 border-red-500/20 bg-red-950/10">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider">Traditional Method</div>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><ZapOff className="w-4 h-4 text-red-400" /> $5,000+ legal fees for incorporation</li>
              <li className="flex items-center gap-2"><ZapOff className="w-4 h-4 text-red-400" /> 6+ weeks waiting for PRD & docs</li>
              <li className="flex items-center gap-2"><ZapOff className="w-4 h-4 text-red-400" /> Generic AI prompts with zero memory</li>
            </ul>
          </GlassCard>

          <GlassCard className="p-8 space-y-4 border-emerald-500/30 bg-emerald-950/10">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Isaac.AI Founder OS</div>
            <ul className="space-y-3 text-xs text-neutral-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> $49/mo flat pricing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10-minute setup for PRD & Pitch Deck</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 25+ specialized agents in parallel</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* 9. Live Platform Metrics */}
      <section className="py-16 border-t border-white/[0.08] bg-black/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">$42M+</div>
            <div className="text-xs text-neutral-400 mt-1">Founder Capital Raised</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">12,400+</div>
            <div className="text-xs text-neutral-400 mt-1">Startups Validated</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">99.4%</div>
            <div className="text-xs text-neutral-400 mt-1">Delaware Approval Rate</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">25</div>
            <div className="text-xs text-neutral-400 mt-1">Active C-Suite Agents</div>
          </div>
        </div>
      </section>

      {/* 10. Pricing Section */}
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

      {/* 11. FAQ Section */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-400 text-sm">Everything you need to know about Isaac.AI</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <GlassCard key={idx} className="p-6 cursor-pointer" onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}>
              <div className="flex items-center justify-between text-sm font-bold text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === idx ? "rotate-180 text-white" : "text-neutral-500"}`} />
              </div>
              {openFaqIndex === idx && (
                <p className="mt-3 text-xs text-neutral-400 leading-relaxed border-t border-white/10 pt-3">
                  {faq.a}
                </p>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 12. Final CTA Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <GlassCard className="p-12 text-center space-y-6 border-white/20 bg-gradient-to-b from-white/10 to-transparent">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Build Your Startup With An <br />
            <span className="font-serif-accent italic font-normal text-neutral-300">AI Co-Founder Today</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm">
            Join thousands of entrepreneurs turning raw ideas into Delaware-backed companies.
          </p>
          <div className="pt-4 flex justify-center">
            <GlowingButton onClick={() => setActiveTab("onboarding")} size="lg" icon={<Rocket className="w-4 h-4" />}>
              Launch Isaac OS Free
            </GlowingButton>
          </div>
        </GlassCard>
      </section>

      {/* 13. Premium Footer */}
      <footer className="py-12 border-t border-white/[0.08] text-center text-xs text-neutral-500 font-mono space-y-2">
        <div className="flex items-center justify-center space-x-2 text-emerald-400 font-mono text-[11px] mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All 25 C-Suite AI Agents Operational</span>
        </div>
        <p>© 2026 ISAAC.AI Inc. All rights reserved. The AI Co-Founder Every Founder Deserves.</p>
      </footer>
    </div>
  );
}
