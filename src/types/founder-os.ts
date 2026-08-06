import { FounderProfile, StartupScores, RoadmapTask } from "@/types";

export type StageId = 
  | "overview"
  | "idea-validation"
  | "resources"
  | "documents"
  | "grants"
  | "investors"
  | "performance"
  | "settings";

export type StageStatus = "not_started" | "in_progress" | "completed" | "needs_review";

export interface FounderOSNode {
  id: StageId;
  title: string;
  subtitle: string;
  status: StageStatus;
  completionPercentage: number;
  assignedAgent: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  dependencies: StageId[];
  lastUpdated: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface LeanCanvas {
  problem: string[];
  solution: string[];
  uniqueValueProposition: string;
  unfairAdvantage: string;
  customerSegments: string[];
  keyMetrics: string[];
  channels: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface ICPProfile {
  title: string;
  targetIndustry: string;
  companySize: string;
  decisionMaker: string;
  budgetRange: string;
  painPoints: string[];
  buyingTrigger: string;
}

export interface IdeaValidationData {
  ideaName: string;
  tagline: string;
  ideaScore: number;
  executionScore: number;
  investmentReadiness: number;
  marketValidation: string;
  competitorAnalysis: string[];
  riskAnalysis: {
    technical: string;
    market: string;
    legal: string;
    financial: string;
  };
  swot: SwotAnalysis;
  leanCanvas: LeanCanvas;
  icp: ICPProfile;
  activeMode: "brainstorm" | "challenge" | "vc_review" | "customer";
}

export type ResourceCategory =
  | "Domain & Web"
  | "Branding & Design"
  | "Hosting & Cloud"
  | "Payments & Billing"
  | "CRM & Sales"
  | "Analytics & Data"
  | "Project Management"
  | "AI & Automation"
  | "Legal & Compliance"
  | "Hiring & HR";

export interface ResourceOption {
  id: string;
  name: string;
  tier: "Free" | "Freemium" | "Paid";
  pricing: string;
  difficulty: "Easy" | "Moderate" | "Advanced";
  timeRequired: string;
  pros: string[];
  cons: string[];
  officialUrl: string;
  aiFitScore: number;
  recommendationReason: string;
  isBookmarked?: boolean;
  isCompleted?: boolean;
}

export interface ResourceCategoryGroup {
  category: ResourceCategory;
  description: string;
  items: ResourceOption[];
}

export type DocUrgency = "Urgent" | "Important" | "Optional";
export type DocStatus = "Not Started" | "Drafting" | "Submitted" | "Approved";

export interface ComplianceDoc {
  id: string;
  title: string;
  category: "Tax & Legal" | "Incorporation" | "Intellectual Property" | "Labor & HR" | "Commercial";
  urgency: DocUrgency;
  status: DocStatus;
  purpose: string;
  eligibility: string;
  governmentFees: string;
  estimatedTimeline: string;
  requiredDocuments: string[];
  officialPortalUrl: string;
  freeProcess: string;
  paidProcess: string;
  steps: string[];
  uploadedFiles?: { name: string; url: string; size: string }[];
}

export interface GrantScheme {
  id: string;
  title: string;
  provider: string; // e.g. "Startup India", "NSF", "State Govt"
  country: string;
  state?: string;
  category: "Central" | "State" | "Women Founders" | "Tech Innovation" | "Manufacturing" | "Student";
  fundingAmount: string;
  deadline: string;
  eligibility: string[];
  benefits: string[];
  officialUrl: string;
  aiFitScore: number;
  matchReasons: string[];
  isBookmarked?: boolean;
}

export interface InvestorProfile {
  id: string;
  name: string;
  title?: string;
  type: "Angel Investor" | "VC Fund" | "Accelerator" | "Incubator" | "Pitch Competition";
  checkSize: string;
  targetStages: ("Pre-Seed" | "Seed" | "Series A")[];
  industries: string[];
  portfolioHighlights: string[];
  location: string;
  officialUrl: string;
  aiFitScore: number;
  pitchAdvice: string;
  outreachStatus: "Interested" | "Contacted" | "Pitch Scheduled" | "Passed" | "Term Sheet";
}

export interface MonthlyPerformanceRecord {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  mrr: number;
  arr: number;
  customers: number;
  cac: number;
  ltv: number;
  burnRate: number;
}

export interface BusinessMetrics {
  businessName: string;
  industry: string;
  foundedYear: number;
  currentRevenue: number;
  mrr: number;
  arr: number;
  profitMargin: number;
  monthlyExpenses: number;
  totalCustomers: number;
  employees: number;
  monthlyBurnRate: number;
  marketingSpend: number;
  cac: number;
  ltv: number;
  retentionRate: number;
  websiteTraffic: number;
  monthlyLeads: number;
  conversionRate: number;
  cashRunwayMonths: number;
  history: MonthlyPerformanceRecord[];
}

export interface FinancialForecast {
  nextMonthRevenue: number;
  nextQuarterRevenue: number;
  cashRunwayMonths: number;
  hiringCapacity: number;
  fundingNeeded: number;
}

export interface RiskAlert {
  id: string;
  type: "critical" | "warning" | "opportunity";
  title: string;
  description: string;
  actionItem: string;
  affectedMetric: string;
}

export interface FounderOSNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "ai_insight" | "deadline" | "task" | "compliance";
  actionUrl?: string;
}
