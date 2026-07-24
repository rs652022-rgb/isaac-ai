import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  loading?: boolean;
}

export function GlowingButton({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled,
  ...props
}: GlowingButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:brightness-110 border border-indigo-400/30",
    secondary: "bg-slate-900/80 text-slate-200 border border-slate-700/60 hover:bg-slate-800 hover:text-white hover:border-slate-600",
    outline: "bg-transparent text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/10 hover:border-indigo-400 hover:text-white",
    ghost: "bg-transparent text-slate-400 hover:text-slate-100 hover:bg-white/5",
    danger: "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] border border-red-400/30"
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizes[size], variants[variant], className))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        icon && <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
