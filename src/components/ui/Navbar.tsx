"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { Cpu, Search, Bell, ChevronDown, Shield, CheckCircle2, User as UserIcon, LogOut } from "lucide-react";

export function Navbar() {
  const { user, founderProfile, setActiveTab } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-black/80 backdrop-blur-2xl px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Left: Brand & Startup Context */}
        <div className="flex items-center space-x-6">
          <div
            onClick={() => setActiveTab("landing")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs tracking-tighter shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform">
              IS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-extrabold tracking-tight text-white">
                  ISAAC<span className="text-neutral-500 font-light">.AI</span>
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-full bg-white/10 text-neutral-300 border border-white/10">
                  OS v2.4
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 hidden sm:block">
                The AI Co-Founder <span className="font-serif-accent italic text-neutral-400">Every Founder Deserves</span>
              </p>
            </div>
          </div>

          {/* Active Workspace Pill */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-neutral-950 text-xs text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">{founderProfile.startupName}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400 font-mono text-[11px]">{founderProfile.fundingStage}</span>
          </div>
        </div>

        {/* Center: Agent Mesh Pill */}
        <div className="hidden lg:flex items-center space-x-2.5 px-3.5 py-1 rounded-full border border-white/10 bg-neutral-950 text-xs text-neutral-300">
          <Cpu className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
          <span className="font-medium text-neutral-300">25 C-Suite Agents Orchestrated</span>
          <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-white/10 text-white">
            Active
          </span>
        </div>

        {/* Right: Quick Search, Role Badge, Profile */}
        <div className="flex items-center space-x-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
              window.dispatchEvent(event);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-neutral-950 text-neutral-400 hover:text-white hover:border-white/20 text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[9px] rounded bg-neutral-900 text-neutral-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Role Pill */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-neutral-950 text-[11px] font-medium text-neutral-300">
            <Shield className="w-3 h-3 text-neutral-400" />
            <span>{user?.role || "Founder"} Mode</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full border border-white/10 bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-full border border-white/10 hover:border-white/30 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={user?.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl p-2 z-50 text-xs space-y-1">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="font-semibold text-white">{user?.name}</p>
                  <p className="text-neutral-500 text-[11px] truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => { setActiveTab("onboarding"); setShowUserMenu(false); }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Founder Memory</span>
                </button>
                <button
                  onClick={() => { setActiveTab("billing"); setShowUserMenu(false); }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Subscription ({user?.subscriptionPlan})</span>
                </button>
                <div className="border-t border-white/10 pt-1">
                  <button
                    onClick={() => { setActiveTab("auth"); setShowUserMenu(false); }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-950/30"
                  >
                    <LogOut className="w-3.5 h-3.5" />
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
