"use client";

import React, { useState } from "react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { GlassCard } from "@/components/ui/GlassCard";
import { ComplianceDoc } from "@/types/founder-os";
import {
  FileCheck,
  ShieldCheck,
  Clock,
  DollarSign,
  ExternalLink,
  Upload,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  FileText
} from "lucide-react";

export function BusinessDocumentationView() {
  const { documents, updateDocStatus } = useFounderGraph();
  const [selectedDoc, setSelectedDoc] = useState<ComplianceDoc>(documents[0]);
  const [activeTab, setActiveTab] = useState<"All" | "Urgent" | "Approved">("All");

  const filteredDocs = documents.filter((doc) => {
    if (activeTab === "Urgent") return doc.urgency === "Urgent";
    if (activeTab === "Approved") return doc.status === "Approved";
    return true;
  });

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <FileCheck className="w-3.5 h-3.5 text-white" />
            <span>STAGE 3 :: BUSINESS DOCUMENTATION & LEGAL COMPLIANCE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Compliance & Document Engine
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Country & Entity matched compliance documents with automated step-by-step procedures.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-white/5 text-xs">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              activeTab === "All" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            All Docs ({documents.length})
          </button>
          <button
            onClick={() => setActiveTab("Urgent")}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              activeTab === "Urgent" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            Urgent Only
          </button>
          <button
            onClick={() => setActiveTab("Approved")}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              activeTab === "Approved" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Document Cards List */}
        <div className="space-y-3">
          {filteredDocs.map((doc) => (
            <GlassCard
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`p-4 cursor-pointer transition-all ${
                selectedDoc.id === doc.id
                  ? "border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{doc.title}</span>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-400">{doc.category}</p>
                </div>
                <span
                  className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                    doc.urgency === "Urgent"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "bg-white/10 text-neutral-300"
                  }`}
                >
                  {doc.urgency}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-neutral-400">Status: {doc.status}</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Right Column: Selected Document Detailed View */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  {selectedDoc.category}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">{selectedDoc.title}</h2>
              </div>

              {/* Status Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-neutral-400 font-mono">Status:</span>
                <select
                  value={selectedDoc.status}
                  onChange={(e) => updateDocStatus(selectedDoc.id, e.target.value as ComplianceDoc["status"])}
                  className="bg-black border border-white/20 rounded-xl text-xs text-white px-3 py-1.5 focus:outline-none"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Drafting">Drafting</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
            </div>

            {/* Purpose & Overview */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase">Purpose & Overview</span>
              <p className="text-xs text-neutral-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                {selectedDoc.purpose}
              </p>
            </div>

            {/* Quick Metrics (Fees, Timeline, Eligibility) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-neutral-400 font-mono block">GOVERNMENT FEES</span>
                <p className="text-white font-bold">{selectedDoc.governmentFees}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-neutral-400 font-mono block">ESTIMATED TIMELINE</span>
                <p className="text-white font-bold">{selectedDoc.estimatedTimeline}</p>
              </div>
            </div>

            {/* Step-by-Step Procedure Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase">Step-by-Step Application Steps</span>
              <div className="space-y-2">
                {selectedDoc.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-300">
                    <span className="w-5 h-5 rounded-full bg-white text-black font-bold font-mono text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload File Attachment Simulation */}
            <div className="p-5 rounded-2xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-center space-y-2">
              <Upload className="w-5 h-5 text-neutral-400" />
              <p className="text-xs font-bold text-white">Upload Executed Document Copy</p>
              <p className="text-[10px] text-neutral-400 font-mono">PDF, PNG, JPG up to 10MB</p>
              <button className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors mt-1">
                Select File
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
