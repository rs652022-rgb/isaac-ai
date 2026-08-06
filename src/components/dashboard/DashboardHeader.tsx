"use client";

import React, { useState } from "react";
import { Search, Bell, Bookmark, Sparkles, Command, Cpu, ArrowUpRight } from "lucide-react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  onToggleNotifications: () => void;
  onToggleBookmarks: () => void;
}

export function DashboardHeader({ onToggleNotifications, onToggleBookmarks }: DashboardHeaderProps) {
  const { notifications, metrics } = useFounderGraph();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const quickLinks = [
    { title: "Stage 1: Validate Idea", url: "/dashboard/idea-validation" },
    { title: "Stage 2: Tool Stack & Resources", url: "/dashboard/resources" },
    { title: "Stage 3: Business Documentation", url: "/dashboard/documents" },
    { title: "Stage 4: Government Grants Engine", url: "/dashboard/grants" },
    { title: "Stage 5: Investor Directory & Pitch", url: "/dashboard/investors" },
    { title: "Stage 6: Performance & Recharts BI", url: "/dashboard/performance" },
  ];

  const filteredLinks = searchQuery
    ? quickLinks.filter((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : quickLinks;

  return (
    <header className="h-16 border-b border-white/[0.08] bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Universal Search Bar Trigger */}
      <div className="relative w-72 sm:w-96">
        <button
          onClick={() => setShowSearchModal(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 text-xs transition-all"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>Search stage, doc, grant or investor...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-black text-[9px] font-mono text-neutral-400">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Universal Search Modal */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 p-4">
            <div className="w-full max-w-xl bg-neutral-950 border border-white/15 rounded-3xl p-5 shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-white">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>UNIVERSAL AI FOUNDER SEARCH</span>
                </div>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Esc
                </button>
              </div>

              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search stages, metrics, or legal docs..."
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />

              <div className="space-y-1 max-h-64 overflow-y-auto">
                {filteredLinks.map((link) => (
                  <div
                    key={link.url}
                    onClick={() => {
                      setShowSearchModal(false);
                      router.push(link.url);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 cursor-pointer text-xs font-medium text-white transition-colors"
                  >
                    <span>{link.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Top Header Actions */}
      <div className="flex items-center space-x-4">
        {/* Startup Context Switcher Pill */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-bold text-white">{metrics.businessName}</span>
          <span className="text-[10px] font-mono text-neutral-400">(${metrics.arr.toLocaleString()} ARR)</span>
        </div>

        {/* Bookmarks Toggle Button */}
        <button
          onClick={onToggleBookmarks}
          className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors relative"
          title="Saved Resources & Grants"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        {/* Notifications Drawer Toggle Button */}
        <button
          onClick={onToggleNotifications}
          className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors relative"
          title="Notifications & AI Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 text-black text-[9px] font-bold font-mono flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Open AI Chat Workspace Button */}
        <button
          onClick={() => router.push("/chat")}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <Cpu className="w-3.5 h-3.5 text-black" />
          <span>Launch AI Mesh</span>
        </button>
      </div>
    </header>
  );
}
