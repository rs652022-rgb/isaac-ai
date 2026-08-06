"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Sidebar } from "@/components/ui/Sidebar";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-white/10 mb-4 flex items-center justify-center font-extrabold text-xs">IS</div>
          <div className="text-[10px] font-mono text-neutral-500 tracking-widest">INITIALIZING OS...</div>
        </div>
      </div>
    );
  }

  // AI Founder OS Dashboard routes have their own full-screen layout with dedicated Sidebar & Header
  if (pathname.startsWith("/dashboard")) {
    return (
      <>
        {children}
        <CommandPalette />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
