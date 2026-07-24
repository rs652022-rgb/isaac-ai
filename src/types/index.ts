export type Role = "Founder" | "Team" | "Admin" | "Investor" | "Advisor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  subscriptionPlan: "Free" | "Pro" | "Business" | "Enterprise";
  createdAt: string;
}

export interface FounderProfile {
  id: string;
  name: string;
  country: string;
  industry: string;
  startupName: string;
  tagline: string;
  problem: string;
  solution: string;
  targetAudience: string;
  competitors: string[];
  businessModel: string;
  pricing: string;
  fundingStage: "Idea" | "Pre-Seed" | "Seed" | "Series A" | "Bootstrapped";
  budget: string;
  teamSize: number;
  prototypeStatus: "Concept" | "Wireframe" | "MVP Ready" | "Live Users";
  currentRevenue: string;
  goals: string[];
  painPoints: string[];
  timeline: string;
  differentiation: string;
}

export type AgentCategory =
  | "Strategy"
  | "Tech & Product"
  | "Finance & Legal"
  | "Marketing & Sales"
  | "Operations & HR"
  | "Funding & Grants"
  | "Research & Memory";

export interface AIAgent {
  id: string;
  name: string;
  title: string;
  category: AgentCategory;
  avatar: string;
  icon: string;
  color: string;
  systemPrompt: string;
  responsibilities: string[];
  tools: string[];
  status: "idle" | "thinking" | "executing" | "completed";
}

export interface AgentMessage {
  id: string;
  sender: "user" | "orchestrator" | string; // agent id
  senderName: string;
  avatar?: string;
  content: string;
  timestamp: string;
  reasoning?: string[];
  suggestedActions?: string[];
  artifacts?: {
    type: "score" | "document" | "roadmap" | "code" | "chart" | "checklist";
    title: string;
    data: any;
  }[];
}

export interface StartupScores {
  overallScore: number;
  ideaScore: number;
  founderScore: number;
  executionScore: number;
  marketScore: number;
  riskScore: number; // lower is better (0-100 risk)
  scalabilityScore: number;
  fundingPotential: number;
  startupReadiness: number;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  pestle: {
    political: string;
    economic: string;
    social: string;
    technological: string;
    legal: string;
    environmental: string;
  };
  portersFive: {
    competitiveRivalry: string;
    supplierPower: string;
    buyerPower: string;
    threatOfSubstitutes: string;
    threatOfNewEntrants: string;
  };
  verdict: string; // Sugarcoat-free assessment
}

export interface RoadmapTask {
  id: string;
  timeline: "7 Day" | "30 Day" | "60 Day" | "90 Day" | "6 Month" | "12 Month" | "24 Month";
  title: string;
  description: string;
  assignedAgent: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  dependencies?: string[];
  estimatedHours: number;
}

export interface IncorporationOption {
  type: "DIY" | "Government Portal" | "Chartered Accountant" | "Law Firm" | "Online Service";
  name: string;
  costEstimate: string;
  timelineEstimate: string;
  complianceLevel: "High" | "Medium" | "Basic";
  advantages: string[];
  disadvantages: string[];
  officialLinks: { label: string; url: string }[];
  documentChecklist: string[];
}

export interface GeneratedDocument {
  id: string;
  title: string;
  category: "Legal" | "Product" | "Finance" | "Strategy" | "HR";
  type: "Pitch Deck" | "Business Plan" | "PRD" | "Founder Agreement" | "NDA" | "ESOP" | "Financial Model" | "Cap Table";
  createdAt: string;
  content: string;
  status: "Draft" | "Reviewed" | "Final";
}

export interface TechArchitecture {
  framework: string;
  database: string;
  hosting: string;
  authProvider: string;
  aiProviders: string[];
  schemaSnippet: string;
  apiEndpoints: { method: string; path: string; description: string }[];
  sprintTasks: { sprint: number; title: string; desc: string }[];
}
