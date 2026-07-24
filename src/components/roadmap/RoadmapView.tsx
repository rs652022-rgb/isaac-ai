"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { MapPin, Plus, CheckCircle2, Clock, Calendar, ChevronRight, User } from "lucide-react";

export function RoadmapView() {
  const { roadmapTasks, toggleTaskStatus } = useApp();
  const [selectedTimeline, setSelectedTimeline] = useState<string>("All");

  const TIMELINES = ["All", "7 Day", "30 Day", "60 Day", "90 Day", "6 Month", "12 Month"];

  const filteredTasks = selectedTimeline === "All"
    ? roadmapTasks
    : roadmapTasks.filter((t) => t.timeline === selectedTimeline);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono mb-1">
            <MapPin className="w-4 h-4" />
            <span>ACTION ROADMAP & MILESTONE TRACKER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Execution Timeline</h1>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous sprint planning from Day 0 to 24-Month scale.
          </p>
        </div>
      </div>

      {/* Timeline Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        {TIMELINES.map((tl) => (
          <button
            key={tl}
            onClick={() => setSelectedTimeline(tl)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTimeline === tl
                ? "bg-indigo-600 text-white border border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            {tl}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <GlassCard key={task.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`mt-1 p-1.5 rounded-xl border transition-colors ${
                  task.status === "Completed"
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-900 border-white/10 text-slate-500 hover:border-slate-600"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-bold ${task.status === "Completed" ? "line-through text-slate-500" : "text-white"}`}>
                    {task.title}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {task.timeline}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                    task.priority === "High" ? "bg-rose-500/20 text-rose-300" : "bg-slate-800 text-slate-400"
                  }`}>
                    {task.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-400">{task.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-400 shrink-0">
              <div className="flex items-center space-x-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{task.estimatedHours} hrs</span>
              </div>
              <div className="flex items-center space-x-1.5 font-mono">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-indigo-300">{task.assignedAgent}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
