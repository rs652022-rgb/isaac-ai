"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * 1. Neural Mesh Background for 25+ C-Suite Agents Section
 * Features floating nodes and pulsing data connections to represent parallel AI agent communication.
 */
export function AgentsMeshBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
      {/* Central Blue-Purple Neural Core */}
      <motion.div
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 90, 180]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[350px] bg-gradient-to-r from-blue-600/20 via-emerald-600/15 to-purple-600/20 rounded-full blur-[100px]"
      />

      {/* SVG Neural Mesh Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neural-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 50 100 Q 300 20 600 150 T 1200 100"
          fill="none"
          stroke="url(#neural-line)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 100 250 Q 500 350 900 180 T 1400 300"
          fill="none"
          stroke="url(#neural-line)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

/**
 * 2. AI Features Grid Background
 * Features ambient floating orbital spotlights for high-tech validation & doc engines.
 */
export function FeaturesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-20, 20, -20],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-[400px] h-[300px] bg-emerald-500/15 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [40, -40, 40],
          y: [20, -20, 20],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-[450px] h-[320px] bg-blue-500/15 rounded-full blur-[100px]"
      />
    </div>
  );
}

/**
 * 3. Why Isaac.AI Comparison Section Background
 * Features dual color aura: Danger Red behind Traditional vs Emerald Green behind Isaac.AI OS.
 */
export function ComparisonBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-between px-12">
      {/* Left side: Soft Red Glow behind Traditional Method */}
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[350px] h-[350px] bg-red-600/15 rounded-full blur-[110px]"
      />

      {/* Right side: Vibrant Emerald Glow behind Isaac.AI OS */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[110px]"
      />
    </div>
  );
}

/**
 * 4. Pricing Section Background
 * Features an ascending energy spotlight directly behind the recommended Founder Pro tier.
 */
export function PricingBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
      {/* Center Spotlight behind Pro Tier */}
      <motion.div
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.2, 0.45, 0.2]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="w-[450px] h-[550px] bg-gradient-to-t from-emerald-500/25 via-teal-600/15 to-transparent rounded-full blur-[120px]"
      />
    </div>
  );
}

/**
 * 5. FAQ Section Background
 * Features expanding radial clarity rings for crisp FAQ answers.
 */
export function FaqBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
      <motion.div
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="w-[500px] h-[350px] bg-indigo-600/15 rounded-full blur-[100px]"
      />
    </div>
  );
}
