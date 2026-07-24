"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { CreditCard, CheckCircle2 } from "lucide-react";

export function BillingView() {
  const { user, setUser } = useApp();
  const [, setSelectedPlan] = useState(user?.subscriptionPlan || "Pro");

  const handleUpgrade = (plan: "Free" | "Pro" | "Business" | "Enterprise") => {
    if (user) {
      setUser({ ...user, subscriptionPlan: plan });
      setSelectedPlan(plan);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <CreditCard className="w-3.5 h-3.5 text-white" />
            <span>SUBSCRIPTIONS & USAGE MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Billing & Plans</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Active plan: <strong className="text-white font-mono">{user?.subscriptionPlan} Tier</strong> • Renews on August 24, 2026
          </p>
        </div>
      </div>

      {/* Usage Bar */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Current Month Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-400">Multi-Agent Calls</span>
              <span className="text-white font-mono font-bold">42 / 1,000</span>
            </div>
            <div className="h-1.5 rounded-full bg-neutral-900 overflow-hidden">
              <div className="h-full bg-white w-[4.2%]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-400">Document Generations</span>
              <span className="text-white font-mono font-bold">12 / Unlimited</span>
            </div>
            <div className="h-1.5 rounded-full bg-neutral-900 overflow-hidden">
              <div className="h-full bg-white w-[12%]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-400">Incorporation Guides</span>
              <span className="text-white font-mono font-bold">5 / Unlimited</span>
            </div>
            <div className="h-1.5 rounded-full bg-neutral-900 overflow-hidden">
              <div className="h-full bg-white w-[20%]" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Plan Tier Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Free Starter</h3>
            <div className="text-3xl font-extrabold text-white">$0</div>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Basic Idea Score & SWOT</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> 3 Agent chats / day</li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade("Free")}
            className="w-full py-2.5 rounded-full border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white"
          >
            {user?.subscriptionPlan === "Free" ? "Current Plan" : "Downgrade to Free"}
          </button>
        </GlassCard>

        <GlassCard className="p-6 space-y-6 flex flex-col justify-between border-white/40 bg-neutral-950">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Founder Pro</h3>
              <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-mono font-bold uppercase">Active</span>
            </div>
            <div className="text-3xl font-extrabold text-white">$49 <span className="text-xs font-normal text-neutral-400">/ mo</span></div>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Unlimited 25+ C-Suite Agents</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Full AI Document Studio</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Multi-Country Legal Guides</li>
            </ul>
          </div>
          <GlowingButton onClick={() => handleUpgrade("Pro")} className="w-full">
            {user?.subscriptionPlan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
          </GlowingButton>
        </GlassCard>

        <GlassCard className="p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Business</h3>
            <div className="text-3xl font-extrabold text-white">$199 <span className="text-xs font-normal text-neutral-400">/ mo</span></div>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Team Access & Role Management</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> VC Matching & Pitch Coach</li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade("Business")}
            className="w-full py-2.5 rounded-full border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white"
          >
            {user?.subscriptionPlan === "Business" ? "Current Plan" : "Upgrade to Business"}
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
