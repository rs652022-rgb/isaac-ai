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
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-xs gap-2 tracking-tight font-medium",
    lg: "px-7 py-3 text-sm gap-2.5 tracking-tight font-semibold"
  };

  const variants = {
    primary: "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] border border-white",
    secondary: "bg-neutral-900 text-neutral-200 border border-white/10 hover:bg-neutral-800 hover:text-white hover:border-white/20",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40",
    ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-950/80 text-red-300 border border-red-500/30 hover:bg-red-900/80 hover:text-white"
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizes[size], variants[variant], className))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon && <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
