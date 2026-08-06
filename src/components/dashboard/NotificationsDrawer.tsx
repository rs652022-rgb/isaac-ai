"use client";

import React from "react";
import { X, Bell, AlertTriangle, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { useFounderGraph } from "@/lib/graph/graph-memory";
import { useRouter } from "next/navigation";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const { notifications } = useFounderGraph();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-neutral-950 border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>Founder OS Notifications</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg border border-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.actionUrl) {
                    onClose();
                    router.push(item.actionUrl);
                  }
                }}
                className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.type === "deadline" ? (
                      <Calendar className="w-4 h-4 text-amber-400" />
                    ) : item.type === "ai_insight" ? (
                      <AlertTriangle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                    <span className="text-xs font-bold text-white">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{item.timestamp}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{item.message}</p>
                {item.actionUrl && (
                  <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-mono font-medium pt-1">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
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
