"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/lib/store/app-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </SessionProvider>
  );
}
