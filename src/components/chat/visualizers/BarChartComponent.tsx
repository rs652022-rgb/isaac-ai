"use client";

import React from "react";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { BarChart3 } from "lucide-react";

export interface BarItem {
  name: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  title?: string;
  items: BarItem[];
}

const BAR_COLORS = ["#6366f1", "#38bdf8", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

export function BarChartComponent({ title = "Comparative Channel Metrics", items = [] }: BarChartProps) {
  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <BarChart3 className="w-4 h-4 text-sky-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{title}</h4>
      </div>
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={items} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey="name" stroke="#888888" tick={{ fontSize: 10, fill: "#888888" }} />
            <YAxis stroke="#888888" tick={{ fontSize: 10, fill: "#888888" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "11px" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {items.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export const BarChart = BarChartComponent;
