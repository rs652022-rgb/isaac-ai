"use client";

import React, { useState } from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { MetricsUploadModal } from "./MetricsUploadModal";
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Zap,
  Users,
  Upload,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Flame,
  FileText
} from "lucide-react";

export function PerformanceDashboardView() {
  const { metrics } = useFounderGraph();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [execSummaryGenerated, setExecSummaryGenerated] = useState(false);

  const ltvCacRatio = (metrics.ltv / metrics.cac).toFixed(1);
  const paybackMonths = ((metrics.cac / (metrics.mrr / metrics.totalCustomers)) || 1).toFixed(1);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <LineChart className="w-3.5 h-3.5 text-white" />
            <span>STAGE 6 :: BUSINESS PERFORMANCE DASHBOARD & FINANCIAL BI</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {metrics.businessName} Performance Hub
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time ARR, MRR, CAC/LTV Unit Economics, and Recharts Financial Forecasting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setExecSummaryGenerated(true)}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Generate Executive Summary</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Update Metrics / CSV</span>
          </button>
        </div>
      </div>

      {/* Generated Executive Summary Modal Banner */}
      {execSummaryGenerated && (
        <GlassCard className="p-6 border-l-2 border-l-emerald-400 bg-emerald-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400">
              <FileText className="w-4 h-4" />
              <span>AI AUTOMATED BOARD & VC EXECUTIVE SUMMARY</span>
            </div>
            <button
              onClick={() => setExecSummaryGenerated(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-neutral-200 leading-relaxed font-sans">
            &quot;In May 2026, {metrics.businessName} achieved $148.8k ARR ($12.4k MRR) with 64% net profit margin across 248 active customers. CAC stands low at $42 against an LTV of $720 (17.1x unit economics). Current cash runway remains healthy at 18 months ($4.4k/mo burn rate). Recommended next step: Expand acquisition ad budget by 2x to leverage low payback duration.&quot;
          </p>
        </GlassCard>
      )}

      {/* Executive KPIs Grid (8 Key Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">MRR (MONTHLY RECURRING)</span>
          <p className="text-2xl font-extrabold text-white mt-1">${metrics.mrr.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">↑ +26.5% MoM Growth</span>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">ARR (ANNUAL RUN RATE)</span>
          <p className="text-2xl font-extrabold text-white mt-1">${metrics.arr.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Annualized Run Rate</span>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">LTV / CAC RATIO</span>
          <p className="text-2xl font-extrabold text-white mt-1">{ltvCacRatio}x</p>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">High Unit Efficiency</span>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">CASH RUNWAY</span>
          <p className="text-2xl font-extrabold text-white mt-1">{metrics.cashRunwayMonths} Months</p>
          <span className="text-[11px] text-neutral-300 font-mono mt-1 block">Burn: ${metrics.monthlyBurnRate}/mo</span>
        </GlassCard>
      </div>

      {/* Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Monthly Revenue vs. Expenses Trend
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">Recharts Live</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.history}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#a3a3a3" fontSize={11} />
                <YAxis stroke="#a3a3a3" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0a0a0a", borderColor: "rgba(255,255,255,0.2)", borderRadius: "12px" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={0.1} fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Customer Growth Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Active Customer Base Growth
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">248 Customers</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#a3a3a3" fontSize={11} />
                <YAxis stroke="#a3a3a3" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0a0a0a", borderColor: "rgba(255,255,255,0.2)", borderRadius: "12px" }}
                />
                <Bar dataKey="customers" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Financial & Growth Forecast Section */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-white" />
            AI Predictive Financial & Hiring Forecast
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px]">
            Q3 / Q4 2026 Forecast
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-neutral-400 font-mono block">NEXT MONTH REVENUE</span>
            <p className="text-emerald-400 font-extrabold text-lg">${(metrics.mrr * 1.22).toFixed(0)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-neutral-400 font-mono block">NEXT QUARTER ARR</span>
            <p className="text-white font-extrabold text-lg">${(metrics.arr * 1.35).toFixed(0)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-neutral-400 font-mono block">HIRING CAPACITY</span>
            <p className="text-white font-extrabold text-lg">+2 Senior Engineers</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-neutral-400 font-mono block">RECOMMENDED FUNDING</span>
            <p className="text-white font-extrabold text-lg">$500k Pre-Seed</p>
          </div>
        </div>
      </GlassCard>

      {/* Metrics Upload Modal */}
      <MetricsUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
}
