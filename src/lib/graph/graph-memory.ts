import { useState, useEffect } from "react";
import {
  StageId,
  FounderOSNode,
  IdeaValidationData,
  ResourceCategoryGroup,
  ComplianceDoc,
  GrantScheme,
  InvestorProfile,
  BusinessMetrics,
  RiskAlert,
  FounderOSNotification,
} from "@/types/founder-os";

export const INITIAL_NODES: FounderOSNode[] = [
  {
    id: "overview",
    title: "Dashboard Overview",
    subtitle: "Central Control Room & Startup Health",
    status: "in_progress",
    completionPercentage: 68,
    assignedAgent: {
      id: "orchestrator",
      name: "Isaac",
      avatar: "🤖",
      role: "Lead AI Co-Founder",
    },
    dependencies: [],
    lastUpdated: "Just now",
  },
  {
    id: "idea-validation",
    title: "Stage 1: Idea Validation",
    subtitle: "YC Partner Audit, Lean Canvas & SWOT",
    status: "in_progress",
    completionPercentage: 85,
    assignedAgent: {
      id: "founder_strategist",
      name: "Strategy AI",
      avatar: "🎯",
      role: "YC Partner & Business Strategist",
    },
    dependencies: [],
    lastUpdated: "10 mins ago",
  },
  {
    id: "resources",
    title: "Stage 2: Business Resources",
    subtitle: "Domain, Tech Stack, Hosting & Billing Tools",
    status: "in_progress",
    completionPercentage: 60,
    assignedAgent: {
      id: "tech_architect",
      name: "Infra AI",
      avatar: "💻",
      role: "Infrastructure Expert",
    },
    dependencies: ["idea-validation"],
    lastUpdated: "1 hour ago",
  },
  {
    id: "documents",
    title: "Stage 3: Business Documentation",
    subtitle: "Incorporation, GST, Founder Agreements & NDAs",
    status: "in_progress",
    completionPercentage: 45,
    assignedAgent: {
      id: "legal_advisor",
      name: "Legal AI",
      avatar: "⚖️",
      role: "Corporate Counsel",
    },
    dependencies: ["idea-validation"],
    lastUpdated: "2 hours ago",
  },
  {
    id: "grants",
    title: "Stage 4: Government Grants",
    subtitle: "Startup India, Subsidies & Tax Exemptions",
    status: "needs_review",
    completionPercentage: 30,
    assignedAgent: {
      id: "grant_consultant",
      name: "Grants AI",
      avatar: "🏛️",
      role: "Government Schemes Officer",
    },
    dependencies: ["documents"],
    lastUpdated: "Yesterday",
  },
  {
    id: "investors",
    title: "Stage 5: Private Investors",
    subtitle: "Angel & VC Matching, Pitch Deck Griller",
    status: "not_started",
    completionPercentage: 20,
    assignedAgent: {
      id: "investor_agent",
      name: "Funding AI",
      avatar: "💸",
      role: "VC Partner",
    },
    dependencies: ["idea-validation", "documents"],
    lastUpdated: "3 days ago",
  },
  {
    id: "performance",
    title: "Stage 6: Performance Dashboard",
    subtitle: "MRR, ARR, CAC/LTV & Runway Forecast",
    status: "in_progress",
    completionPercentage: 72,
    assignedAgent: {
      id: "finance_analyst",
      name: "Metrics AI",
      avatar: "📈",
      role: "BI & Financial Analyst",
    },
    dependencies: [],
    lastUpdated: "Live",
  },
];

export const MOCK_IDEA_VALIDATION: IdeaValidationData = {
  ideaName: "Autonomous AI Co-Founder OS",
  tagline: "Empowering founders with 25+ parallel AI C-suite agents",
  ideaScore: 92,
  executionScore: 88,
  investmentReadiness: 84,
  marketValidation:
    "High TAM expansion potential. B2B SaaS founders & early solo-preneurs spend over $15K/yr on scattered legal, pitch deck, and financial advisory services. Isaac.AI consolidates all 6 stages into one real-time workspace.",
  competitorAnalysis: [
    "Traditional Accelerators (High cost, 7% equity take)",
    "Scattered Freelancers (Slow turnarounds, non-standardized outputs)",
    "Generic LLM Chatbots (Lack graph memory, stage context & structured KPIs)",
  ],
  riskAnalysis: {
    technical: "Low - Next.js App Router + OpenRouter Qwen 3 + Supabase graph schema provides sub-second latency.",
    market: "Medium - Customer retention depends on continuous execution tools beyond initial idea validation.",
    legal: "Low - Standardized state and federal compliance documentation templates.",
    financial: "Low - $0.05 average AI inference cost per founder session yields 85%+ gross margin.",
  },
  swot: {
    strengths: [
      "Modular 6-stage graph architecture with persistent founder context",
      "YC Partner challenge mode (refuses sugarcoating)",
      "Instant 1-click document generation and Recharts performance analytics",
    ],
    weaknesses: [
      "Requires active user data input for deep financial forecasting",
      "Brand recognition vs legacy accelerator networks",
    ],
    opportunities: [
      "Integration with Stripe, Razorpay & QuickBooks APIs",
      "White-label incubator version for startup hubs",
    ],
    threats: [
      "Commoditisation of simple wrapper chat apps (mitigated by deep graph memory)",
    ],
  },
  leanCanvas: {
    problem: [
      "Solo founders lack C-suite expertise across legal, finance & growth",
      "High agency fees for pitch decks & financial models",
      "Loss of context across disconnected SaaS tools",
    ],
    solution: [
      "25+ specialized AI agents connected via unified graph memory",
      "Automated document creation & live KPI performance tracking",
      "Stage-aware execution roadmaps",
    ],
    uniqueValueProposition:
      "The world's first autonomous AI Founder OS that remembers your entire business context and executes across all 6 startup stages.",
    unfairAdvantage: "Proprietary graph memory schema + multi-agent parallel orchestration engine.",
    customerSegments: ["Solo Founders", "Early-stage SaaS Teams", "Incubators & Accelerators"],
    keyMetrics: ["MRR", "Active Stages Completed", "Documents Generated", "Runway Extension (Months)"],
    channels: ["Product Hunt", "Twitter/X Builder Community", "Founder Communities", "SEO Content Hubs"],
    costStructure: ["OpenRouter AI API Token Inference", "Vercel / Cloud Infrastructure", "Stripe Payment Fees"],
    revenueStreams: ["Founder Pro Subscription ($49/mo)", "Business & Incubator Plan ($199/mo)"],
  },
  icp: {
    title: "Early-Stage Technical or Business Founder",
    targetIndustry: "B2B SaaS, AI Infrastructure, Consumer Tech",
    companySize: "1 - 5 Employees",
    decisionMaker: "CEO / Founder",
    budgetRange: "$50 - $500 / month",
    painPoints: [
      "Overwhelmed by legal compliance and Delaware incorporation",
      "Unsure how to model 3-year ARR/MRR financial projections for VCs",
      "Needs immediate feedback on product strategy without paying advisors",
    ],
    buyingTrigger: "Preparing for initial pre-seed/seed fundraise or launching MVP.",
  },
  activeMode: "challenge",
};

export const MOCK_RESOURCES: ResourceCategoryGroup[] = [
  {
    category: "Domain & Web",
    description: "Secure your brand name, domain Registrar, and DNS hosting",
    items: [
      {
        id: "res_namecheap",
        name: "Namecheap / Cloudflare Registrar",
        tier: "Paid",
        pricing: "$9.99 / year",
        difficulty: "Easy",
        timeRequired: "15 mins",
        pros: ["Free WHOIS privacy", "Zero renewal markups on Cloudflare", "Instant DNS propagation"],
        cons: ["Separate hosting needed"],
        officialUrl: "https://www.cloudflare.com/products/registrar/",
        aiFitScore: 98,
        recommendationReason: "Best industry rates with free SSL and DDOS protection.",
        isBookmarked: true,
        isCompleted: true,
      },
    ],
  },
  {
    category: "Hosting & Cloud",
    description: "Production web server, serverless functions & global CDN",
    items: [
      {
        id: "res_vercel",
        name: "Vercel / Supabase Stack",
        tier: "Freemium",
        pricing: "$0 - $20 / month",
        difficulty: "Easy",
        timeRequired: "30 mins",
        pros: ["Zero-config Next.js deployments", "Global Edge Network", "PostgreSQL database built-in"],
        cons: ["Bandwidth overage rates if unmonitored"],
        officialUrl: "https://vercel.com",
        aiFitScore: 99,
        recommendationReason: "Native match for your Next.js App Router codebase.",
        isBookmarked: true,
        isCompleted: true,
      },
    ],
  },
  {
    category: "Payments & Billing",
    description: "Accept credit cards, recurring SaaS subscriptions & global payouts",
    items: [
      {
        id: "res_stripe",
        name: "Stripe Connect & Billing",
        tier: "Freemium",
        pricing: "2.9% + 30¢ per transaction",
        difficulty: "Moderate",
        timeRequired: "1 - 2 days",
        pros: ["Supported in 45+ countries", "Automated tax compliance", "Merchant of record support"],
        cons: ["Requires incorporation documents"],
        officialUrl: "https://stripe.com",
        aiFitScore: 96,
        recommendationReason: "De facto standard for SaaS subscriptions and VC readiness.",
        isBookmarked: true,
        isCompleted: false,
      },
    ],
  },
];

export const MOCK_DOCUMENTS: ComplianceDoc[] = [
  {
    id: "doc_inc",
    title: "Delaware C-Corp Incorporation (or India Pvt Ltd)",
    category: "Incorporation",
    urgency: "Urgent",
    status: "Approved",
    purpose: "Establishes legal entity structure required for equity allocation, hiring, and VC funding.",
    eligibility: "Founders aged 18+ with valid passport or government ID.",
    governmentFees: "$89 State filing fee (Delaware) / ₹1,500 (India SPICe+)",
    estimatedTimeline: "3 - 5 Business Days",
    requiredDocuments: ["Passport / Driver's License", "Proof of Address", "Articles of Incorporation"],
    officialPortalUrl: "https://corp.delaware.gov",
    freeProcess: "Direct submission on Delaware Division of Corporations portal.",
    paidProcess: "Clerky / Stripe Atlas ($500 bundled with EIN and bank account).",
    steps: [
      "Select unique company name and check availability",
      "Appoint Registered Agent",
      "File Certificate of Incorporation",
      "Obtain Federal EIN Number",
      "Issue Founder Stock (80/20 vesting schedule recommended)",
    ],
  },
  {
    id: "doc_gst",
    title: "GST Registration / Sales Tax Exemption Certificate",
    category: "Tax & Legal",
    urgency: "Urgent",
    status: "Drafting",
    purpose: "Mandatory for tax compliance, invoicing B2B clients, and input tax credit claims.",
    eligibility: "Annual turnover > $20K / ₹20 Lakhs (or mandatory for inter-state ecommerce).",
    governmentFees: "$0 Govt Fee",
    estimatedTimeline: "5 - 7 Business Days",
    requiredDocuments: ["PAN Card", "Certificate of Incorporation", "Bank Cancelled Cheque", "Rental Agreement"],
    officialPortalUrl: "https://www.gst.gov.in",
    freeProcess: "Apply online via GST Common Portal using Aadhaar OTP authentication.",
    paidProcess: "CA assisted filing ($40 - $100).",
    steps: [
      "Login to GST Portal -> New Registration",
      "Fill Part A with Email, Mobile & PAN",
      "Upload Premises Proof & Bank Account details",
      "Complete TRN Verification",
    ],
  },
  {
    id: "doc_founder_agreement",
    title: "Founders Equity Split & IP Assignment Agreement",
    category: "Labor & HR",
    urgency: "Urgent",
    status: "Approved",
    purpose: "Binds code and IP created by founders to the company with 4-year vesting and 1-year cliff.",
    eligibility: "All co-founders.",
    governmentFees: "$0",
    estimatedTimeline: "1 Day",
    requiredDocuments: ["Cap Table Schedule", "Vesting Schedule Terms"],
    officialPortalUrl: "https://isaac.ai/documents",
    freeProcess: "Use Isaac.AI Automated Founder Agreement Generator.",
    paidProcess: "Legal counsel review ($300).",
    steps: [
      "Agree on equity percentages (e.g. 50/50 or 60/40)",
      "Set 4-year vesting schedule with 12-month cliff",
      "Execute IP Assignment clause",
      "Sign digitally via HelloSign / DocuSign",
    ],
  },
];

export const MOCK_GRANTS: GrantScheme[] = [
  {
    id: "grant_startup_india",
    title: "Startup India Seed Fund Scheme (SISFS)",
    provider: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    country: "India",
    category: "Tech Innovation",
    fundingAmount: "Up to ₹20 Lakhs ($25,000) Grant + ₹50 Lakhs Debt",
    deadline: "Rolling Monthly Window",
    eligibility: [
      "DPIIT-recognized startup incorporated under 2 years",
      "Must have a valid MVP or proof-of-concept",
      "Shareholding by Indian promoters > 51%",
    ],
    benefits: [
      "Non-dilutive grant money for prototype development & trials",
      "3-year Income Tax exemption under Section 80-IAC",
      "Fast-tracked patent application at 80% fee rebate",
    ],
    officialUrl: "https://seedfund.startupindia.gov.in/",
    aiFitScore: 95,
    matchReasons: ["Matches your early-stage AI software concept", "Recognized tech category eligibility"],
    isBookmarked: true,
  },
  {
    id: "grant_nsf_sbir",
    title: "NSF Small Business Innovation Research (SBIR) Phase I",
    provider: "National Science Foundation",
    country: "United States",
    category: "Central",
    fundingAmount: "Up to $275,000 Non-Dilutive Grant",
    deadline: "November 5, 2026",
    eligibility: [
      "US-based small business (< 500 employees)",
      "Proprietary deep-tech / AI innovation with commercial potential",
    ],
    benefits: ["Zero equity dilution", "Access to NSF mentor network"],
    officialUrl: "https://seedfund.nsf.gov/",
    aiFitScore: 88,
    matchReasons: ["Deep technical innovation alignment", "Substantial seed funding scale"],
    isBookmarked: false,
  },
];

export const MOCK_INVESTORS: InvestorProfile[] = [
  {
    id: "inv_yc",
    name: "Y Combinator",
    title: "Y Combinator (YC Batch W26)",
    type: "Accelerator",
    checkSize: "$500,000 for 7% Equity (SAFE)",
    targetStages: ["Pre-Seed", "Seed"],
    industries: ["B2B SaaS", "AI / ML", "Fintech", "Developer Tools"],
    portfolioHighlights: ["Stripe", "Airbnb", "Dropbox", "Coinbase", "PostHog"],
    location: "San Francisco, CA / Remote",
    officialUrl: "https://www.ycombinator.com/apply",
    aiFitScore: 96,
    pitchAdvice:
      "Focus on crisp metrics, clear problem statement, and demo video showing your live AI agent execution.",
    outreachStatus: "Interested",
  },
  {
    id: "inv_sequoia_arc",
    name: "Peak XV / Sequoia Surge Arc",
    title: "Peak XV / Sequoia Surge Arc",
    type: "VC Fund",
    checkSize: "$1,000,000 - $3,000,000",
    targetStages: ["Seed", "Series A"],
    industries: ["AI Infrastructure", "SaaS", "Enterprise Tech"],
    portfolioHighlights: ["Pinecone", "Heptagon", "Unacademy"],
    location: "Global / India & SEA",
    officialUrl: "https://www.surgeahead.com",
    aiFitScore: 91,
    pitchAdvice: "Demonstrate strong LTV/CAC economics and defensible graph memory retention.",
    outreachStatus: "Contacted",
  },
];

export const MOCK_BUSINESS_METRICS: BusinessMetrics = {
  businessName: "Isaac AI Inc.",
  industry: "B2B AI Software",
  foundedYear: 2025,
  currentRevenue: 48500,
  mrr: 12400,
  arr: 148800,
  profitMargin: 64,
  monthlyExpenses: 4460,
  totalCustomers: 248,
  employees: 4,
  monthlyBurnRate: 4460,
  marketingSpend: 1200,
  cac: 42,
  ltv: 720,
  retentionRate: 94,
  websiteTraffic: 18500,
  monthlyLeads: 1420,
  conversionRate: 4.8,
  cashRunwayMonths: 18,
  history: [
    { month: "Jan", revenue: 4200, expenses: 2100, profit: 2100, mrr: 4200, arr: 50400, customers: 84, cac: 48, ltv: 650, burnRate: 2100 },
    { month: "Feb", revenue: 5800, expenses: 2600, profit: 3200, mrr: 5800, arr: 69600, customers: 116, cac: 45, ltv: 680, burnRate: 2600 },
    { month: "Mar", revenue: 7600, expenses: 3100, profit: 4500, mrr: 7600, arr: 91200, customers: 152, cac: 44, ltv: 700, burnRate: 3100 },
    { month: "Apr", revenue: 9800, expenses: 3800, profit: 6000, mrr: 9800, arr: 117600, customers: 196, cac: 43, ltv: 710, burnRate: 3800 },
    { month: "May", revenue: 12400, expenses: 4460, profit: 7940, mrr: 12400, arr: 148800, customers: 248, cac: 42, ltv: 720, burnRate: 4460 },
  ],
};

export const MOCK_NOTIFICATIONS: FounderOSNotification[] = [
  {
    id: "notif_1",
    title: "Stage 4 Action Required",
    message: "Startup India Seed Fund Scheme deadline is approaching in 14 days.",
    timestamp: "10 mins ago",
    read: false,
    type: "deadline",
    actionUrl: "/dashboard/grants",
  },
  {
    id: "notif_2",
    title: "AI Risk Alert",
    message: "Your LTV/CAC ratio is 17.1x (Exceptionally high unit economics ready for scale).",
    timestamp: "1 hour ago",
    read: false,
    type: "ai_insight",
    actionUrl: "/dashboard/performance",
  },
];

// Central Reactive Graph Store
class FounderGraphMemoryStore {
  private nodes: FounderOSNode[] = INITIAL_NODES;
  private ideaData: IdeaValidationData = MOCK_IDEA_VALIDATION;
  private resources: ResourceCategoryGroup[] = MOCK_RESOURCES;
  private documents: ComplianceDoc[] = MOCK_DOCUMENTS;
  private grants: GrantScheme[] = MOCK_GRANTS;
  private investors: InvestorProfile[] = MOCK_INVESTORS;
  private metrics: BusinessMetrics = MOCK_BUSINESS_METRICS;
  private notifications: FounderOSNotification[] = MOCK_NOTIFICATIONS;
  private listeners: (() => void)[] = [];

  public getNodes(): FounderOSNode[] {
    return this.nodes;
  }

  public getIdeaData(): IdeaValidationData {
    return this.ideaData;
  }

  public getResources(): ResourceCategoryGroup[] {
    return this.resources;
  }

  public getDocuments(): ComplianceDoc[] {
    return this.documents;
  }

  public getGrants(): GrantScheme[] {
    return this.grants;
  }

  public getInvestors(): InvestorProfile[] {
    return this.investors;
  }

  public getMetrics(): BusinessMetrics {
    return this.metrics;
  }

  public getNotifications(): FounderOSNotification[] {
    return this.notifications;
  }

  public updateMetrics(partial: Partial<BusinessMetrics>) {
    this.metrics = { ...this.metrics, ...partial };
    this.notify();
  }

  public updateProfileFromChat(updates: Partial<FounderProfile>) {
    if (updates.startupName) this.ideaData.startupName = updates.startupName;
    if (updates.problem) this.ideaData.problemStatement = updates.problem;
    if (updates.targetAudience) this.ideaData.icpPersona = updates.targetAudience;
    if (updates.solution) this.ideaData.valueProposition = updates.solution;

    // Recalculate Stage 1 completion based on gathered profile
    const filledFields = Object.values(updates).filter(
      (v) => v !== undefined && v !== "" && (Array.isArray(v) ? v.length > 0 : true)
    ).length;

    const completion = Math.min(100, Math.round((filledFields / 12) * 100));
    this.nodes = this.nodes.map((node) =>
      node.id === "idea-validation"
        ? { ...node, completionPercentage: Math.max(node.completionPercentage, completion) }
        : node
    );

    this.notify();
  }

  public toggleResourceBookmark(id: string) {
    this.resources = this.resources.map((cat) => ({
      ...cat,
      items: cat.items.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      ),
    }));
    this.notify();
  }

  public toggleGrantBookmark(id: string) {
    this.grants = this.grants.map((g) =>
      g.id === id ? { ...g, isBookmarked: !g.isBookmarked } : g
    );
    this.notify();
  }

  public updateDocStatus(id: string, status: ComplianceDoc["status"]) {
    this.documents = this.documents.map((d) =>
      d.id === id ? { ...d, status } : d
    );
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

export const graphStore = new FounderGraphMemoryStore();

export function useFounderGraph() {
  const [, tick] = useState(0);

  useEffect(() => {
    return graphStore.subscribe(() => tick((prev) => prev + 1));
  }, []);

  return {
    nodes: graphStore.getNodes(),
    ideaData: graphStore.getIdeaData(),
    resources: graphStore.getResources(),
    documents: graphStore.getDocuments(),
    grants: graphStore.getGrants(),
    investors: graphStore.getInvestors(),
    metrics: graphStore.getMetrics(),
    notifications: graphStore.getNotifications(),
    updateMetrics: (m: Partial<BusinessMetrics>) => graphStore.updateMetrics(m),
    updateProfileFromChat: (p: Partial<FounderProfile>) => graphStore.updateProfileFromChat(p),
    toggleResourceBookmark: (id: string) => graphStore.toggleResourceBookmark(id),
    toggleGrantBookmark: (id: string) => graphStore.toggleGrantBookmark(id),
    updateDocStatus: (id: string, status: ComplianceDoc["status"]) =>
      graphStore.updateDocStatus(id, status),
  };
}
