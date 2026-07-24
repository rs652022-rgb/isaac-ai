"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/store/app-context";
import { Search, X, Cpu, FileText, Zap, Shield, Rocket, DollarSign, Code, Users } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { setActiveTab, setSelectedAgent } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const COMMANDS = [
    { id: "dashboard", label: "Open Founder OS Dashboard", category: "Navigation", icon: Zap, action: () => { setActiveTab("dashboard"); setIsOpen(false); } },
    { id: "chat", label: "Launch AI Workspace & Multi-Agent Chat", category: "Navigation", icon: Cpu, action: () => { setActiveTab("chat"); setIsOpen(false); } },
    { id: "validation", label: "Run Startup Idea & Risk Validation", category: "Navigation", icon: Shield, action: () => { setActiveTab("validation"); setIsOpen(false); } },
    { id: "roadmap", label: "View Interactive Action Roadmap", category: "Navigation", icon: Rocket, action: () => { setActiveTab("roadmap"); setIsOpen(false); } },
    { id: "registration", label: "Open Multi-Country Registration Assistant", category: "Navigation", icon: FileText, action: () => { setActiveTab("registration"); setIsOpen(false); } },
    { id: "documents", label: "Open AI Document Studio", category: "Navigation", icon: FileText, action: () => { setActiveTab("documents"); setIsOpen(false); } },
    { id: "product-builder", label: "Open Tech Stack & Schema Builder", category: "Navigation", icon: Code, action: () => { setActiveTab("product-builder"); setIsOpen(false); } },
    { id: "funding", label: "Open Pitch Coach & Investor Directory", category: "Navigation", icon: DollarSign, action: () => { setActiveTab("funding"); setIsOpen(false); } },
    { id: "admin", label: "Open System Admin Panel", category: "Navigation", icon: Users, action: () => { setActiveTab("admin"); setIsOpen(false); } }
  ];

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-indigo-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(99,102,241,0.25)] overflow-hidden">
        {/* Header Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search ISAAC OS... (Press Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const IconComp = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-white/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span>{cmd.label}</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-indigo-300 font-mono">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-sm text-slate-500">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-t border-white/5 text-[11px] text-slate-400">
          <span>Use <strong>Ctrl+K</strong> to toggle command center</span>
          <span>ISAAC.AI OS v2.4</span>
        </div>
      </div>
    </div>
  );
}
