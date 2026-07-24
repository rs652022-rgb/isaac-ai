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
  hoverable = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          hoverable && "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_rgb(255,255,255,0.05)]",
          className
        )
      )}
      {...props}
    >
      {/* Delicate top edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      {children}
    </div>
  );
}
