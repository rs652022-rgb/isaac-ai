"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { User, FounderProfile, AgentMessage, AIAgent, StartupScores, RoadmapTask, GeneratedDocument, Role } from "@/types";
import { AI_AGENTS, analyzeStartupIdea } from "@/lib/agents/agent-registry";
import { useSession } from "next-auth/react";
import { logBrowserStep, logBrowserError } from "@/lib/ai/logger";
import { graphStore } from "@/lib/graph/graph-memory";

interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  founderProfile: FounderProfile;
  updateFounderProfile: (updates: Partial<FounderProfile>) => void;
  isOnboardingCompleted: boolean;
  setIsOnboardingCompleted: (completed: boolean) => void;
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
  name: "Founder",
  country: "United States",
  industry: "B2B AI Software",
  startupName: "Isaac AI Inc.",
  tagline: "Autonomous AI Founder Operating System",
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
  } : {
    id: "guest_founder",
    name: "Guest Founder",
    email: "founder@isaac.ai",
    role: "Founder",
    avatar: "👤",
    subscriptionPlan: "Pro",
    createdAt: new Date().toISOString()
  };

  const setUser = () => {};

  const [founderProfile, setFounderProfile] = useState<FounderProfile>(EMPTY_PROFILE);
  const [isOnboardingCompleted, setIsOnboardingCompletedState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isaac_onboarding_completed") === "true";
    }
    return false;
  });

  const setIsOnboardingCompleted = (completed: boolean) => {
    setIsOnboardingCompletedState(completed);
    if (typeof window !== "undefined") {
      localStorage.setItem("isaac_onboarding_completed", completed ? "true" : "false");
    }
  };

  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(AI_AGENTS[0]); // Orchestrator
  const [scores, setScores] = useState<StartupScores>(() => analyzeStartupIdea(EMPTY_PROFILE));
  const [roadmapTasks, setRoadmapTasks] = useState<RoadmapTask[]>(INITIAL_ROADMAP);
  const [documents, setDocuments] = useState<GeneratedDocument[]>(INITIAL_DOCUMENTS);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

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

  // Load previous conversation history from Supabase safely
  useEffect(() => {
    let isMounted = true;
    async function loadHistory() {
      try {
        logBrowserStep("init", `Fetching chat history for agent "${selectedAgent.id}"...`);
        const res = await fetch(`/api/chat/history?agentId=${selectedAgent.id}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.messages && data.messages.length > 0) {
          setMessages(data.messages);
          if (data.conversationId) {
            setActiveConversationId(data.conversationId);
          }
          logBrowserStep("init", `Loaded ${data.messages.length} historical messages from Supabase.`);
        }
      } catch (err) {
        logBrowserError("init", "Failed to fetch past conversation history", err);
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
    if (!text || !text.trim() || isThinking) {
      logBrowserStep("send_blocked", "Prevented duplicate submission while thinking.");
      return;
    }

    // Cancel any pending fetch request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const activeAgentId = targetAgentId || selectedAgent.id;
    const activeAgent = AI_AGENTS.find((a) => a.id === activeAgentId) || selectedAgent;

    const clientReqId = `ui_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const startTime = Date.now();

    const userMsg: AgentMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      senderName: user?.name || "Founder",
      avatar: user?.avatar || "👤",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    logBrowserStep(clientReqId, `Request sent to /api/chat (Agent: ${activeAgentId}, Len: ${text.length})`);

    // Ingest into Central Founder Memory Graph
    try {
      graphStore.ingestChatText(text.trim(), founderProfile);
    } catch (ingestErr) {
      logBrowserError(clientReqId, "Graph Store Ingest Warning", ingestErr);
    }

    // Update founder profile during conversational onboarding
    if (typeof window !== "undefined" && window.location.pathname === "/onboarding") {
      const userMsgCount = messages.filter((m) => m.sender === "user").length + 1;
      if (userMsgCount === 1) updateFounderProfile({ problem: text });
      else if (userMsgCount === 2) updateFounderProfile({ solution: text });
      else if (userMsgCount === 3) updateFounderProfile({ targetAudience: text });
      else if (userMsgCount === 4) updateFounderProfile({ businessModel: text, startupName: "My Startup" });
    }

    const assistantMsgId = `msg_${Date.now() + 1}`;
    let hasCreatedAssistantMessage = false;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": clientReqId,
        },
        body: JSON.stringify({
          content: text.trim(),
          conversationId: activeConversationId || undefined,
          agentId: activeAgentId,
          profile: founderProfile,
        }),
        signal: controller.signal,
      });

      const serverReqId = res.headers.get("X-Request-Id") || clientReqId;
      logBrowserStep(serverReqId, `Response received (HTTP ${res.status} OK)`);

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.error || `Server responded with status ${res.status}`);
      }

      const returnedConvId = res.headers.get("X-Conversation-Id");
      if (returnedConvId) {
        setActiveConversationId(returnedConvId);
      }

      if (!res.body) {
        throw new Error("No response stream body received from chat endpoint.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          accumulatedText += chunk;

          if (!hasCreatedAssistantMessage) {
            // First chunk received! Log streaming started, create message bubble, and stop thinking indicator
            hasCreatedAssistantMessage = true;
            setIsThinking(false);
            logBrowserStep(serverReqId, "Streaming started (First text chunk received)");

            const assistantMsg: AgentMessage = {
              id: assistantMsgId,
              sender: activeAgent.id,
              senderName: activeAgent.name,
              avatar: activeAgent.avatar,
              content: accumulatedText,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isStreaming: true,
            };

            setMessages((prev) => [...prev, assistantMsg]);
            logBrowserStep(serverReqId, "UI updated with initial assistant message container.");
          } else {
            // Stream chunks into assistant message content
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantMsgId ? { ...m, content: accumulatedText } : m))
            );
          }
        }
      }

      setIsThinking(false);
      const totalTimeMs = Date.now() - startTime;

      if (!accumulatedText.trim()) {
        logBrowserError(serverReqId, "Stream completed with 0 text content", "Rendering friendly fallback message.");
        const fallbackText = "I'm sorry, I couldn't generate a response right now. Please try again.";
        if (hasCreatedAssistantMessage) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsgId ? { ...m, content: fallbackText, isStreaming: false } : m))
          );
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: assistantMsgId,
              sender: activeAgent.id,
              senderName: activeAgent.name,
              avatar: activeAgent.avatar,
              content: fallbackText,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isStreaming: false,
            },
          ]);
        }
      } else {
        logBrowserStep(serverReqId, `Streaming completed & UI updated (${accumulatedText.length} chars in ${totalTimeMs}ms)`);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsgId ? { ...m, isStreaming: false } : m))
        );
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        logBrowserStep(clientReqId, "Fetch request aborted by new user action.");
        return;
      }

      logBrowserError(clientReqId, "Chat API Request Exception", err);
      setIsThinking(false);

      const errorMessage = err.message || "Failed to communicate with AI Assistant service.";
      const friendlyText = errorMessage.includes("OPENROUTER_API_KEY")
        ? `⚠️ **OpenRouter Key Missing:** Please add \`OPENROUTER_API_KEY\` to your \`.env\` file to enable real AI assistant responses.`
        : `⚠️ **AI Co-Founder Service Alert:** ${errorMessage}`;

      if (hasCreatedAssistantMessage) {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsgId ? { ...m, content: `${m.content}\n\n${friendlyText}`, isStreaming: false } : m))
        );
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            sender: activeAgent.id,
            senderName: activeAgent.name,
            avatar: "⚠️",
            content: friendlyText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isStreaming: false,
          },
        ]);
      }
    } finally {
      abortControllerRef.current = null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        founderProfile,
        updateFounderProfile,
        isOnboardingCompleted,
        setIsOnboardingCompleted,
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
