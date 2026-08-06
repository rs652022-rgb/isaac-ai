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
      {/* 1. Iridescence WebGL Canvas */}
      {!prefersReducedMotion ? (
        <div className="absolute inset-0 w-full h-full opacity-75 transition-opacity duration-1000">
          <Iridescence
            color={[1, 1, 1]}
            speed={1.0}
            amplitude={0.15}
            mouseReact={true}
          />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-black" />
      )}

      {/* 2. Delicate Ambient Fade Overlay to preserve high text contrast while letting the Iridescence animation shine through brightly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black pointer-events-none z-1" />
    </div>
  );
}
