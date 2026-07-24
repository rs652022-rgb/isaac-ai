import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "indigo" | "cyan" | "purple" | "emerald" | "amber" | "rose" | "none";
  hoverable?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  hoverable = true,
  ...props
}: GlassCardProps) {
  const glowStyles = {
    none: "",
    indigo: "hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]",
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
    amber: "hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
    rose: "hover:border-rose-500/40 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]"
  };

  return (
    <div
      className={twMerge(
        clsx(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl transition-all duration-300",
          hoverable && "hover:-translate-y-0.5 hover:bg-slate-900/70",
          glow !== "none" && glowStyles[glow],
          className
        )
      )}
      {...props}
    >
      {/* Subtle top glare edge line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}
