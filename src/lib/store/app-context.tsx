"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, FounderProfile, AgentMessage, AIAgent, StartupScores, RoadmapTask, GeneratedDocument, Role } from "@/types";
import { AI_AGENTS, analyzeStartupIdea } from "@/lib/agents/agent-registry";
import { useSession } from "next-auth/react";

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
  activeConversationId: string | null;
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
  const { data: session } = useSession();
  const sessionUser = session?.user;

  // Map NextAuth user to App User type
  const user: User | null = sessionUser ? {
    id: sessionUser.id || "",
    name: sessionUser.name || "Founder",
    email: sessionUser.email || "",
    role: (sessionUser.role as Role) || "Founder",
    avatar: sessionUser.image || "👤",
    subscriptionPlan: (sessionUser.subscriptionPlan as "Free" | "Pro" | "Business" | "Enterprise") || "Pro",
    createdAt: new Date().toISOString()
  } : null;

  const setUser = () => {};

  const [founderProfile, setFounderProfile] = useState<FounderProfile>(EMPTY_PROFILE);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(AI_AGENTS[0]); // Orchestrator
  const [scores, setScores] = useState<StartupScores>(() => analyzeStartupIdea(EMPTY_PROFILE));
  const [roadmapTasks, setRoadmapTasks] = useState<RoadmapTask[]>(INITIAL_ROADMAP);
  const [documents, setDocuments] = useState<GeneratedDocument[]>(INITIAL_DOCUMENTS);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "m_init",
      sender: "orchestrator",
      senderName: "Isaac",
      avatar: "🤖",
      content: "Hey there! I'm Isaac, your AI Co-Founder. Before we generate your dashboards and roadmaps, let's validate your startup idea.\n\nFirst, what specific problem are you trying to solve?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);

  // Requirement 9: Load previous conversation history from Supabase on mount / agent switch
  useEffect(() => {
    let isMounted = true;
    async function loadHistory() {
      try {
        const res = await fetch(`/api/chat/history?agentId=${selectedAgent.id}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.messages && data.messages.length > 0) {
          setMessages(data.messages);
          if (data.conversationId) {
            setActiveConversationId(data.conversationId);
          }
        }
      } catch (err) {
        console.warn("[App Context] Failed to fetch past conversation history:", err);
      }
    }
    loadHistory();
    return () => {
      isMounted = false;
    };
  }, [selectedAgent.id]);

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
    const activeAgentId = targetAgentId || selectedAgent.id;
    const activeAgent = AI_AGENTS.find((a) => a.id === activeAgentId) || selectedAgent;

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

    // Update founder profile during conversational onboarding
    if (typeof window !== "undefined" && window.location.pathname === "/onboarding") {
      const userMsgCount = messages.filter((m) => m.sender === "user").length + 1;
      if (userMsgCount === 1) updateFounderProfile({ problem: text });
      else if (userMsgCount === 2) updateFounderProfile({ solution: text });
      else if (userMsgCount === 3) updateFounderProfile({ targetAudience: text });
      else if (userMsgCount === 4) updateFounderProfile({ businessModel: text, startupName: "My Startup" });
    }

    const assistantMsgId = `msg_${Date.now() + 1}`;
    const assistantMsg: AgentMessage = {
      id: assistantMsgId,
      sender: activeAgent.id,
      senderName: activeAgent.name,
      avatar: activeAgent.avatar,
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          conversationId: activeConversationId || undefined,
          agentId: activeAgentId,
        }),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.error || `Server responded with status ${res.status}`);
      }

      const returnedConvId = res.headers.get("X-Conversation-Id");
      if (returnedConvId) {
        setActiveConversationId(returnedConvId);
      }

      if (!res.body) {
        throw new Error("No response stream body received.");
      }

      // Add placeholder assistant message and stop thinking indicator
      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsgId ? { ...m, content: accumulatedText } : m))
        );
      }
    } catch (err: any) {
      console.error("[sendMessage API Error]", err);
      setIsThinking(false);

      const fallbackText = err.message?.includes("OPENROUTER_API_KEY")
        ? `⚠️ **OpenRouter API Key Missing:** Please add \`OPENROUTER_API_KEY\` to your \`.env\` file to enable real AI assistant responses.`
        : `⚠️ **AI Co-Founder Service Alert:** ${err.message || "Failed to stream response from AI model. Please try again."}`;

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== assistantMsgId),
        {
          id: `err_${Date.now()}`,
          sender: activeAgent.id,
          senderName: activeAgent.name,
          avatar: "⚠️",
          content: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
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
        activeConversationId
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
