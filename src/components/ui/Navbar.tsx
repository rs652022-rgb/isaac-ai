"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { Cpu, Search, Bell, Sparkles, ChevronDown, Shield, CheckCircle2, User as UserIcon, LogOut } from "lucide-react";

export function Navbar() {
  const { user, founderProfile, setActiveTab } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between">
        {/* Left: Brand & Startup Context Selector */}
        <div className="flex items-center space-x-6">
          <div
            onClick={() => setActiveTab("landing")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px] shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  ISAAC<span className="text-indigo-400">.AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  OS v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                The AI Co-Founder Every Founder Deserves
              </p>
            </div>
          </div>

          {/* Active Workspace Pill */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-white/10 bg-slate-900/60 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-slate-100">{founderProfile.startupName}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{founderProfile.fundingStage}</span>
          </div>
        </div>

        {/* Center: Agent Mesh Status Pill */}
        <div className="hidden lg:flex items-center space-x-3 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-xs text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="font-medium">25 C-Suite Agents Orchestrated</span>
          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-indigo-500/30 text-indigo-300">
            Active
          </span>
        </div>

        {/* Right: Quick Search, Role Badge, Notifications & Profile */}
        <div className="flex items-center space-x-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
              window.dispatchEvent(event);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-white/10 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-700 text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search OS...</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-400 font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Role Pill */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-950/30 text-[11px] font-medium text-purple-300">
            <Shield className="w-3 h-3 text-purple-400" />
            <span>{user?.role || "Founder"} Mode</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
          </button>

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all"
            >
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={user?.name}
                className="w-7 h-7 rounded-lg object-cover"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl p-2 z-50 text-xs space-y-1">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="font-semibold text-white">{user?.name}</p>
                  <p className="text-slate-400 text-[11px] truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => { setActiveTab("onboarding"); setShowUserMenu(false); }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
                >
                  <UserIcon className="w-4 h-4 text-indigo-400" />
                  <span>Update Founder Memory</span>
                </button>
                <button
                  onClick={() => { setActiveTab("billing"); setShowUserMenu(false); }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Subscription ({user?.subscriptionPlan} Plan)</span>
                </button>
                <div className="border-t border-white/10 pt-1">
                  <button
                    onClick={() => { setActiveTab("auth"); setShowUserMenu(false); }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
