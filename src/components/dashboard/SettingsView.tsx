"use client";

import React, { useState } from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import { Settings, Save, ShieldCheck, Database, Key } from "lucide-react";

export function SettingsView() {
  const { metrics, updateMetrics } = useFounderGraph();
  const [name, setName] = useState(metrics.businessName);
  const [industry, setIndustry] = useState(metrics.industry);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetrics({ businessName: name, industry });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl animate-in fade-in duration-300">
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
          <Settings className="w-3.5 h-3.5 text-white" />
          <span>FOUNDER OS SETTINGS & PROFILE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          System Preferences & Context
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Manage your startup profile, global graph memory context, and API security keys.
        </p>
      </div>

      <GlassCard className="p-6 space-y-6">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-neutral-400 font-mono">STARTUP / BUSINESS NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-mono">INDUSTRY CATEGORY</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            {saved ? (
              <span className="text-xs font-mono text-emerald-400">✓ Graph Memory Updated</span>
            ) : (
              <span className="text-xs font-mono text-neutral-500">Auto-synced with Supabase</span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save System Context</span>
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
