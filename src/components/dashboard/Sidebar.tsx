"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  Wrench,
  FileCheck,
  Building2,
  Users,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Bot
} from "lucide-react";
import { useFounderGraph } from "@/lib/graph/graph-memory";

interface SidebarProps {
  onOpenStageAI?: (stageId: string) => void;
}

export function Sidebar({ onOpenStageAI }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { nodes } = useFounderGraph();

  const menuItems = [
    {
      id: "overview",
      label: "Dashboard Home",
      path: "/dashboard",
      icon: LayoutDashboard,
      badge: "HUB",
    },
    {
      id: "idea-validation",
      label: "1. Idea Validation",
      path: "/dashboard/idea-validation",
      icon: Target,
      badge: "85%",
    },
    {
      id: "resources",
      label: "2. Important Resources",
      path: "/dashboard/resources",
      icon: Wrench,
      badge: "60%",
    },
    {
      id: "documents",
      label: "3. Business Documents",
      path: "/dashboard/documents",
      icon: FileCheck,
      badge: "45%",
    },
    {
      id: "grants",
      label: "4. Government Grants",
      path: "/dashboard/grants",
      icon: Building2,
      badge: "30%",
    },
    {
      id: "investors",
      label: "5. Private Investors",
      path: "/dashboard/investors",
      icon: Users,
      badge: "20%",
    },
    {
      id: "performance",
      label: "6. Performance BI",
      path: "/dashboard/performance",
      icon: LineChart,
      badge: "72%",
    },
    {
      id: "settings",
      label: "Settings & Profile",
      path: "/dashboard/settings",
      icon: Settings,
      badge: "",
    },
  ];

  return (
    <aside
      className={`relative border-r border-white/[0.08] bg-black/80 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between z-40 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header Logo */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
          <Link href="/" className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              IS
            </div>
            {!collapsed && (
              <span className="text-base font-bold tracking-tight text-white font-sans whitespace-nowrap">
                ISAAC<span className="text-neutral-500 font-light">.OS</span>
              </span>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Stage Items */}
        <div className="py-4 space-y-1 px-3">
          <div className={`px-2 mb-2 ${collapsed ? "text-center" : ""}`}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
              {collapsed ? "OS" : "FOUNDER STAGES"}
            </span>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            const node = nodes.find((n) => n.id === item.id);

            return (
              <div key={item.id} className="relative group">
                <Link
                  href={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-black" : "text-neutral-400"}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-white/10 text-neutral-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>

                {/* AI Agent Drawer Trigger Button */}
                {!collapsed && node && onOpenStageAI && item.id !== "overview" && item.id !== "settings" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenStageAI(item.id);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-neutral-900 border border-white/20 text-neutral-300 hover:text-white hover:bg-white/20 text-[10px] flex items-center gap-1"
                    title={`Ask ${node.assignedAgent.name}`}
                  >
                    <Bot className="w-3 h-3 text-emerald-400" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Founder Active Status Box */}
      <div className="p-3 border-t border-white/[0.08]">
        {!collapsed ? (
          <div className="p-3 rounded-2xl border border-white/10 bg-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>25 AGENTS ONLINE</span>
              </div>
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-[11px] font-bold text-white truncate">Isaac AI Co-Founder</p>
            <p className="text-[10px] text-neutral-400 font-mono">Graph Memory: Active</p>
          </div>
        ) : (
          <div className="flex justify-center p-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="25 AI Agents Active" />
          </div>
        )}
      </div>
    </aside>
  );
}
