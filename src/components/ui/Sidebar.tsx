"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Sparkles
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

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
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-white/[0.08] bg-black min-h-[calc(100vh-65px)] p-4 space-y-6">
      {/* Category Navigation */}
      <div className="space-y-6 flex-1">
        {["Core", "Strategy", "Execution", "Growth", "Management"].map((cat) => {
          const items = NAV_ITEMS.filter((i) => i.category === cat);
          return (
            <div key={cat} className="space-y-1">
              <h3 className="px-3 text-[9px] font-mono font-semibold uppercase tracking-widest text-neutral-500">
                {cat}
              </h3>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === '/' + item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/${item.id}`}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-black" : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                        isActive ? "bg-black/10 text-black" : "bg-white/10 text-neutral-300"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-4 rounded-2xl border border-white/10 bg-neutral-950 backdrop-blur-xl">
        <div className="flex items-center space-x-2 text-xs font-semibold text-white mb-1">
          <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
          <span>Need Founder Advice?</span>
        </div>
        <p className="text-[11px] text-neutral-400 mb-3 leading-relaxed">
          Ask Devil&apos;s Advocate Agent to stress test your business model.
        </p>
        <Link
          href="/chat"
          className="block w-full py-2 px-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all text-center"
        >
          Ask Isaac Now
        </Link>
      </div>
    </aside>
  );
}
