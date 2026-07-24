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
  strokeWidth = 8,
  label,
  sublabel,
  color = "indigo"
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="-rotate-90 transform">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))"
          }}
        />
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-extrabold tracking-tight text-white">{score}</span>
        {label && <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono mt-0.5">{label}</span>}
      </div>
      {sublabel && <span className="mt-2 text-xs font-medium text-neutral-400">{sublabel}</span>}
    </div>
  );
}
