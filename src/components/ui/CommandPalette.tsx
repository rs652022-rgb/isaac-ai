"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/store/app-context";
import { Search, X, Cpu, FileText, Zap, Shield, Rocket, DollarSign, Code, Users } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { setActiveTab } = useApp();

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#080808] shadow-2xl overflow-hidden">
        {/* Header Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-4 h-4 text-neutral-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search ISAAC OS..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none font-sans"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const IconComp = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 group-hover:text-white group-hover:border-white/20 transition-colors">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-neutral-500">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950 border-t border-white/5 text-[10px] text-neutral-500 font-mono">
          <span>Press <strong>ESC</strong> to dismiss</span>
          <span>ISAAC.AI OS v2.4</span>
        </div>
      </div>
    </div>
  );
}
