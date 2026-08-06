"use client";

import React from "react";
import { Zap, Flame, Target, ShieldAlert, Award } from "lucide-react";

export interface SWOTCardProps {
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
}

export function SWOTCard({ strengths = [], weaknesses = [], opportunities = [], threats = [] }: SWOTCardProps) {
  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <Award className="w-4 h-4 text-amber-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">SWOT Analysis Matrix</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Strengths */}
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
          <h5 className="font-bold text-emerald-400 flex items-center gap-1.5 font-mono text-[11px] uppercase">
            <Zap className="w-3.5 h-3.5" /> Strengths
          </h5>
          <ul className="space-y-1 text-neutral-300 text-[11px] list-disc pl-3">
            {strengths.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Weaknesses */}
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
          <h5 className="font-bold text-rose-400 flex items-center gap-1.5 font-mono text-[11px] uppercase">
            <Flame className="w-3.5 h-3.5" /> Weaknesses
          </h5>
          <ul className="space-y-1 text-neutral-300 text-[11px] list-disc pl-3">
            {weaknesses.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Opportunities */}
        <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-2">
          <h5 className="font-bold text-sky-400 flex items-center gap-1.5 font-mono text-[11px] uppercase">
            <Target className="w-3.5 h-3.5" /> Opportunities
          </h5>
          <ul className="space-y-1 text-neutral-300 text-[11px] list-disc pl-3">
            {opportunities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Threats */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
          <h5 className="font-bold text-amber-400 flex items-center gap-1.5 font-mono text-[11px] uppercase">
            <ShieldAlert className="w-3.5 h-3.5" /> Threats
          </h5>
          <ul className="space-y-1 text-neutral-300 text-[11px] list-disc pl-3">
            {threats.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
