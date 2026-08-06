"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Globe,
  FileText,
  CheckCircle2,
  Code,
  ChevronDown,
  TrendingUp,
  Award,
  Scale,
  DollarSign,
  Flame,
  ZapOff
} from "lucide-react";

// Client-only dynamic import of DarkVeil WebGL background shader
const DarkVeil = dynamic(() => import("@/components/background/DarkVeil"), {
  ssr: false
});

import { useRouter } from "next/navigation";
import { AIOnboardingModal } from "@/components/onboarding/AIOnboardingModal";
import { HeroBackground } from "@/components/background/HeroBackground";
import { NeuralBackgroundCanvas } from "@/components/background/NeuralBackgroundCanvas";
import {
  AgentsMeshBackground,
  FeaturesBackground,
  ComparisonBackground,
  PricingBackground,
  FaqBackground
} from "@/components/background/SectionBackgrounds";

export function LandingPage() {
  const router = useRouter();
  const { isOnboardingCompleted, founderProfile } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isAIOnboardingOpen, setIsAIOnboardingOpen] = useState(false);

  const handleLaunchOS = () => {
    setIsAIOnboardingOpen(true);
  };

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
      {/* Grid Pattern Accent Overlay */}
      <div className="fixed inset-0 bg-radial-grid opacity-15 pointer-events-none -z-10" />

      {/* 1. Floating Glass Navbar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-4 z-50 px-4 sm:px-6 max-w-7xl mx-auto"
      >
        <nav className="flex items-center justify-between px-6 py-3.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              IS
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              ISAAC<span className="text-neutral-500 font-light">.AI</span>
            </span>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8 text-xs font-medium text-neutral-400">
            <a href="#agents" className="hover:text-white transition-colors">25+ Agents</a>
            <a href="#comparison" className="hover:text-white transition-colors">Why Isaac</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/login")}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors px-3 py-1.5"
            >
              Sign In
            </button>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <GlowingButton
                onClick={handleLaunchOS}
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Launch Isaac OS
              </GlowingButton>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center max-w-6xl mx-auto">
        {/* Dedicated Animated Hero Background */}
        <HeroBackground />

        {/* Futuristic Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs font-medium text-neutral-300 mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>The World&apos;s First Autonomous AI Founder OS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Hero Title with Instrument Serif Emphasis */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.04] mb-6 text-white"
        >
          The AI Co-Founder <br />
          <motion.span 
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif-accent italic font-normal text-neutral-300 inline-block"
          >
            Every Founder Deserves
          </motion.span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          From Day 0 idea validation to Delaware C-Corp incorporation, technical PRDs, 3-year financial models, and VC pitch grilling — powered by 25+ specialized C-suite AI agents working in parallel.
        </motion.p>

        {/* Action CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <GlowingButton
              onClick={handleLaunchOS}
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started Free
            </GlowingButton>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/login")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 text-sm font-medium transition-all backdrop-blur-md hover:border-white/30"
          >
            Sign In
          </motion.button>
        </motion.div>
      </section>

      {/* 3. Trusted By Marquee */}
      <section className="py-12 border-y border-white/[0.08] bg-black/40 backdrop-blur-md overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Empowering Founders Backed By Global Accelerators
          </p>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee-scroll flex items-center gap-12 sm:gap-20 opacity-60 text-xs font-semibold tracking-wider text-neutral-300 whitespace-nowrap">
            <span>Y COMBINATOR</span>
            <span>TECHSTARS</span>
            <span>SEQUOIA CAPITAL</span>
            <span>ANDREESSEN HOROWITZ</span>
            <span>STRIPE ATLAS</span>
            <span>FOUNDER INSTITUTE</span>
            {/* Duplicate for seamless 100% infinite marquee loop */}
            <span>Y COMBINATOR</span>
            <span>TECHSTARS</span>
            <span>SEQUOIA CAPITAL</span>
            <span>ANDREESSEN HOROWITZ</span>
            <span>STRIPE ATLAS</span>
            <span>FOUNDER INSTITUTE</span>
          </div>
        </div>
      </section>

      {/* 4. Multi-Agent Architecture Mesh */}
      <section id="agents" className="relative py-24 px-6 max-w-6xl mx-auto border-t border-white/[0.08]">
        {/* Animated Neural Network Mesh Background */}
        <AgentsMeshBackground />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            25+ Specialized C-Suite AI Agents <br />
            <span className="font-serif-accent italic font-normal text-neutral-400">Working In Parallel For You</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm">
            Each agent brings domain-specific expertise from top tech companies and venture firms.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative z-10"
        >
          {[
            { role: "CTO Architect", icon: <Code className="w-5 h-5 text-emerald-400" /> },
            { role: "Legal Counsel", icon: <Scale className="w-5 h-5 text-blue-400" /> },
            { role: "CFO & Finance", icon: <DollarSign className="w-5 h-5 text-yellow-400" /> },
            { role: "CMO Growth", icon: <TrendingUp className="w-5 h-5 text-purple-400" /> },
            { role: "Devil's Advocate", icon: <Flame className="w-5 h-5 text-red-400" /> },
            { role: "VC Advisor", icon: <Award className="w-5 h-5 text-amber-400" /> }
          ].map((agent, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <GlassCard className="p-4 text-center space-y-2 hover:border-white/30 transition-all h-full">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center"
                >
                  {agent.icon}
                </motion.div>
                <div className="text-xs font-bold text-white">{agent.role}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. AI Features Grid */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        {/* Ambient Orbital Glow Background */}
        <FeaturesBackground />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <GlassCard className="p-8 space-y-4 h-full">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              >
                <ShieldAlert className="w-5 h-5" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">Startup Validation Engine</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Generates non-sugarcoated Idea Scores, SWOT analysis, PESTLE matrices, Porter&apos;s 5 forces, and moat metrics before spending $1 on development.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <GlassCard className="p-8 space-y-4 h-full">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              >
                <Globe className="w-5 h-5" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">Multi-Country Incorporation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Compare DIY vs CA vs Law Firm incorporation across US (Delaware C-Corp), UK, India (Pvt Ltd), Singapore, and UAE with step-by-step checklists.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <GlassCard className="p-8 space-y-4 h-full">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              >
                <FileText className="w-5 h-5" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">AI Document Studio</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Instantly generate VC Pitch Decks, PRDs, Founder Agreements, NDAs, ESOP plans, Cap Tables, and 3-year Financial Models.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      {/* 6. Why Isaac.AI Comparison */}
      <section id="comparison" className="relative py-24 px-6 max-w-5xl mx-auto border-t border-white/[0.08]">
        {/* Dual Red vs Emerald Glow Background */}
        <ComparisonBackground />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Traditional Methods vs Isaac.AI OS <br />
            <span className="font-serif-accent italic font-normal text-neutral-400">Why Founders Choose Isaac</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <GlassCard className="p-8 space-y-4 border-red-500/20 bg-red-950/10 h-full">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider">Traditional Method</div>
              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-center gap-2"><ZapOff className="w-4 h-4 text-red-400 shrink-0" /> $5,000+ legal fees for incorporation</li>
                <li className="flex items-center gap-2"><ZapOff className="w-4 h-4 text-red-400 shrink-0" /> 6+ weeks waiting for PRD & docs</li>
                <li className="flex items-center gap-2"><ZapOff className="w-4 h-4 text-red-400 shrink-0" /> Generic AI prompts with zero memory</li>
              </ul>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <GlassCard className="p-8 space-y-4 border-emerald-500/30 bg-emerald-950/10 h-full">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Isaac.AI Founder OS</div>
              <ul className="space-y-3 text-xs text-neutral-200">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> $49/mo flat pricing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 10-minute setup for PRD & Pitch Deck</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 25+ specialized agents in parallel</li>
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08] text-center">
        {/* Recommended Pro Tier Spotlight Background */}
        <PricingBackground />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Transparent Pricing</h2>
          <p className="text-neutral-400 text-sm mb-16">Cancel anytime. 14-day money-back guarantee.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left relative z-10"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
            className="h-full"
          >
            <GlassCard className="p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Free Starter</h3>
                <p className="text-xs text-neutral-400">Ideal for exploring startup ideas</p>
                <div className="text-4xl font-extrabold text-white">$0</div>
                <ul className="space-y-2 text-xs text-neutral-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> Basic Idea Score & SWOT</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> 3 AI Agent Conversations/day</li>
                </ul>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <GlowingButton onClick={handleLaunchOS} variant="secondary" className="w-full">Get Started Free</GlowingButton>
              </motion.div>
            </GlassCard>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="h-full relative"
          >
            <GlassCard className="p-8 space-y-6 flex flex-col justify-between border-emerald-500/30 bg-emerald-950/10 relative h-full shadow-[0_0_30px_rgba(16,185,129,0.12)]">
              <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest font-mono">Recommended</div>
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Founder Pro</h3>
                <p className="text-xs text-neutral-400">For serious builders & early startups</p>
                <div className="text-4xl font-extrabold text-white">$49 <span className="text-xs font-normal text-neutral-400">/ mo</span></div>
                <ul className="space-y-2 text-xs text-neutral-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> Unlimited 25+ AI Agent Access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> Full Document Studio (Pitch Deck, PRD, NDA)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> Interactive Action Roadmap (7 to 90 Days)</li>
                </ul>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <GlowingButton onClick={() => router.push("/billing")} variant="primary" className="w-full">Start Pro Trial</GlowingButton>
              </motion.div>
            </GlassCard>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
            className="h-full"
          >
            <GlassCard className="p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Business & Incubator</h3>
                <p className="text-xs text-neutral-400">For teams, advisors & incubators</p>
                <div className="text-4xl font-extrabold text-white">$199 <span className="text-xs font-normal text-neutral-400">/ mo</span></div>
                <ul className="space-y-2 text-xs text-neutral-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> Multi-User Team Access & Role Management</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white shrink-0" /> VC Matching & Pitch Deck Griller</li>
                </ul>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <GlowingButton onClick={() => router.push("/billing")} variant="secondary" className="w-full">Contact Enterprise</GlowingButton>
              </motion.div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="relative py-24 px-6 max-w-4xl mx-auto border-t border-white/[0.08]">
        {/* Soft Radial Clarity Glow Background */}
        <FaqBackground />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-400 text-sm">Everything you need to know about Isaac.AI</p>
        </motion.div>

        <div className="space-y-4 relative z-10">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <GlassCard 
                  className="p-6 cursor-pointer hover:border-white/20 transition-colors" 
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between text-sm font-bold text-white">
                    <span>{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-xs text-neutral-400 leading-relaxed border-t border-white/10 pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 9. Premium Footer */}
      <footer className="py-12 border-t border-white/[0.08] text-center text-xs text-neutral-500 font-mono space-y-2">
        <div className="flex items-center justify-center space-x-2 text-emerald-400 font-mono text-[11px] mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All 25 C-Suite AI Agents Operational</span>
        </div>
        <p>© 2026 ISAAC.AI Inc. All rights reserved. The AI Co-Founder Every Founder Deserves.</p>
      </footer>

      {/* Interactive Fullscreen AI Onboarding Chat Modal */}
      <AIOnboardingModal
        isOpen={isAIOnboardingOpen}
        onClose={() => setIsAIOnboardingOpen(false)}
      />
    </div>
  );
}
