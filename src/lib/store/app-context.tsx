"use client";

import React, { createContext, useContext, useState } from "react";
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

const EMPTY_PROFILE: FounderProfile = {
  id: "fp_01",
  name: "",
  country: "",
  industry: "",
  startupName: "",
  tagline: "",
  problem: "",
  solution: "",
  targetAudience: "",
  competitors: [],
  businessModel: "",
  pricing: "",
  fundingStage: "Idea",
  budget: "",
  teamSize: 1,
  prototypeStatus: "Concept",
  currentRevenue: "",
  goals: [],
  painPoints: [],
  timeline: "",
  differentiation: ""
};

const INITIAL_ROADMAP: RoadmapTask[] = [];
const INITIAL_DOCUMENTS: GeneratedDocument[] = [];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [founderProfile, setFounderProfile] = useState<FounderProfile>(EMPTY_PROFILE);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(AI_AGENTS[0]); // Orchestrator
  const [scores, setScores] = useState<StartupScores>(() => analyzeStartupIdea(EMPTY_PROFILE));
  const [roadmapTasks, setRoadmapTasks] = useState<RoadmapTask[]>(INITIAL_ROADMAP);
  const [documents, setDocuments] = useState<GeneratedDocument[]>(INITIAL_DOCUMENTS);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("landing");

  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "m_init",
      sender: "orchestrator",
      senderName: "Isaac",
      avatar: "🤖",
      content: "Hey there. I'm Isaac, your AI Co-Founder. Before we generate your dashboards and roadmaps, let's validate your startup idea. \n\nFirst, what specific problem are you trying to solve?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

    setTimeout(() => {
      let replyContent = "";
      let reasoning: string[] = [];
      let action: "login" | undefined;
      
      // Onboarding conversational flow (if on onboarding tab)
      if (activeTab === "onboarding") {
        const userMsgCount = messages.filter(m => m.sender === "user").length + 1;
        
        if (userMsgCount === 1) {
          updateFounderProfile({ problem: text });
          replyContent = "Got it. That's a solid problem space. Now, how are you solving it? What is your solution or product?";
          reasoning = ["Extracted 'problem' from response.", "Moving to 'solution' extraction."];
        } else if (userMsgCount === 2) {
          updateFounderProfile({ solution: text });
          replyContent = "Interesting approach. Who exactly is your target audience? Be as specific as possible (e.g., B2B SaaS founders, Gen-Z creators).";
          reasoning = ["Extracted 'solution' from response.", "Moving to 'targetAudience' extraction."];
        } else if (userMsgCount === 3) {
          updateFounderProfile({ targetAudience: text });
          replyContent = "Makes sense. How do you plan to make money? What is your business or revenue model?";
          reasoning = ["Extracted 'targetAudience' from response.", "Moving to 'businessModel' extraction."];
        } else if (userMsgCount === 4) {
          updateFounderProfile({ businessModel: text, startupName: "My Awesome Startup" });
          replyContent = "You're making great progress. I have enough context to run a preliminary analysis and generate your personalized Founder Dashboard, roadmaps, and SWOT analysis.\n\nLet's generate your Dashboard.";
          reasoning = ["Extracted 'businessModel' from response.", "Sufficient profile data gathered.", "Triggering dashboard generation."];
          action = "login"; // Reusing "login" action flag for now, handled as GoToDashboard by the component
        } else {
          replyContent = "Ready to proceed to your dashboard.";
          action = "login";
        }
      } else {
        // Dashboard / Logged-in experience
        const activeAgent = AI_AGENTS.find((a) => a.id === targetAgentId) || selectedAgent;
        if (activeAgent.id === "devils_advocate") {
          replyContent = `**Devil's Advocate Direct Reality Check:**\n1. You claim your target audience is ${founderProfile.targetAudience || 'broad'}, but charging ${founderProfile.pricing || 'without proving ROI'} will result in high churn.\n2. Have you accounted for API rate limits and token cost spikes during multi-agent loops?\n3. **Recommendation:** Offer a 14-day free trial locked to 3 document generations to convert users upfront.`;
          reasoning = ["Stress-tested pricing elasticity", "Evaluated unit economics of API token consumption"];
        } else if (activeAgent.id === "cto_architect") {
          replyContent = `**CTO Technical Directive:**\nFor our MVP, we recommend **Next.js 14 (App Router) + PostgreSQL (Prisma) + Redis (Upstash for Rate Limiting) + Vercel AI SDK**. Keep agent execution async with Server Actions to avoid server timeouts.`;
          reasoning = ["Evaluated framework latency", "Selected zero-cold-start database provider"];
        } else if (activeAgent.id === "legal_advisor") {
          replyContent = `**Legal & Compliance Advice:**\nIf you plan to raise US venture capital, incorporate as a **Delaware C-Corp**. Ensure all founders sign a 4-year vesting schedule with a 1-year cliff and complete 83(b) tax elections within 30 days of stock issuance.`;
          reasoning = ["Checked US VC standard legal requirements", "Identified 83(b) deadline risk"];
        } else {
          replyContent = `**${activeAgent.name} Analysis:**\nI have evaluated "${text}" against our startup profile. I recommend disassembling this into actionable sprint items on your roadmap.`;
          reasoning = ["Cross-referenced persistent memory", "Aligned directive with growth KPI"];
        }
      }

      const agentMsg: AgentMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: (!user) ? "orchestrator" : (targetAgentId || selectedAgent.id),
        senderName: (!user) ? "Isaac" : (AI_AGENTS.find((a) => a.id === targetAgentId)?.name || selectedAgent.name),
        avatar: (!user) ? "🤖" : (AI_AGENTS.find((a) => a.id === targetAgentId)?.avatar || selectedAgent.avatar),
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reasoning,
        action
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
