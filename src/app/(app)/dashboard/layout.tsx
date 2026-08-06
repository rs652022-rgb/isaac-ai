"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NotificationsDrawer } from "@/components/dashboard/NotificationsDrawer";
import { BookmarksDrawer } from "@/components/dashboard/BookmarksDrawer";
import { StageAIPanel } from "@/components/agents/StageAIPanel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [activeStageAI, setActiveStageAI] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Sidebar Navigation */}
      <Sidebar onOpenStageAI={(stageId) => setActiveStageAI(stageId)} />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardHeader
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
          {children}
        </main>
      </div>

      {/* Slide-over Drawers & Embedded Stage AI */}
      <NotificationsDrawer
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <BookmarksDrawer
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
      />

      {activeStageAI && (
        <StageAIPanel
          stageId={activeStageAI}
          isOpen={!!activeStageAI}
          onClose={() => setActiveStageAI(null)}
        />
      )}
    </div>
  );
}
