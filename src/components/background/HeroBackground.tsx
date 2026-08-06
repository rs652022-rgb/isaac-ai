"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Iridescence = dynamic(() => import("./Iridescence"), {
  ssr: false,
});

export function HeroBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* 1. Iridescence WebGL Canvas or Static Ambient Fallback */}
      {!prefersReducedMotion ? (
        <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen transition-opacity duration-1000">
          <Iridescence
            color={[0.4, 0.45, 0.65]}
            speed={0.4}
            amplitude={0.08}
            mouseReact={true}
          />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-black" />
      )}

      {/* 2. Soft Ambient Vignette Overlay for Contrast Protection */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/95 z-1 pointer-events-none" />

      {/* 3. Radial Glow Center Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-1 pointer-events-none" />
    </div>
  );
}
