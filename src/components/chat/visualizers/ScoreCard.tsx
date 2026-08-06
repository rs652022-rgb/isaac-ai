"use client";

import React from "react";
import { Award, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";

export interface ScoreCardProps {
  title: string;
  score: number; // 0 to 100
  subtitle?: string;
  statusText?: string;
  metrics?: Array<{ label: string; value: string | number }>;
}

export function ScoreCard({ title, score, subtitle, statusText, metrics }: ScoreCardProps) {
  const getBadgeColor = (s: number) => {
    if (s >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (s >= 60) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{title}</h4>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${getBadgeColor(score)}`}>
          {score} / 100
        </span>
      </div>

      {subtitle && <p className="text-xs text-neutral-300 font-sans">{subtitle}</p>}

      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] text-neutral-400 font-mono block truncate">{m.label}</span>
              <span className="text-sm font-extrabold text-white">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {statusText && (
        <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{statusText}</span>
        </div>
      )}
    </div>
  );
}
