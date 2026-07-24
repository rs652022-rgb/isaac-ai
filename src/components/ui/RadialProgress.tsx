import React from "react";

interface RadialProgressProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: "indigo" | "cyan" | "emerald" | "amber" | "rose" | "purple";
}

export function RadialProgress({
  score,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  color = "indigo"
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colorGradients = {
    indigo: { start: "#818cf8", end: "#4f46e5", glow: "rgba(99, 102, 241, 0.4)" },
    cyan: { start: "#38bdf8", end: "#0284c7", glow: "rgba(56, 189, 248, 0.4)" },
    emerald: { start: "#34d399", end: "#059669", glow: "rgba(52, 211, 153, 0.4)" },
    amber: { start: "#fbbf24", end: "#d97706", glow: "rgba(251, 191, 36, 0.4)" },
    rose: { start: "#fb7185", end: "#e11d48", glow: "rgba(251, 113, 133, 0.4)" },
    purple: { start: "#c084fc", end: "#9333ea", glow: "rgba(192, 132, 252, 0.4)" }
  };

  const selectedColor = colorGradients[color];

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="-rotate-90 transform">
        <defs>
          <linearGradient id={`radial-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={selectedColor.start} />
            <stop offset="100%" stopColor={selectedColor.end} />
          </linearGradient>
          <filter id={`glow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-800/60"
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#radial-grad-${color})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
            filter: `drop-shadow(0 0 8px ${selectedColor.glow})`
          }}
        />
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold tracking-tight text-white">{score}</span>
        {label && <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{label}</span>}
      </div>
      {sublabel && <span className="mt-2 text-xs font-medium text-slate-300">{sublabel}</span>}
    </div>
  );
}
