"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Role } from "@/types";
import { Shield, Sparkles, Mail, Key, ArrowRight, Code } from "lucide-react";

export function AuthModal() {
  const { setUser, setActiveTab } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>("Founder");
  const [email, setEmail] = useState("alex@isaacai.io");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({
        id: `usr_${Date.now()}`,
        name: email.split("@")[0] || "Founder",
        email,
        role: selectedRole,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        subscriptionPlan: "Pro",
        createdAt: new Date().toISOString()
      });
      setLoading(false);
      setActiveTab("dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#07080c] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[140px] pointer-events-none rounded-full" />

      <GlassCard glow="indigo" className="w-full max-w-md p-6 sm:p-8 space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-2">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome to ISAAC.AI</h2>
          <p className="text-xs text-slate-400">The AI Founder Operating System</p>
        </div>

        {/* Role Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Select Your Operating Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Founder", "Team", "Investor", "Advisor", "Admin"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium transition-all ${
                  selectedRole === r
                    ? "bg-indigo-600 text-white border border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                    : "bg-slate-900/80 text-slate-400 border border-white/5 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* OAuth Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleAuth}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
          >
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleAuth}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
          >
            <Code className="w-4 h-4 text-indigo-400" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="absolute px-3 bg-slate-950 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
            Or Email Login
          </span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <GlowingButton
            type="submit"
            loading={loading}
            className="w-full"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Authenticate as {selectedRole}
          </GlowingButton>
        </form>

        <p className="text-center text-[11px] text-slate-500">
          By signing in, you accept ISAAC.AI Terms & Privacy Policy.
        </p>
      </GlassCard>
    </div>
  );
}
