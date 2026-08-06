"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ScoreCard } from "./visualizers/ScoreCard";
import { SWOTCard } from "./visualizers/SWOTCard";
import { CompetitorTable } from "./visualizers/CompetitorTable";
import { KPIGrid } from "./visualizers/KPIGrid";
import { RoadmapCard } from "./visualizers/RoadmapCard";
import { RevenueChart } from "./visualizers/RevenueChart";
import { PieChartComponent } from "./visualizers/PieChartComponent";
import { BarChartComponent } from "./visualizers/BarChartComponent";

export interface ResponseFormatterProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
}

export function ResponseFormatter({ content, isStreaming = false, className = "" }: ResponseFormatterProps) {
  const displayContent = content || "";

  return (
    <div className={`prose prose-invert max-w-none text-xs leading-relaxed space-y-2 font-sans ${className}`}>
      {displayContent ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="text-sm font-bold text-white mt-3 mb-1.5">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xs font-bold text-white mt-2.5 mb-1">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xs font-semibold text-neutral-200 mt-2 mb-1">{children}</h3>,
            p: ({ children }) => <p className="mb-2 last:mb-0 text-neutral-200 font-normal">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
            em: ({ children }) => <em className="italic text-neutral-300">{children}</em>,
            ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-2 text-neutral-300">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-2 text-neutral-300">{children}</ol>,
            li: ({ children }) => <li className="leading-snug">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-white/20 pl-3 my-2 text-neutral-400 italic bg-white/[0.02] py-1 rounded-r-lg">
                {children}
              </blockquote>
            ),
            code: ({ inline, className, children, ...props }: any) => {
              const match = /language-([^\s]+)/.exec(className || "");
              const lang = match ? match[1] : "";
              const rawCode = String(children).replace(/\n$/, "");

              // Intercept json:structured blocks and render reusable UI components
              if (
                !inline &&
                (lang === "json:structured" ||
                  lang === "structured" ||
                  lang === "json" ||
                  rawCode.includes('"visualType"'))
              ) {
                try {
                  const parsed = JSON.parse(rawCode);
                  if (parsed && parsed.visualType && parsed.data) {
                    const { visualType, data, text } = parsed;

                    return (
                      <div className="my-2">
                        {text && (
                          <div className="mb-3 text-neutral-200 font-normal">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                          </div>
                        )}

                        {visualType === "score" && <ScoreCard {...data} />}
                        {visualType === "swot" && <SWOTCard {...data} />}
                        {visualType === "comparison_table" && <CompetitorTable {...data} />}
                        {visualType === "kpis" && <KPIGrid {...data} />}
                        {visualType === "roadmap" && <RoadmapCard {...data} />}
                        {visualType === "chart_line" && <RevenueChart {...data} />}
                        {visualType === "chart_pie" && <PieChartComponent {...data} />}
                        {visualType === "chart_bar" && <BarChartComponent {...data} />}
                      </div>
                    );
                  }
                } catch {
                  if (isStreaming) {
                    return (
                      <div className="my-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center space-x-2 font-mono text-[11px] text-neutral-400">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                        <span>Rendering structured visualization...</span>
                      </div>
                    );
                  }
                }
              }

              if (inline) {
                return (
                  <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-amber-300 border border-white/10" {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <pre className="p-3 my-2.5 rounded-xl bg-neutral-950 border border-white/10 font-mono text-[11px] text-neutral-200 overflow-x-auto">
                  <code>{children}</code>
                </pre>
              );
            },
            table: ({ children }) => (
              <div className="overflow-x-auto my-3 border border-white/10 rounded-xl bg-black/40">
                <table className="min-w-full divide-y divide-white/10 text-[11px] text-neutral-300">{children}</table>
              </div>
            ),
            th: ({ children }) => <th className="px-3 py-2 text-left font-semibold text-white bg-white/5 font-mono">{children}</th>,
            td: ({ children }) => <td className="px-3 py-2 border-t border-white/5 font-mono">{children}</td>,
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                {children}
              </a>
            ),
          }}
        >
          {displayContent}
        </ReactMarkdown>
      ) : (
        <span className="text-neutral-400 italic text-[11px] font-mono">Generating response...</span>
      )}

      {/* Typing streaming cursor indicator */}
      {isStreaming && (
        <span className="inline-block w-1.5 h-3.5 ml-1 bg-white animate-pulse align-middle rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      )}
    </div>
  );
}
