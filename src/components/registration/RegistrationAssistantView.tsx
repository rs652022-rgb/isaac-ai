"use client";

import React, { useState } from "react";
import { INCORPORATION_DATA } from "@/lib/data/registration-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileCheck, ExternalLink, CheckCircle2, Calendar } from "lucide-react";

export function RegistrationAssistantView() {
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  const countryData = INCORPORATION_DATA[selectedCountry] || INCORPORATION_DATA["US"];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <FileCheck className="w-3.5 h-3.5 text-white" />
            <span>GLOBAL INCORPORATION & COMPLIANCE ASSISTANT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Company Registration Hub</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Compare DIY, CA, Law Firm, & Online Service setup costs, timeline, and document checklists.
          </p>
        </div>
      </div>

      {/* Country Selector Pills */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 border-b border-white/[0.08] no-scrollbar">
        {Object.values(INCORPORATION_DATA).map((c) => (
          <button
            key={c.countryCode}
            onClick={() => setSelectedCountry(c.countryCode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCountry === c.countryCode
                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-white/5"
            }`}
          >
            <span className="text-sm">{c.flag}</span>
            <span>{c.countryName}</span>
          </button>
        ))}
      </div>

      {/* Overview Banner */}
      <GlassCard className="p-6 space-y-3 bg-neutral-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{countryData.flag}</span>
            <div>
              <h2 className="text-base font-bold text-white">{countryData.countryName} Incorporation Guide</h2>
              <p className="text-xs text-neutral-400">Popular entity types: {countryData.popularTypes.join(", ")}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-white/10 text-white">
            Currency: {countryData.currency}
          </span>
        </div>
      </GlassCard>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {countryData.options.map((opt, idx) => (
          <GlassCard key={idx} className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase rounded bg-white/10 text-white">
                  {opt.type} Option
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">{opt.complianceLevel} Compliance</span>
              </div>

              <h3 className="text-sm font-bold text-white">{opt.name}</h3>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-neutral-500 block">Est. Cost</span>
                  <span className="font-bold text-white">{opt.costEstimate}</span>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 block">Timeline</span>
                  <span className="font-bold text-neutral-300">{opt.timelineEstimate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Advantages</p>
                <ul className="space-y-1 text-xs text-neutral-300">
                  {opt.advantages.map((adv, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Checklist</p>
                <ul className="space-y-1 text-[11px] text-neutral-400 list-disc pl-4">
                  {opt.documentChecklist.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              {opt.officialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-black hover:bg-neutral-900 text-xs font-medium text-neutral-300 hover:text-white transition-colors border border-white/5"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </a>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Compliance Calendar */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-white" />
          Annual Legal & Tax Compliance Calendar ({countryData.countryName})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {countryData.complianceCalendar.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-white/5 bg-black space-y-1">
              <span className="text-[9px] text-neutral-500 font-mono uppercase">{item.frequency} Filing</span>
              <p className="text-xs font-bold text-white">{item.event}</p>
              <p className="text-[11px] text-neutral-400 font-mono">Due: {item.dueMonth}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
