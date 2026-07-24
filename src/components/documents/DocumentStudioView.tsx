"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { GeneratedDocument } from "@/types";
import { FileText, Copy, Check } from "lucide-react";

export function DocumentStudioView() {
  const { documents, addDocument, founderProfile } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<GeneratedDocument | null>(documents[0] || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (docType: GeneratedDocument["type"]) => {
    setIsGenerating(true);
    setTimeout(() => {
      let content = "";
      if (docType === "PRD") {
        content = `# Product Requirement Document (PRD) — ${founderProfile.startupName}\n\n## 1. Executive Summary\n${founderProfile.solution}\n\n## 2. Core User Stories\n- As a founder, I want to audit my pitch deck with an AI VC.\n- As a founder, I want to compare Delaware vs India incorporation costs.\n\n## 3. Tech Stack Requirements\n- Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, Redis.`;
      } else if (docType === "Founder Agreement") {
        content = `# Co-Founder Equity Agreement\n\nThis agreement is made between the founders of ${founderProfile.startupName}.\n\n## 1. Equity Allocation & Vesting\n- Total Authorized Shares: 10,000,000 Common Stock.\n- Vesting Schedule: 4-Year Vesting with a 1-Year Cliff (25% vesting at month 12).`;
      } else if (docType === "Financial Model") {
        content = `# 3-Year Pro Forma Financial Model — ${founderProfile.startupName}\n\n## Revenue Forecast\n- Year 1: $120,000 ARR (200 Pro Users @ $49/mo)\n- Year 2: $600,000 ARR (1,000 Pro Users)\n- Year 3: $2,400,000 ARR\n\n## Expense Breakdown\n- LLM API Token Costs: 12% of revenue\n- Infrastructure (Vercel/Supabase): $400/mo`;
      } else {
        content = `# ${docType} — ${founderProfile.startupName}\n\nDrafted by Isaac.AI Document Agent for ${founderProfile.startupName}.\nIncludes standard IP assignment, non-compete clauses, and governance rules.`;
      }

      const newDoc: GeneratedDocument = {
        id: `doc_${Date.now()}`,
        title: `${founderProfile.startupName} — ${docType}`,
        category: docType === "PRD" ? "Product" : "Legal",
        type: docType,
        createdAt: new Date().toISOString().split("T")[0],
        content,
        status: "Draft"
      };

      addDocument(newDoc);
      setSelectedDoc(newDoc);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (selectedDoc) {
      navigator.clipboard.writeText(selectedDoc.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono mb-1">
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>AI DOCUMENT STUDIO & LEGAL BUILDER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Document Studio</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Generate VC-ready pitch decks, PRDs, founder agreements, NDAs, and financial models.
          </p>
        </div>

        {/* Quick Generate Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {(["Pitch Deck", "PRD", "Founder Agreement", "Financial Model", "NDA"] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleGenerate(type)}
              disabled={isGenerating}
              className="px-3 py-1.5 rounded-full border border-white/10 bg-neutral-950 hover:bg-white/10 text-xs font-mono text-neutral-200 transition-colors whitespace-nowrap"
            >
              + {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List Sidebar */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">Generated Documents</h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <GlassCard
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedDoc?.id === doc.id
                    ? "border-white/40 bg-neutral-900 shadow-xl"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-white/10 text-white">
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">{doc.createdAt}</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-2 truncate">{doc.title}</h4>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Document Viewer / Editor */}
        <div className="lg:col-span-2 space-y-4">
          {selectedDoc ? (
            <GlassCard className="p-6 space-y-4 flex flex-col min-h-[500px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-sm font-bold text-white">{selectedDoc.title}</h2>
                  <p className="text-[11px] text-neutral-500 font-mono">Category: {selectedDoc.category} • Status: {selectedDoc.status}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-white/10 bg-black text-xs text-neutral-300 hover:text-white"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap">
                {selectedDoc.content}
              </div>
            </GlassCard>
          ) : (
            <div className="p-12 text-center text-xs text-neutral-500 font-mono">Select or generate a document to view.</div>
          )}
        </div>
      </div>
    </div>
  );
}
