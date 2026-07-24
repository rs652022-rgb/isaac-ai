"use client";

import React, { useEffect } from "react";
import { AppProvider, useApp } from "@/lib/store/app-context";
import { useSession, SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/ui/Navbar";
import { Sidebar } from "@/components/ui/Sidebar";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { LandingPage } from "@/components/landing/LandingPage";
import { AuthModal } from "@/components/auth/AuthModal";
import { ConversationalOnboarding } from "@/components/onboarding/ConversationalOnboarding";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { AgentChatWorkspace } from "@/components/chat/AgentChatWorkspace";
import { ValidationEngineView } from "@/components/validation/ValidationEngineView";
import { RoadmapView } from "@/components/roadmap/RoadmapView";
import { RegistrationAssistantView } from "@/components/registration/RegistrationAssistantView";
import { DocumentStudioView } from "@/components/documents/DocumentStudioView";
import { ProductBuilderView } from "@/components/product-builder/ProductBuilderView";
import { BrandingGtmView } from "@/components/branding/BrandingGtmView";
import { FundingCoachView } from "@/components/funding/FundingCoachView";
import { AdminPanelView } from "@/components/admin/AdminPanelView";
import { BillingView } from "@/components/billing/BillingView";

function MainAppShell() {
  const { activeTab, setActiveTab } = useApp();
  const { status } = useSession();

  useEffect(() => {
    // If not authenticated, protect routes by redirecting to auth tab
    if (status === "unauthenticated" && activeTab !== "landing" && activeTab !== "auth") {
      setActiveTab("auth");
    }
  }, [status, activeTab, setActiveTab]);

  if (activeTab === "landing") {
    return <LandingPage />;
  }

  if (activeTab === "auth") {
    return <AuthModal />;
  }

  if (activeTab === "onboarding") {
    return <ConversationalOnboarding />;
  }

  return (
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "chat" && <AgentChatWorkspace />}
          {activeTab === "validation" && <ValidationEngineView />}
          {activeTab === "roadmap" && <RoadmapView />}
          {activeTab === "registration" && <RegistrationAssistantView />}
          {activeTab === "documents" && <DocumentStudioView />}
          {activeTab === "product-builder" && <ProductBuilderView />}
          {activeTab === "branding" && <BrandingGtmView />}
          {activeTab === "funding" && <FundingCoachView />}
          {activeTab === "admin" && <AdminPanelView />}
          {activeTab === "billing" && <BillingView />}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <AppProvider>
        <MainAppShell />
      </AppProvider>
    </SessionProvider>
  );
}
