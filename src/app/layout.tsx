import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISAAC.AI — The AI Co-Founder Every Founder Deserves",
  description: "Enterprise-grade AI Founder Operating System with 25+ specialized C-suite agents guiding entrepreneurs from Day 0 to Delaware incorporation, pitch decks, and scaling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
