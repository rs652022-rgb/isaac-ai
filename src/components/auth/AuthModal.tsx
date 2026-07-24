"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Role } from "@/types";
import { Mail, Key, ArrowRight, Code } from "lucide-react";

import { signIn } from "next-auth/react";

export function AuthModal() {
  const { setActiveTab } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>("Founder");
  const [email, setEmail] = useState("alex@isaacai.io");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        role: selectedRole,
        redirect: false,
      });
      
      if (res?.error) {
        console.error("Auth error:", res.error);
        // Could show toast here
      } else {
        setActiveTab("onboarding");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <GlassCard className="w-full max-w-md p-6 sm:p-8 space-y-6 relative z-10 border-white/10 bg-[#080808]">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-10 h-10 rounded-2xl bg-white text-black font-extrabold items-center justify-center text-xs mb-2">
            IS
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to ISAAC.AI</h2>
          <p className="text-xs text-neutral-400 font-serif-accent italic">The AI Founder Operating System</p>
        </div>

        {/* Role Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
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
                    ? "bg-white text-black font-semibold"
                    : "bg-neutral-900 text-neutral-400 border border-white/5 hover:text-white"
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
            onClick={() => handleOAuth("google")}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border border-white/10 bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-white transition-colors"
          >
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border border-white/10 bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-white transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-neutral-400" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="absolute px-3 bg-[#080808] text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
            Or Email Login
          </span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-neutral-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
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
            <label className="text-xs text-neutral-300">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
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

        <p className="text-center text-[10px] text-neutral-500 font-mono">
          By signing in, you accept ISAAC.AI Terms & Privacy Policy.
        </p>
      </GlassCard>
    </div>
  );
}
