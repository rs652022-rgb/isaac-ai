"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, FounderProfile, AgentMessage, AIAgent, StartupScores, RoadmapTask, GeneratedDocument } from "@/types";
import { AI_AGENTS, analyzeStartupIdea } from "@/lib/agents/agent-registry";

interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  founderProfile: FounderProfile;
  updateFounderProfile: (updates: Partial<FounderProfile>) => void;
  selectedAgent: AIAgent;
  setSelectedAgent: (agent: AIAgent) => void;
  messages: AgentMessage[];
  sendMessage: (text: string, targetAgentId?: string) => Promise<void>;
  scores: StartupScores;
  recalculateScores: () => void;
  roadmapTasks: RoadmapTask[];
  toggleTaskStatus: (taskId: string) => void;
  documents: GeneratedDocument[];
  addDocument: (doc: GeneratedDocument) => void;
  isThinking: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DEFAULT_PROFILE: FounderProfile = {
  id: "fp_01",
  name: "Alex Vance",
  country: "US",
  industry: "B2B SaaS / Artificial Intelligence",
  startupName: "Isaac.AI",
  tagline: "The AI Co-Founder Every Founder Deserves",
  problem: "First-time entrepreneurs waste months and tens of thousands of dollars navigating incorporation, pitch decks, product specs, legal documents, and GTM strategy without structured guidance.",
  solution: "An autonomous multi-agent operating system that guides founders step-by-step with zero sugarcoating, automated document generation, and continuous risk assessment.",
  targetAudience: "First-time founders, solopreneurs, incubators, tech workers launching side projects.",
  competitors: ["Stripe Atlas", "Clerky", "ChatGPT", "Linear", "YC Startup School"],
  businessModel: "Freemium Subscription ($49/mo Pro, $199/mo Business)",
  pricing: "$49/mo",
  fundingStage: "Pre-Seed",
  budget: "$15,000",
  teamSize: 2,
  prototypeStatus: "MVP Ready",
  currentRevenue: "$0 (Pre-revenue)",
  goals: ["Reach 100 paying founders in 90 days", "Raise $500k Pre-Seed round"],
  painPoints: ["Legal compliance confusion across regions", "Lack of technical co-founder for architecture"],
  timeline: "Launch MVP in 30 days",
  differentiation: "Specialized C-suite multi-agent orchestration working in parallel instead of a simple chat prompt."
};

const INITIAL_ROADMAP: RoadmapTask[] = [
  { id: "t1", timeline: "7 Day", title: "Incorporate Delaware C-Corp via Stripe Atlas", description: "Submit incorporation forms and secure US EIN number.", assignedAgent: "Legal Counsel & CA", priority: "High", status: "Completed", estimatedHours: 4 },
  { id: "t2", timeline: "7 Day", title: "Conduct 15 Customer Discovery Interviews", description: "Interview target founders to validate top 3 pain points.", assignedAgent: "Market Analyst", priority: "High", status: "Completed", estimatedHours: 12 },
  { id: "t3", timeline: "30 Day", title: "Finalize PRD & DB Schema for MVP", description: "Define exact core APIs and Next.js + PostgreSQL schema.", assignedAgent: "CTO & Architect", priority: "High", status: "In Progress", estimatedHours: 16 },
  { id: "t4", timeline: "30 Day", title: "Launch Landing Page & Waitlist", description: "Setup high-converting glassmorphic landing page with lead magnet.", assignedAgent: "CMO & Growth Lead", priority: "High", status: "In Progress", estimatedHours: 10 },
  { id: "t5", timeline: "60 Day", title: "Release Beta to First 50 Solopreneurs", description: "Gather qualitative feedback and track 7-day retention.", assignedAgent: "CPO / PM", priority: "Medium", status: "Pending", estimatedHours: 40 },
  { id: "t6", timeline: "90 Day", title: "Apply to Y Combinator / Techstars", description: "Prepare VC-proof pitch deck and video submission.", assignedAgent: "VC & Angel Advisor", priority: "Medium", status: "Pending", estimatedHours: 20 }
];

const INITIAL_DOCUMENTS: GeneratedDocument[] = [
  {
    id: "doc_01",
    title: "Isaac.AI — 10-Slide Pitch Deck Executive Summary",
    category: "Strategy",
    type: "Pitch Deck",
    createdAt: "2026-07-24",
    status: "Reviewed",
    content: `# ISAAC.AI — Pitch Deck Executive Summary

## Slide 1: Title & Tagline
**Isaac.AI** — The AI Co-Founder Every Founder Deserves.

## Slide 2: The Problem
First-time founders face a 90% failure rate due to execution errors, expensive legal mistakes ($5k+ for simple incorporation), lack of C-suite guidance, and sugarcoated feedback from friends.

## Slide 3: The Solution
Isaac.AI provides an autonomous AI Operating System with 25+ specialized C-suite agents (CTO, CFO, Legal Counsel, CMO, VC Griller) working in parallel to validate, build, register, and scale companies.

## Slide 4: Market Opportunity (TAM/SAM/SOM)
- **TAM**: $45B Global Startup Services & Incubation Market
- **SAM**: $8.2B B2B SaaS Solopreneur & Micro-SMB market
- **SOM**: $420M initial focus on US/UK/India AI-first tech founders

## Slide 5: Business Model
- **Free Tier**: Basic idea score & single-agent chat
- **Pro ($49/mo)**: Unlimited multi-agent orchestration, full document studio, registration assistant
- **Business ($199/mo)**: Dedicated VC matchmaker, team access, priority LLM engine`
  }
];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "usr_01",
    name: "Alex Vance",
    email: "alex@isaacai.io",
    role: "Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    subscriptionPlan: "Pro",
    createdAt: "2026-07-01"
  });

  const [founderProfile, setFounderProfile] = useState<FounderProfile>(DEFAULT_PROFILE);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(AI_AGENTS[0]);
  const [scores, setScores] = useState<StartupScores>(() => analyzeStartupIdea(DEFAULT_PROFILE));
  const [roadmapTasks, setRoadmapTasks] = useState<RoadmapTask[]>(INITIAL_ROADMAP);
  const [documents, setDocuments] = useState<GeneratedDocument[]>(INITIAL_DOCUMENTS);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("landing");

  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "m1",
      sender: "orchestrator",
      senderName: "Master Orchestrator",
      avatar: "🤖",
      content: "Welcome back, Alex. I've synced memory across all 25 C-suite agents. Isaac.AI currently holds a **84/100 Startup Readiness Index**. What core milestone would you like to execute today?",
      timestamp: "Just now",
      reasoning: [
        "Analyzed latest founder profile updates",
        "Queried persistent memory store for active startup context",
        "Identified top priority: Next.js MVP DB Schema & Pitch Deck validation"
      ],
      suggestedActions: [
        "Audit Pitch Deck with VC Agent",
        "Generate Delaware vs India Legal Comparison",
        "Review 30-Day Technical Sprint Roadmap"
      ]
    }
  ]);

  const updateFounderProfile = (updates: Partial<FounderProfile>) => {
    setFounderProfile((prev) => {
      const next = { ...prev, ...updates };
      setScores(analyzeStartupIdea(next));
      return next;
    });
  };

  const recalculateScores = () => {
    setScores(analyzeStartupIdea(founderProfile));
  };

  const toggleTaskStatus = (taskId: string) => {
    setRoadmapTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: t.status === "Completed" ? "In Progress" : "Completed" } : t))
    );
  };

  const addDocument = (doc: GeneratedDocument) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const sendMessage = async (text: string, targetAgentId?: string) => {
    const userMsg: AgentMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      senderName: user?.name || "Founder",
      avatar: user?.avatar || "👤",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    const activeAgent = AI_AGENTS.find((a) => a.id === targetAgentId) || selectedAgent;

    setTimeout(() => {
      let replyContent = "";
      let reasoning: string[] = [];

      if (activeAgent.id === "devils_advocate") {
        replyContent = `**Devil's Advocate Direct Reality Check:**\n1. You claim your target audience is solopreneurs, but charging $49/mo without demonstrating immediate ROI within 7 days will result in high churn.\n2. Have you accounted for API rate limits and token cost spikes during multi-agent loops?\n3. **Recommendation:** Offer a 14-day free trial locked to 3 document generations to convert users upfront.`;
        reasoning = ["Stress-tested pricing elasticity", "Evaluated unit economics of API token consumption"];
      } else if (activeAgent.id === "cto_architect") {
        replyContent = `**CTO Technical Directive:**\nFor Isaac.AI's MVP, we recommend **Next.js 14 (App Router) + PostgreSQL (Prisma) + Redis (Upstash for Rate Limiting) + Vercel AI SDK**. Keep agent execution async with Server Actions to avoid server timeouts.`;
        reasoning = ["Evaluated framework latency", "Selected zero-cold-start database provider"];
      } else if (activeAgent.id === "legal_advisor") {
        replyContent = `**Legal & Compliance Advice:**\nIf you plan to raise US venture capital, incorporate as a **Delaware C-Corp**. Ensure all founders sign a 4-year vesting schedule with a 1-year cliff and complete 83(b) tax elections within 30 days of stock issuance.`;
        reasoning = ["Checked US VC standard legal requirements", "Identified 83(b) deadline risk"];
      } else {
        replyContent = `**${activeAgent.name} Analysis:**\nI have evaluated "${text}" against our startup profile for **${founderProfile.startupName}**. We should align this directly with our ${founderProfile.timeline} goal. I recommend disassembling this into 3 actionable sprint items on your roadmap.`;
        reasoning = ["Cross-referenced persistent memory", "Aligned directive with 90-day growth KPI"];
      }

      const agentMsg: AgentMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: activeAgent.id,
        senderName: activeAgent.name,
        avatar: activeAgent.avatar,
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reasoning
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        founderProfile,
        updateFounderProfile,
        selectedAgent,
        setSelectedAgent,
        messages,
        sendMessage,
        scores,
        recalculateScores,
        roadmapTasks,
        toggleTaskStatus,
        documents,
        addDocument,
        isThinking,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
