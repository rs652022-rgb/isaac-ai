"use client";

import React from "react";
import { Calendar, CheckCircle2, Clock, Circle } from "lucide-react";

export interface RoadmapPhase {
  title: string;
  timeline: string;
  status?: "Completed" | "In Progress" | "Pending";
  items?: string[];
}

export interface RoadmapCardProps {
  title?: string;
  phases: RoadmapPhase[];
}

export function RoadmapCard({ title = "Execution Roadmap & Timeline", phases = [] }: RoadmapCardProps) {
  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <Calendar className="w-4 h-4 text-indigo-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{title}</h4>
      </div>
      <div className="space-y-3">
        {phases.map((phase, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {phase.status === "Completed" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : phase.status === "In Progress" ? (
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-neutral-500" />
                )}
                <span className="font-bold text-white text-xs font-sans">{phase.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-neutral-300">
                {phase.timeline}
              </span>
            </div>
            {phase.items && phase.items.length > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-neutral-300">
                {phase.items.map((item, iIdx) => (
                  <li key={iIdx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const Timeline = RoadmapCard;
