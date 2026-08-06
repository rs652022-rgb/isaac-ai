"use client";

import React from "react";
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

export interface PieItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  title?: string;
  items: PieItem[];
}

const DEFAULT_COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6", "#06b6d4"];

export function PieChartComponent({ title = "Cost & Budget Distribution", items = [] }: PieChartProps) {
  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <PieIcon className="w-4 h-4 text-indigo-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{title}</h4>
      </div>
      <div className="h-60 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie data={items} cx="50%" cy="50%" outerRadius={75} dataKey="value" nameKey="name" labelLine={false}>
              {items.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "11px" }}
            />
            <Legend formatter={(value) => <span className="text-[11px] text-neutral-300 font-mono">{value}</span>} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export const PieChart = PieChartComponent;
