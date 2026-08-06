"use client";

import React, { useState } from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Building2,
  Bookmark,
  ExternalLink,
  Sparkles,
  Calendar,
  DollarSign,
  Filter,
  CheckCircle2
} from "lucide-react";

export function GrantsEngineView() {
  const { grants, toggleGrantBookmark } = useFounderGraph();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filteredGrants = grants.filter((g) => {
    if (selectedFilter === "Bookmarked") return g.isBookmarked;
    if (selectedFilter !== "All") return g.category === selectedFilter;
    return true;
  });

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <Building2 className="w-3.5 h-3.5 text-white" />
            <span>STAGE 4 :: GOVERNMENT GRANTS & SUBSIDY MATCHING</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Non-Dilutive Funding Engine
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            AI-matched grants, subsidies, and tax exemption schemes with 0 equity dilution.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {["All", "Central", "Tech Innovation", "Women Founders", "Bookmarked"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grants Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGrants.map((grant) => (
          <GlassCard key={grant.id} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    {grant.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{grant.title}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{grant.provider}</p>
                </div>

                <button
                  onClick={() => toggleGrantBookmark(grant.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    grant.isBookmarked
                      ? "bg-cyan-400 text-black border-cyan-400"
                      : "border-white/10 text-neutral-400 hover:text-white"
                  }`}
                  title="Bookmark Grant"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Funding Amount & Deadline Box */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block">GRANT AMOUNT</span>
                  <span className="text-emerald-400 font-extrabold text-sm">{grant.fundingAmount}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block">DEADLINE</span>
                  <span className="text-white font-bold">{grant.deadline}</span>
                </div>
              </div>

              {/* AI Match Reasons */}
              <div className="space-y-1.5 bg-black/40 p-3.5 rounded-xl border border-white/5 text-xs">
                <span className="text-emerald-400 font-mono text-[10px] font-bold block">
                  AI FIT SCORE ({grant.aiFitScore}% MATCH):
                </span>
                {grant.matchReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-1.5 text-xs">
                <span className="text-neutral-400 font-mono text-[10px] block">ELIGIBILITY CRITERIA:</span>
                <ul className="space-y-1 text-neutral-300">
                  {grant.eligibility.map((e, idx) => (
                    <li key={idx}>• {e}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-400">Country: {grant.country}</span>
              <a
                href={grant.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                <span>Official Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
