"use client";

import React, { useState } from "react";
import { INCORPORATION_DATA } from "@/lib/data/registration-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { FileCheck, Globe, DollarSign, Clock, ExternalLink, CheckCircle2, ShieldAlert, Calendar } from "lucide-react";

export function RegistrationAssistantView() {
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  const countryData = INCORPORATION_DATA[selectedCountry] || INCORPORATION_DATA["US"];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono mb-1">
            <FileCheck className="w-4 h-4" />
            <span>GLOBAL INCORPORATION & COMPLIANCE ASSISTANT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Company Registration Hub</h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare DIY, CA, Law Firm, & Online Service setup costs, timeline, and document checklists.
          </p>
        </div>
      </div>

      {/* Country Selector Pills */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        {Object.values(INCORPORATION_DATA).map((c) => (
          <button
            key={c.countryCode}
            onClick={() => setSelectedCountry(c.countryCode)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCountry === c.countryCode
                ? "bg-indigo-600 text-white border border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            <span className="text-base">{c.flag}</span>
            <span>{c.countryName}</span>
          </button>
        ))}
      </div>

      {/* Overview Banner */}
      <GlassCard className="p-6 space-y-3 bg-gradient-to-r from-indigo-950/30 to-slate-950/80 border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{countryData.flag}</span>
            <div>
              <h2 className="text-lg font-bold text-white">{countryData.countryName} Incorporation Guide</h2>
              <p className="text-xs text-slate-400">Popular entity types: {countryData.popularTypes.join(", ")}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Currency: {countryData.currency}
          </span>
        </div>
      </GlassCard>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {countryData.options.map((opt, idx) => (
          <GlassCard key={idx} glow="indigo" className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-300">
                  {opt.type} Option
                </span>
                <span className="text-xs text-slate-400 font-mono">{opt.complianceLevel} Compliance</span>
              </div>

              <h3 className="text-base font-bold text-white">{opt.name}</h3>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block font-mono">Estimated Cost</span>
                  <span className="font-bold text-emerald-400">{opt.costEstimate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-mono">Timeline</span>
                  <span className="font-bold text-indigo-300">{opt.timelineEstimate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-300 uppercase">Advantages</p>
                <ul className="space-y-1 text-xs text-slate-300">
                  {opt.advantages.map((adv, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-300 uppercase">Document Checklist</p>
                <ul className="space-y-1 text-[11px] text-slate-400 list-disc pl-4">
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
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600/30 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-white/5"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </a>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Compliance Calendar */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          Annual Legal & Tax Compliance Calendar ({countryData.countryName})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {countryData.complianceCalendar.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/50 space-y-1">
              <span className="text-[10px] text-indigo-400 font-mono uppercase">{item.frequency} Filing</span>
              <p className="text-xs font-bold text-white">{item.event}</p>
              <p className="text-[11px] text-amber-400 font-mono">Due: {item.dueMonth}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
