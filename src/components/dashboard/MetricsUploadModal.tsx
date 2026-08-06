"use client";

import React, { useState } from "react";
import { X, Upload, Check, DollarSign, Users, LineChart } from "lucide-react";
import { useFounderGraph } from "@/lib/graph/graph-memory";

interface MetricsUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MetricsUploadModal({ isOpen, onClose }: MetricsUploadModalProps) {
  const { metrics, updateMetrics } = useFounderGraph();
  const [formData, setFormData] = useState({
    businessName: metrics.businessName,
    mrr: metrics.mrr,
    arr: metrics.arr,
    monthlyExpenses: metrics.monthlyExpenses,
    cac: metrics.cac,
    ltv: metrics.ltv,
    totalCustomers: metrics.totalCustomers,
    monthlyBurnRate: metrics.monthlyBurnRate,
    cashRunwayMonths: metrics.cashRunwayMonths,
  });
  const [activeTab, setActiveTab] = useState<"manual" | "csv">("manual");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetrics({
      businessName: formData.businessName,
      mrr: Number(formData.mrr),
      arr: Number(formData.mrr) * 12,
      monthlyExpenses: Number(formData.monthlyExpenses),
      cac: Number(formData.cac),
      ltv: Number(formData.ltv),
      totalCustomers: Number(formData.totalCustomers),
      monthlyBurnRate: Number(formData.monthlyBurnRate),
      cashRunwayMonths: Number(formData.cashRunwayMonths),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-neutral-950 border border-white/15 rounded-3xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <LineChart className="w-5 h-5 text-emerald-400" />
            <span>Update Business Performance Metrics</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg border border-white/10 text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex rounded-full border border-white/10 bg-white/5 p-1 text-xs">
          <button
            onClick={() => setActiveTab("manual")}
            className={`flex-1 py-1.5 rounded-full font-medium transition-colors ${
              activeTab === "manual" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            Manual Entry Form
          </button>
          <button
            onClick={() => setActiveTab("csv")}
            className={`flex-1 py-1.5 rounded-full font-medium transition-colors ${
              activeTab === "csv" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            Upload CSV / Excel
          </button>
        </div>

        {activeTab === "manual" ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-neutral-400 font-mono">BUSINESS NAME</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono">MONTHLY RECURRING REVENUE (MRR)</label>
                <input
                  type="number"
                  value={formData.mrr}
                  onChange={(e) => setFormData({ ...formData, mrr: Number(e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono">MONTHLY EXPENSES ($)</label>
                <input
                  type="number"
                  value={formData.monthlyExpenses}
                  onChange={(e) => setFormData({ ...formData, monthlyExpenses: Number(e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono">TOTAL ACTIVE CUSTOMERS</label>
                <input
                  type="number"
                  value={formData.totalCustomers}
                  onChange={(e) => setFormData({ ...formData, totalCustomers: Number(e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono">CUSTOMER ACQUISITION COST (CAC)</label>
                <input
                  type="number"
                  value={formData.cac}
                  onChange={(e) => setFormData({ ...formData, cac: Number(e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono">CUSTOMER LIFETIME VALUE (LTV)</label>
                <input
                  type="number"
                  value={formData.ltv}
                  onChange={(e) => setFormData({ ...formData, ltv: Number(e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-white/10 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
              >
                Save & Recalculate BI
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 border border-dashed border-white/20 rounded-2xl text-center space-y-3">
            <Upload className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-xs font-bold text-white">Drag & Drop Stripe, Razorpay, or QuickBooks CSV Export</p>
            <p className="text-[10px] text-neutral-400 font-mono">Supports .csv, .xlsx up to 25MB</p>
            <button className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors">
              Choose File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
