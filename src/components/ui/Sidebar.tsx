"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import {
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  MapPin,
  FileCheck,
  FileText,
  Code2,
  Palette,
  Briefcase,
  Sliders,
  CreditCard,
  Sparkles,
  HelpCircle
} from "lucide-react";

export function Sidebar() {
  const { activeTab, setActiveTab } = useApp();

  const NAV_ITEMS = [
    { id: "dashboard", label: "OS Dashboard", icon: LayoutDashboard, category: "Core" },
    { id: "chat", label: "AI Agent Workspace", icon: MessageSquare, badge: "25 Agents", category: "Core" },
    { id: "validation", label: "Validation Engine", icon: ShieldCheck, category: "Strategy" },
    { id: "roadmap", label: "Action Roadmap", icon: MapPin, category: "Strategy" },
    { id: "registration", label: "Registration Assistant", icon: FileCheck, category: "Execution" },
    { id: "documents", label: "AI Document Studio", icon: FileText, category: "Execution" },
    { id: "product-builder", label: "Product & Tech Stack", icon: Code2, category: "Execution" },
    { id: "branding", label: "Branding & GTM", icon: Palette, category: "Growth" },
    { id: "funding", label: "Funding & Pitch Coach", icon: Briefcase, category: "Growth" },
    { id: "admin", label: "Admin Panel", icon: Sliders, category: "Management" },
    { id: "billing", label: "Subscriptions", icon: CreditCard, category: "Management" }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-white/10 bg-slate-950/60 backdrop-blur-xl min-h-[calc(100vh-65px)] p-4 space-y-6">
      {/* Category Navigation */}
      <div className="space-y-6 flex-1">
        {["Core", "Strategy", "Execution", "Growth", "Management"].map((cat) => {
          const items = NAV_ITEMS.filter((i) => i.category === cat);
          return (
            <div key={cat} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {cat}
              </h3>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? "bg-indigo-600/20 text-white border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-3.5 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-slate-900/80 backdrop-blur-lg">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-300 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Need Founder Advice?</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-2.5 leading-relaxed">
          Ask Devil's Advocate Agent to stress test your business model.
        </p>
        <button
          onClick={() => setActiveTab("chat")}
          className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium transition-colors text-center"
        >
          Ask Isaac Now
        </button>
      </div>
    </aside>
  );
}
