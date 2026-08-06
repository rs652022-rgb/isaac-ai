"use client";

import React from "react";
import { ResponseFormatter } from "./ResponseFormatter";

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
}

export function MarkdownRenderer({ content, isStreaming = false, className = "" }: MarkdownRendererProps) {
  return <ResponseFormatter content={content} isStreaming={isStreaming} className={className} />;
}
