"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { CreditCard, CheckCircle2, Shield, Zap, Sparkles } from "lucide-react";

export function BillingView() {
  const { user, setUser } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(user?.subscriptionPlan || "Pro");

  const handleUpgrade = (plan: "Free" | "Pro" | "Business" | "Enterprise") => {
    if (user) {
      setUser({ ...user, subscriptionPlan: plan });
      setSelectedPlan(plan);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono mb-1">
            <CreditCard className="w-4 h-4" />
            <span>SUBSCRIPTIONS & USAGE MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Billing & Plans</h1>
          <p className="text-xs text-slate-400 mt-1">
            Active plan: <strong className="text-indigo-300">{user?.subscriptionPlan} Tier</strong> • Renews on August 24, 2026
          </p>
        </div>
      </div>

      {/* Usage Bar */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Current Month Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Multi-Agent Calls</span>
              <span className="text-white font-mono font-bold">42 / 1,000</span>
            </div>
            <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-indigo-500 w-[4.2%]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Document Generations</span>
              <span className="text-white font-mono font-bold">12 / Unlimited</span>
            </div>
            <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-emerald-500 w-[12%]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Incorporation Guides</span>
              <span className="text-white font-mono font-bold">5 / Unlimited</span>
            </div>
            <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-cyan-500 w-[20%]" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Plan Tier Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Free Starter</h3>
            <div className="text-3xl font-extrabold text-white">$0</div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Basic Idea Score & SWOT</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 3 Agent chats / day</li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade("Free")}
            className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {user?.subscriptionPlan === "Free" ? "Current Plan" : "Downgrade to Free"}
          </button>
        </GlassCard>

        <GlassCard glow="indigo" className="p-6 space-y-6 flex flex-col justify-between border-indigo-500/50 bg-indigo-950/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Founder Pro</h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">Active</span>
            </div>
            <div className="text-3xl font-extrabold text-white">$49 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited 25+ C-Suite Agents</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Full AI Document Studio</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Multi-Country Legal Guides</li>
            </ul>
          </div>
          <GlowingButton onClick={() => handleUpgrade("Pro")} className="w-full">
            {user?.subscriptionPlan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
          </GlowingButton>
        </GlassCard>

        <GlassCard className="p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Business</h3>
            <div className="text-3xl font-extrabold text-white">$199 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Team Access & Role Management</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> VC Matchmaking & Pitch Coach</li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade("Business")}
            className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {user?.subscriptionPlan === "Business" ? "Current Plan" : "Upgrade to Business"}
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
