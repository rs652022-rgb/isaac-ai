"use client";

import React from "react";
import { X, Bookmark, ExternalLink, ArrowRight } from "lucide-react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { useRouter } from "next/navigation";

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookmarksDrawer({ isOpen, onClose }: BookmarksDrawerProps) {
  const { resources, grants } = useFounderGraph();
  const router = useRouter();

  if (!isOpen) return null;

  const bookmarkedResources = resources
    .flatMap((cat) => cat.items)
    .filter((item) => item.isBookmarked);

  const bookmarkedGrants = grants.filter((g) => g.isBookmarked);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-neutral-950 border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Bookmark className="w-4 h-4 text-cyan-400" />
              <span>Bookmarked Tools & Grants</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg border border-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
            {/* Bookmarked Tools */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                SAVED BUSINESS TOOLS ({bookmarkedResources.length})
              </span>
              {bookmarkedResources.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl border border-white/10 bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-neutral-400">{item.recommendationReason}</p>
                </div>
              ))}
            </div>

            {/* Bookmarked Grants */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                SAVED GOVERNMENT SCHEMES ({bookmarkedGrants.length})
              </span>
              {bookmarkedGrants.map((grant) => (
                <div key={grant.id} className="p-3.5 rounded-2xl border border-white/10 bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{grant.title}</span>
                    <a
                      href={grant.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-mono font-bold">{grant.fundingAmount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-neutral-300 font-medium hover:bg-white/10 transition-colors"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
}
