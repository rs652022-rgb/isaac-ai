"use client";

import React from "react";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

export interface DataPoint {
  name: string;
  value: number;
}

export interface RevenueChartProps {
  title?: string;
  xAxis?: string;
  yAxis?: string;
  series: DataPoint[];
}

export function RevenueChart({ title = "Financial Revenue Projection", xAxis = "Month", yAxis = "USD ($)", series = [] }: RevenueChartProps) {
  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{title}</h4>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">{yAxis}</span>
      </div>
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey="name" stroke="#888888" tick={{ fontSize: 10, fill: "#888888" }} />
            <YAxis stroke="#888888" tick={{ fontSize: 10, fill: "#888888" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "11px" }}
            />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export const LineChart = RevenueChart;
