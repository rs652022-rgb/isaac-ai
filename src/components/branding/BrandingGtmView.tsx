"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { Palette } from "lucide-react";

export function BrandingGtmView() {
  const { founderProfile } = useApp();
  const [copied, setCopied] = useState<string | null>(null);

  const BRAND_NAMES = [
    { name: `${founderProfile.startupName}`, domain: `${founderProfile.startupName.toLowerCase()}.ai`, status: "Available" },
    { name: `VanceOS`, domain: `vanceos.io`, status: "Available" },
    { name: `FounderPulse`, domain: `founderpulse.app`, status: "Available" },
    { name: `CSuiteAI`, domain: `csuite.ai`, status: "Premium" }
  ];

  const COLOR_PALETTES = [
    { name: "Monochrome Luxury", primary: "#ffffff", secondary: "#171717", dark: "#000000", accent: "#737373" },
    { name: "Obsidian Slate", primary: "#e5e5e5", secondary: "#262626", dark: "#0a0a0a", accent: "#a3a3a3" },
    { name: "Cyber Pure White", primary: "#ffffff", secondary: "#404040", dark: "#050505", accent: "#d4d4d4" }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Palette className="w-3.5 h-3.5 text-white" />
            <span>BRAND IDENTITY & GTM MARKETING HUB</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Branding & Launch Strategy</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Brand narratives, domain availability, visual design systems, and outbound sales copy.
          </p>
        </div>
      </div>

      {/* Brand Names & Domain Availability */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white">Brand Name & Domain Suggestions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_NAMES.map((item, idx) => (
            <GlassCard key={idx} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{item.name}</span>
                <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded ${
                  item.status === "Available" ? "bg-white text-black" : "bg-neutral-800 text-neutral-400"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400">{item.domain}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Color Palettes */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white">Curated Aesthetic Design Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLOR_PALETTES.map((pal, idx) => (
            <GlassCard key={idx} className="p-5 space-y-4">
              <h3 className="text-xs font-bold text-white">{pal.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="h-10 flex-1 rounded-lg" style={{ backgroundColor: pal.primary }} />
                <div className="h-10 flex-1 rounded-lg" style={{ backgroundColor: pal.secondary }} />
                <div className="h-10 flex-1 rounded-lg" style={{ backgroundColor: pal.accent }} />
                <div className="h-10 flex-1 rounded-lg border border-white/20" style={{ backgroundColor: pal.dark }} />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Outbound Cold Outreach Script */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Day 1 Cold Email Lead Generation Script</h3>
          <button
            onClick={() => handleCopy("Subject: Quick question about startup legal & pitch decks...", "script")}
            className="text-xs text-neutral-400 hover:text-white font-mono"
          >
            {copied === "script" ? "Copied!" : "Copy Script"}
          </button>
        </div>
        <div className="p-4 rounded-xl bg-black font-mono text-xs text-neutral-300 leading-relaxed">
          Subject: Quick question about startup legal & pitch decks...<br /><br />
          Hey [Founder First Name],<br /><br />
          Noticed you&apos;re building in the {founderProfile.industry} space. Most first-time founders waste $5k+ on standard incorporation forms or pitch deck reviews.<br /><br />
          We built {founderProfile.startupName} — an autonomous AI Co-Founder operating system that audits your pitch deck and handles legal compliance in minutes.<br /><br />
          Would you be open to a 3-minute demo link?
        </div>
      </GlassCard>
    </div>
  );
}
