"use client";

import React from "react";
import { DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface KPIMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export interface KPIGridProps {
  title?: string;
  metrics: KPIMetric[];
}

export function KPIGrid({ title = "Key Performance Indicators", metrics = [] }: KPIGridProps) {
  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <DollarSign className="w-4 h-4 text-emerald-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{title}</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m, idx) => {
          const isUp = m.trend === "up";
          const isDown = m.trend === "down";
          return (
            <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[10px] text-neutral-400 font-mono block truncate">{m.label}</span>
              <div className="text-base font-extrabold text-white">{m.value}</div>
              {m.change && (
                <div className="flex items-center gap-1 text-[10px] font-mono">
                  {isUp && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {isDown && <TrendingDown className="w-3 h-3 text-rose-400" />}
                  {!isUp && !isDown && <Minus className="w-3 h-3 text-neutral-400" />}
                  <span className={isUp ? "text-emerald-400" : isDown ? "text-rose-400" : "text-neutral-400"}>
                    {m.change}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
