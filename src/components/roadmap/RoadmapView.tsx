"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapPin, CheckCircle2, Clock, User } from "lucide-react";

export function RoadmapView() {
  const { roadmapTasks, toggleTaskStatus } = useApp();
  const [selectedTimeline, setSelectedTimeline] = useState<string>("All");

  const TIMELINES = ["All", "7 Day", "30 Day", "60 Day", "90 Day", "6 Month", "12 Month"];

  const filteredTasks = selectedTimeline === "All"
    ? roadmapTasks
    : roadmapTasks.filter((t) => t.timeline === selectedTimeline);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>ACTION ROADMAP & MILESTONE TRACKER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Execution Timeline</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Autonomous sprint planning from Day 0 to 24-Month scale.
          </p>
        </div>
      </div>

      {/* Timeline Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/[0.08] no-scrollbar">
        {TIMELINES.map((tl) => (
          <button
            key={tl}
            onClick={() => setSelectedTimeline(tl)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTimeline === tl
                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-white/5"
            }`}
          >
            {tl}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <GlassCard key={task.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`mt-1 p-1 rounded-lg border transition-colors ${
                  task.status === "Completed"
                    ? "bg-white border-white text-black"
                    : "bg-black border-white/20 text-neutral-500 hover:border-white/40"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-bold ${task.status === "Completed" ? "line-through text-neutral-500" : "text-white"}`}>
                    {task.title}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded bg-white/10 text-neutral-300">
                    {task.timeline}
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] font-mono uppercase rounded ${
                    task.priority === "High" ? "bg-white text-black font-bold" : "bg-neutral-900 text-neutral-400"
                  }`}>
                    {task.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{task.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-xs text-neutral-400 shrink-0 font-mono">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{task.estimatedHours} hrs</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-white" />
                <span className="text-white font-medium">{task.assignedAgent}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
