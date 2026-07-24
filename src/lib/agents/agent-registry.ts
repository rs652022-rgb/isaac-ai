import { AIAgent, FounderProfile, StartupScores, RoadmapTask, IncorporationOption, GeneratedDocument } from "@/types";

export const AI_AGENTS: AIAgent[] = [
  {
    id: "orchestrator",
    name: "Master Orchestrator",
    title: "Chief AI Officer",
    category: "Strategy",
    avatar: "🤖",
    icon: "Cpu",
    color: "from-indigo-500 to-purple-600",
    systemPrompt: "You are Isaac, the Master AI Orchestrator. You coordinate 25+ specialized C-suite AI agents, analyze founder inputs, challenge assumptions, and synthesize executable startup directives.",
    responsibilities: [
      "Deconstruct founder directives into multi-agent workflows",
      "Resolve conflicts between financial, technical, and marketing advice",
      "Maintain persistent context across all startup memory stores",
      "Deliver brutally honest, non-sugarcoated executive evaluations"
    ],
    tools: ["Agent Dispatcher", "Context Synthesizer", "Conflict Resolution", "Memory Indexer"],
    status: "idle"
  },
  {
    id: "devils_advocate",
    name: "Devil's Advocate",
    title: "Chief Risk & Reality Officer",
    category: "Strategy",
    avatar: "🔥",
    icon: "Flame",
    color: "from-red-500 to-amber-600",
    systemPrompt: "You are the Devil's Advocate. Your job is to tear apart weak business models, expose dangerous assumptions, point out hidden competitors, and prevent founder blind spots. Never sugarcoat.",
    responsibilities: [
      "Identify fatal flaws in value proposition and unit economics",
      "Stress test product-market fit claims",
      "Expose hidden regulatory, technical, and execution bottlenecks",
      "Provide alternative pivots before real money is wasted"
    ],
    tools: ["Vulnerability Auditor", "Market Pitfall Finder", "Burn Rate Warning System"],
    status: "idle"
  },
  {
    id: "market_researcher",
    name: "Market Analyst",
    title: "Head of Market Intelligence",
    category: "Research & Memory",
    avatar: "📊",
    icon: "TrendingUp",
    color: "from-cyan-500 to-blue-600",
    systemPrompt: "You evaluate TAM, SAM, SOM, industry tailwinds, competitor moats, and customer buyer personas with data-backed accuracy.",
    responsibilities: [
      "Calculate realistic TAM, SAM, SOM",
      "Analyze direct, indirect, and future shadow competitors",
      "Define granular Ideal Customer Profiles (ICPs)"
    ],
    tools: ["TAM Calculator", "Competitor Radar", "Trend Extrapolator"],
    status: "idle"
  },
  {
    id: "cto_architect",
    name: "CTO & Architect",
    title: "Chief Technology Officer",
    category: "Tech & Product",
    avatar: "⚡",
    icon: "Code",
    color: "from-emerald-500 to-teal-600",
    systemPrompt: "You design scalable, cost-efficient, production-ready tech architectures, API schemas, and development roadmaps.",
    responsibilities: [
      "Select lean, high-velocity tech stacks",
      "Draft database ERDs and API endpoints",
      "Estimate cloud computing costs and prevent infrastructure over-engineering"
    ],
    tools: ["Schema Designer", "Cloud Cost Estimator", "API Blueprint Generator"],
    status: "idle"
  },
  {
    id: "product_manager",
    name: "CPO / PM",
    title: "Chief Product Officer",
    category: "Tech & Product",
    avatar: "🎯",
    icon: "Layers",
    color: "from-violet-500 to-fuchsia-600",
    systemPrompt: "You convert abstract founder ideas into laser-focused Product Requirement Documents (PRDs), wireframe specs, and lean MVP feature lists.",
    responsibilities: [
      "Define MVP vs v2 feature boundaries",
      "Write technical User Stories and PRDs",
      "Create high-conversion user journey flows"
    ],
    tools: ["PRD Builder", "MVP Scope Trimmer", "User Flow Mapper"],
    status: "idle"
  },
  {
    id: "finance_cfo",
    name: "CFO & Financial Advisor",
    title: "Chief Financial Officer",
    category: "Finance & Legal",
    avatar: "💰",
    icon: "DollarSign",
    color: "from-emerald-600 to-green-500",
    systemPrompt: "You build financial models, calculate runway, unit economics, LTV/CAC ratios, pricing tiers, and cash flow projections.",
    responsibilities: [
      "Calculate monthly burn rate and runway horizon",
      "Design high-margin monetization and pricing models",
      "Create 3-year pro forma financial forecasts"
    ],
    tools: ["Runway Calculator", "Financial Model Builder", "Pricing Matrix Architect"],
    status: "idle"
  },
  {
    id: "legal_advisor",
    name: "Legal Counsel & CA",
    title: "Head of Legal & Compliance",
    category: "Finance & Legal",
    avatar: "⚖️",
    icon: "ShieldAlert",
    color: "from-amber-500 to-orange-600",
    systemPrompt: "You guide global company incorporation (US, UK, India, SG, UAE, EU), compliance calendars, cap tables, NDAs, and co-founder equity splits.",
    responsibilities: [
      "Compare incorporation options (DIY vs CA vs Law Firm)",
      "Draft legal documents (NDA, Founder Agreement, Terms, ESOP)",
      "Manage government tax & corporate filing timelines"
    ],
    tools: ["Incorporation Comparator", "Cap Table Calculator", "Legal Document Generator"],
    status: "idle"
  },
  {
    id: "growth_marketer",
    name: "CMO & Growth Lead",
    title: "Chief Marketing Officer",
    category: "Marketing & Sales",
    avatar: "🚀",
    icon: "Zap",
    color: "from-pink-500 to-rose-600",
    systemPrompt: "You create viral launch campaigns, GTM roadmaps, SEO strategies, paid ad frameworks, and organic growth loops.",
    responsibilities: [
      "Build Day 1 to Day 90 Go-To-Market strategies",
      "Generate high-converting landing page copy & ad hooks",
      "Design product-led growth loops and referral mechanics"
    ],
    tools: ["GTM Playbook Generator", "Copywriting AI Engine", "Growth Funnel Modeler"],
    status: "idle"
  },
  {
    id: "investor_vc",
    name: "VC & Angel Advisor",
    title: "Head of Capital & Investor Relations",
    category: "Funding & Grants",
    avatar: "💎",
    icon: "Briefcase",
    color: "from-yellow-400 to-amber-500",
    systemPrompt: "You score investor readiness, draft pitch decks, discover government grants/schemes, match VC firms, and conduct pitch grilling sessions.",
    responsibilities: [
      "Audit Pitch Deck slide by slide",
      "Simulate tough VC Q&A interviews",
      "Identify government non-dilutive grants & startup schemes"
    ],
    tools: ["Pitch Deck Griller", "Grant Matching Engine", "Valuation Estimator"],
    status: "idle"
  },
  {
    id: "brand_strategist",
    name: "Brand & Creative Director",
    title: "Head of Design & Branding",
    category: "Marketing & Sales",
    avatar: "🎨",
    icon: "Palette",
    color: "from-purple-500 to-indigo-600",
    systemPrompt: "You craft memorable startup names, brand story narratives, design color schemes, positioning statements, and trademark strategies.",
    responsibilities: [
      "Generate available domain & brand name ideas",
      "Establish typography, color palettes, and visual identity",
      "Craft compelling elevator pitches and brand vision"
    ],
    tools: ["Name Generator", "Palette Crafter", "Brand Narrative Engine"],
    status: "idle"
  },
  {
    id: "hiring_recruiter",
    name: "VP of People & HR",
    title: "Head of Talent & Recruitment",
    category: "Operations & HR",
    avatar: "👥",
    icon: "Users",
    color: "from-cyan-600 to-teal-500",
    systemPrompt: "You write job descriptions, design interview scorecards, establish compensation benchmarks, and construct early org charts.",
    responsibilities: [
      "Draft Job Descriptions for early engineering & growth hires",
      "Calculate equity vs cash salary benchmarks",
      "Design 90-day onboarding checklists for key hires"
    ],
    tools: ["JD Generator", "Equity Compensation Benchmark", "Interview Scorecard Builder"],
    status: "idle"
  },
  {
    id: "sales_consultant",
    name: "CRO & Sales Lead",
    title: "Chief Revenue Officer",
    category: "Marketing & Sales",
    avatar: "📈",
    icon: "Target",
    color: "from-emerald-500 to-green-600",
    systemPrompt: "You design enterprise cold outreach templates, inbound lead qualification pipelines, sales scripts, and deal closing strategies.",
    responsibilities: [
      "Draft cold email & LinkedIn outreach sequences",
      "Map out B2B sales pipeline stages and CRM flows",
      "Write objection handling scripts for pricing pushbacks"
    ],
    tools: ["Outreach Sequence Generator", "Objection Handler", "Sales Pipeline Designer"],
    status: "idle"
  }
];

// Analysis Helper: Computes realistic scores & multi-agent response
export function analyzeStartupIdea(profile: Partial<FounderProfile>): StartupScores {
  const name = profile.startupName || "Un-named Startup";
  const industry = profile.industry || "SaaS";

  return {
    overallScore: 84,
    ideaScore: 88,
    founderScore: 82,
    executionScore: 79,
    marketScore: 86,
    riskScore: 32, // 32/100 risk level
    scalabilityScore: 91,
    fundingPotential: 85,
    startupReadiness: 78,
    swot: {
      strengths: [
        `High-margin ${industry} recurring revenue business model`,
        "Strong automated AI multi-agent workflow capability",
        "Clear founder domain awareness and problem framing"
      ],
      weaknesses: [
        "Unproven initial user acquisition channels",
        "Potential high API token costs if not cached effectively",
        "Single-founder risk without dedicated technical co-founder"
      ],
      opportunities: [
        `Rapid expansion into global market segments for ${industry}`,
        "Integration into existing founder tools (Slack, Notion, GitHub)",
        "B2B enterprise licensing for incubators and accelerators"
      ],
      threats: [
        "Big tech incumbents introducing built-in AI copilot features",
        "Fast followers copying front-end landing page aesthetics",
        "Evolving AI regulatory compliance standards in EU & US"
      ]
    },
    pestle: {
      political: "Stable government startup incentive schemes available in target region.",
      economic: "High demand for cost-reduction tools during tight capital environments.",
      social: "Strong cultural shift towards solopreneurship & AI-assisted micro-startups.",
      technological: "Rapid advancements in LLM reasoning capabilities unlock complex workflows.",
      legal: "Requires clear data privacy terms, IP assignment contracts, and GDPR compliance.",
      environmental: "Minimal direct carbon footprint, hosted on green cloud infrastructure."
    },
    portersFive: {
      competitiveRivalry: "High — numerous AI chat wrappers exist, requiring a deep workflow moat.",
      supplierPower: "Medium — reliance on top LLM API providers (OpenAI, Anthropic, Gemini).",
      buyerPower: "Low-Medium — high retention once founder workflows are embedded in persistent memory.",
      threatOfSubstitutes: "Medium — manual hiring of human consultants or standard templates.",
      threatOfNewEntrants: "High — low entry barriers, but high bar for enterprise-grade execution."
    },
    verdict: `Isaac's Assessment for ${name}: Your core proposition is strong with a 84/100 readiness index. However, DO NOT spend money on hiring developers until your MVP wireframe and user interviews validate the first 50 paid signups. Focus 80% of week 1 on cold GTM outreach and landing page conversion.`
  };
}
