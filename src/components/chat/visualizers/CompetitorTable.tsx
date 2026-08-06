"use client";

import React from "react";
import { Table as TableIcon } from "lucide-react";

export interface CompetitorTableProps {
  title?: string;
  headers: string[];
  rows: string[][];
}

export function CompetitorTable({ title = "Feature & Competitor Comparison Matrix", headers = [], rows = [] }: CompetitorTableProps) {
  return (
    <div className="my-3 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md space-y-3">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <TableIcon className="w-4 h-4 text-amber-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-xs">
          <thead>
            <tr className="bg-white/5">
              {headers.map((h, i) => (
                <th key={i} className="px-3 py-2 text-left font-mono font-bold text-white text-[11px]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[11px] text-neutral-300">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-white/[0.02]">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className={`px-3 py-2 ${cIdx === 0 ? "font-semibold text-white" : "font-mono"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
