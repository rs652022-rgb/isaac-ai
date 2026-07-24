"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { Briefcase, Flame } from "lucide-react";

export function FundingCoachView() {
  const { setActiveTab } = useApp();

  const VC_DIRECTORY = [
    { name: "Y Combinator", checkSize: "$500k", stage: "Pre-Seed / Seed", focus: "AI & SaaS", fitScore: 96 },
    { name: "Techstars", checkSize: "$120k", stage: "Pre-Seed", focus: "Global Tech", fitScore: 92 },
    { name: "A16Z Speedrun", checkSize: "$500k", stage: "Pre-Seed", focus: "AI Native", fitScore: 89 },
    { name: "Sequoia Arc", checkSize: "$1M", stage: "Seed", focus: "B2B Software", fitScore: 85 }
  ];

  const GOVT_GRANTS = [
    { title: "SBIR Phase I Grant (US NSF)", amount: "$275,000", type: "Non-dilutive Grant", eligibility: "US R&D Tech" },
    { title: "Startup India Seed Fund Scheme", amount: "₹20,000,000", type: "Non-dilutive Grant", eligibility: "DPIIT Recognized" },
    { title: "Innovate UK Smart Grant", amount: "£500,000", type: "Non-dilutive Grant", eligibility: "UK Registered" }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Briefcase className="w-3.5 h-3.5 text-white" />
            <span>INVESTOR READINESS & CAPITAL MATCHMAKER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Funding & Pitch Coach</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Audit investor readiness, simulate tough VC grilling, and match with non-dilutive grants.
          </p>
        </div>

        <GlowingButton
          onClick={() => setActiveTab("chat")}
          icon={<Flame className="w-4 h-4 text-white" />}
        >
          Simulate VC Pitch Grilling
        </GlowingButton>
      </div>

      {/* Readiness Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-neutral-500 font-mono uppercase">Readiness Index</span>
            <p className="text-3xl font-extrabold text-white mt-1">85/100</p>
            <p className="text-xs text-emerald-400 mt-1 font-mono">Ready for YC W27 Batch</p>
          </div>
          <RadialProgress score={85} size={80} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-neutral-500 font-mono uppercase">Target Pre-Seed</span>
            <p className="text-3xl font-extrabold text-white mt-1">$500,000</p>
            <p className="text-xs text-neutral-400 mt-1 font-mono">20% Safe Post-Money</p>
          </div>
          <RadialProgress score={75} size={80} strokeWidth={6} />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-neutral-500 font-mono uppercase">Estimated Runway</span>
            <p className="text-3xl font-extrabold text-white mt-1">18 Months</p>
            <p className="text-xs text-emerald-400 mt-1 font-mono">Low Burn Profile</p>
          </div>
          <RadialProgress score={90} size={80} strokeWidth={6} />
        </GlassCard>
      </div>

      {/* VC Matcher Directory */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white">Target VC & Accelerator Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VC_DIRECTORY.map((vc, idx) => (
            <GlassCard key={idx} className="p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xs font-bold text-white">{vc.name}</h3>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-white text-black">
                    {vc.fitScore}% Match
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 font-mono">Check Size: {vc.checkSize} • Stage: {vc.stage}</p>
              </div>
              <button
                onClick={() => setActiveTab("chat")}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-black text-xs text-neutral-300 hover:text-white"
              >
                Grill Deck
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Non-dilutive Government Grants */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white">Non-Dilutive Government Grants & Schemes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GOVT_GRANTS.map((grant, idx) => (
            <GlassCard key={idx} className="p-5 space-y-2">
              <span className="text-[9px] text-neutral-500 font-mono uppercase">{grant.type}</span>
              <h3 className="text-xs font-bold text-white">{grant.title}</h3>
              <p className="text-lg font-extrabold text-white">{grant.amount}</p>
              <p className="text-[10px] text-neutral-400 font-mono">Eligibility: {grant.eligibility}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
