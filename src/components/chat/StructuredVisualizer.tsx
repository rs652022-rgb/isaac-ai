"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  CheckCircle2,
  Circle,
  TrendingUp,
  TrendingDown,
  Minus,
  ShieldAlert,
  Zap,
  Target,
  Flame,
  Award,
  Calendar,
  Layers,
  DollarSign,
  PieChart as PieIcon,
  Table as TableIcon,
} from "lucide-react";

export type VisualType =
  | "swot"
  | "chart_line"
  | "chart_pie"
  | "tam_sam_som"
  | "business_canvas"
  | "kpis"
  | "comparison_table"
  | "roadmap"
  | "checklist";

export interface StructuredPayload {
  text?: string;
  visualType: VisualType;
  data: any;
}

const PIE_COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6", "#06b6d4"];

export function StructuredVisualizer({ payload }: { payload: StructuredPayload }) {
  const { visualType, data } = payload;
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!data) return null;

  // 1. SWOT Analysis (4-Column Card Grid)
  if (visualType === "swot") {
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
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
              {data.strengths?.map((item: string, idx: number) => (
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
              {data.weaknesses?.map((item: string, idx: number) => (
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
              {data.opportunities?.map((item: string, idx: number) => (
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
              {data.threats?.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // 2. Financial & Revenue Projections (Line Chart)
  if (visualType === "chart_line") {
    const chartData = data.series || [];
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {data.title || "Financial Revenue Projection"}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">{data.yAxis || "USD ($)"}</span>
        </div>
        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" stroke="#888888" tick={{ fontSize: 10, fill: "#888888" }} />
              <YAxis stroke="#888888" tick={{ fontSize: 10, fill: "#888888" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "11px" }}
              />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // 3. Cost Breakdown / Expenses (Pie Chart)
  if (visualType === "chart_pie") {
    const pieData = data.items || [];
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <PieIcon className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            {data.title || "Cost & Budget Distribution"}
          </h4>
        </div>
        <div className="h-60 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" nameKey="name" labelLine={false}>
                {pieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color || PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "11px" }}
              />
              <Legend formatter={(value) => <span className="text-[11px] text-neutral-300 font-mono">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // 4. Market Sizing (TAM / SAM / SOM)
  if (visualType === "tam_sam_som") {
    const { tam, sam, som } = data;
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Market Sizing (TAM / SAM / SOM)</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* TAM */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">TAM</span>
            <div className="text-xl font-extrabold text-white">{tam?.value || "$0"}</div>
            <p className="text-[10px] text-neutral-400 leading-tight">{tam?.description || tam?.label || "Total Market"}</p>
          </div>
          {/* SAM */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/20 text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">SAM</span>
            <div className="text-xl font-extrabold text-white">{sam?.value || "$0"}</div>
            <p className="text-[10px] text-neutral-400 leading-tight">{sam?.description || sam?.label || "Serviceable Market"}</p>
          </div>
          {/* SOM */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">SOM</span>
            <div className="text-xl font-extrabold text-white">{som?.value || "$0"}</div>
            <p className="text-[10px] text-neutral-400 leading-tight">{som?.description || som?.label || "Target Year 1-3 Market"}</p>
          </div>
        </div>
      </div>
    );
  }

  // 5. Business Model Canvas
  if (visualType === "business_canvas") {
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Business Model Canvas</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
            <h5 className="font-bold text-white font-mono text-[11px] uppercase">Value Proposition</h5>
            <ul className="list-disc pl-3 text-[11px] text-neutral-300 space-y-0.5">
              {data.valueProposition?.map((v: string, i: number) => <li key={i}>{v}</li>)}
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
            <h5 className="font-bold text-white font-mono text-[11px] uppercase">Customer Segments</h5>
            <ul className="list-disc pl-3 text-[11px] text-neutral-300 space-y-0.5">
              {data.customerSegments?.map((v: string, i: number) => <li key={i}>{v}</li>)}
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
            <h5 className="font-bold text-white font-mono text-[11px] uppercase">Revenue Streams</h5>
            <ul className="list-disc pl-3 text-[11px] text-neutral-300 space-y-0.5">
              {data.revenueStreams?.map((v: string, i: number) => <li key={i}>{v}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // 6. KPIs & Metric Dashboard Cards
  if (visualType === "kpis") {
    const metrics = data.metrics || [];
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Key Performance Indicators</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m: any, idx: number) => {
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

  // 7. Comparison Table (Competitor & Feature Matrix)
  if (visualType === "comparison_table") {
    const headers = data.headers || [];
    const rows = data.rows || [];
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <TableIcon className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Feature & Competitor Comparison</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-xs">
            <thead>
              <tr className="bg-white/5">
                {headers.map((h: string, i: number) => (
                  <th key={i} className="px-3 py-2 text-left font-mono font-bold text-white text-[11px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px] text-neutral-300">
              {rows.map((row: string[], rIdx: number) => (
                <tr key={rIdx} className="hover:bg-white/[0.02]">
                  {row.map((cell: string, cIdx: number) => (
                    <td key={cIdx} className={`px-3 py-2 ${cIdx === 0 ? "font-semibold text-white" : "font-mono"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 8. Roadmap & Timelines
  if (visualType === "roadmap") {
    const phases = data.phases || [];
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Execution Roadmap & Timeline</h4>
        </div>
        <div className="space-y-3">
          {phases.map((phase: any, idx: number) => (
            <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs font-sans">{phase.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-neutral-300">
                  {phase.timeline}
                </span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-neutral-300">
                {phase.items?.map((item: string, iIdx: number) => (
                  <li key={iIdx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 9. Interactive Action Checklist
  if (visualType === "checklist") {
    const items = data.items || [];
    return (
      <div className="my-4 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            {data.title || "Action Plan Checklist"}
          </h4>
        </div>
        <div className="space-y-2">
          {items.map((item: any, idx: number) => {
            const isChecked = checkedItems[idx] ?? !!item.completed;
            const taskText = typeof item === "string" ? item : item.task || item.title;
            return (
              <button
                key={idx}
                onClick={() => setCheckedItems((prev) => ({ ...prev, [idx]: !isChecked }))}
                className="w-full flex items-start space-x-2.5 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] text-left transition-colors"
              >
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                )}
                <span className={`text-xs ${isChecked ? "line-through text-neutral-500 font-normal" : "text-neutral-200 font-medium"}`}>
                  {taskText}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
