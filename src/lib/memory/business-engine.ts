import { FounderProfile } from "@/types";
import { BusinessMetrics, ComplianceDoc, GrantScheme, InvestorProfile, IdeaValidationData } from "@/types/founder-os";

export interface ComputedEngineResults {
  metrics: BusinessMetrics;
  healthScore: number;
  complianceScore: number;
  investorReadiness: number;
  currentStageId: string;
  recommendations: Array<{ id: string; title: string; desc: string; type: "urgent" | "action" | "info" }>;
  documents: ComplianceDoc[];
  grants: GrantScheme[];
  investors: InvestorProfile[];
}

export function computeBusinessEngine(
  profile: FounderProfile,
  currentMetrics: BusinessMetrics,
  ideaData: IdeaValidationData
): ComputedEngineResults {
  const mrr = currentMetrics.mrr || (currentMetrics.currentRevenue ? Math.round(currentMetrics.currentRevenue / 12) : 0);
  const arr = mrr * 12;
  const customers = currentMetrics.totalCustomers || 0;
  const employees = currentMetrics.employees || profile.teamSize || 1;
  const country = profile.country || "United States";

  const monthlyExpenses = currentMetrics.monthlyExpenses || (mrr > 0 ? Math.round(mrr * 0.45) : 2500);
  const monthlyBurnRate = Math.max(0, monthlyExpenses - mrr);
  const profitMargin = mrr > 0 ? Math.round(((mrr - monthlyExpenses) / mrr) * 100) : 0;
  const cashRunwayMonths = monthlyBurnRate > 0 ? Math.min(36, Math.max(1, Math.round(15000 / monthlyBurnRate))) : 24;

  const cac = currentMetrics.cac || (customers > 0 ? Math.round(1200 / customers) : 45);
  const ltv = currentMetrics.ltv || (mrr > 0 && customers > 0 ? Math.round((mrr / customers) * 18) : 750);

  const updatedMetrics: BusinessMetrics = {
    ...currentMetrics,
    businessName: profile.startupName || currentMetrics.businessName || "Isaac AI Inc.",
    industry: profile.industry || currentMetrics.industry || "B2B AI Software",
    mrr,
    arr,
    currentRevenue: currentMetrics.currentRevenue || arr,
    totalCustomers: customers,
    employees,
    monthlyExpenses,
    monthlyBurnRate,
    profitMargin,
    cashRunwayMonths,
    cac,
    ltv,
  };

  // 1. Calculate Scores
  const ideaScore = ideaData.ideaScore || 85;
  const executionScore = Math.min(100, 40 + (customers > 0 ? 30 : 0) + (mrr > 0 ? 20 : 0) + (employees > 1 ? 10 : 0));
  const complianceScore = Math.min(100, 30 + (profile.country ? 20 : 0) + (mrr > 0 ? 25 : 0) + (customers > 50 ? 25 : 0));
  const investorReadiness = Math.min(100, Math.round((ideaScore * 0.3) + (executionScore * 0.4) + (complianceScore * 0.3)));
  const healthScore = Math.min(100, Math.round((ideaScore + executionScore + Math.max(0, profitMargin)) / 3));

  // 2. Stage Automation Logic
  let currentStageId = "idea-validation";
  if (mrr > 10000 && customers > 100) {
    currentStageId = "performance"; // Stage 6: Performance & Scale
  } else if (profile.fundingStage === "Seed" || profile.fundingStage === "Series A") {
    currentStageId = "investors"; // Stage 5: Investor Matching
  } else if (customers > 20 || mrr > 1000) {
    currentStageId = "grants"; // Stage 4: Government Grants
  } else if (profile.problem && profile.solution) {
    currentStageId = "documents"; // Stage 3: Legal & Docs
  }

  // 3. Dynamic Recommendations
  const recommendations: ComputedEngineResults["recommendations"] = [];

  if (country === "India" && (!currentMetrics.businessName || !currentMetrics.businessName.includes("Pvt"))) {
    recommendations.push({
      id: "rec_gst",
      title: "File GST & DPIIT Registration",
      desc: "Mandatory for Indian startups to claim 3-year Section 80-IAC tax exemptions & SISFS seed grants.",
      type: "urgent",
    });
  }

  if (country === "United States") {
    recommendations.push({
      id: "rec_delaware",
      title: "Delaware C-Corp Incorporation",
      desc: "Standard legal structure expected by US VCs and Y Combinator.",
      type: "action",
    });
  }

  if (customers === 0) {
    recommendations.push({
      id: "rec_customers",
      title: "Focus on Initial 10 Beta Customers",
      desc: "Run 1-on-1 interviews with target audience before investing in paid channels.",
      type: "action",
    });
  } else if (ltv / (cac || 1) < 3) {
    recommendations.push({
      id: "rec_unit_econ",
      title: "Optimize Unit Economics (LTV:CAC)",
      desc: "Your LTV:CAC ratio is under 3x. Improve retention or increase pricing before scaling ad spend.",
      type: "info",
    });
  }

  // 4. Dynamic Documents
  const documents: ComplianceDoc[] = [
    {
      id: "doc_inc",
      title: country === "India" ? "India Pvt Ltd Incorporation (SPICe+)" : "Delaware C-Corp Incorporation",
      category: "Incorporation",
      urgency: "Urgent",
      status: "Approved",
      purpose: "Establishes legal entity structure required for equity allocation, hiring, and VC funding.",
      eligibility: "Founders aged 18+ with valid ID.",
      governmentFees: country === "India" ? "₹1,500 Govt Fee" : "$89 Delaware Filing Fee",
      estimatedTimeline: "3 - 5 Business Days",
      requiredDocuments: ["Passport / ID Proof", "Address Proof", "Articles of Incorporation"],
      officialPortalUrl: country === "India" ? "https://www.mca.gov.in" : "https://corp.delaware.gov",
      freeProcess: "Direct filing on government portal.",
      paidProcess: "Stripe Atlas / Clerky ($500 bundled with EIN and bank account).",
      steps: [
        "Reserve company name",
        "Appoint Registered Agent",
        "File Incorporation Certificate",
        "Obtain Tax ID (EIN / PAN)",
        "Issue Founder Stock with vesting",
      ],
    },
    {
      id: "doc_gst",
      title: country === "India" ? "GST Registration & Tax Exemption" : "US State Sales Tax Registration",
      category: "Tax & Legal",
      urgency: "Urgent",
      status: mrr > 0 ? "Approved" : "Drafting",
      purpose: "Mandatory tax registration for invoicing clients and claiming tax credits.",
      eligibility: "Annual turnover > $20K / ₹20 Lakhs.",
      governmentFees: "$0",
      estimatedTimeline: "5 - 7 Business Days",
      requiredDocuments: ["ID Proof", "Incorporation Certificate", "Bank Account Details"],
      officialPortalUrl: country === "India" ? "https://www.gst.gov.in" : "https://irs.gov",
      freeProcess: "Direct online application.",
      paidProcess: "Assisted filing by accounting partner ($50 - $150).",
      steps: [
        "Login to tax portal",
        "Fill business identification details",
        "Upload address proof & bank details",
        "Complete OTP verification",
      ],
    },
    {
      id: "doc_founder_agreement",
      title: "Founders Equity Split & IP Assignment Agreement",
      category: "Labor & HR",
      urgency: "Urgent",
      status: "Approved",
      purpose: "Binds IP created by founders to the entity with 4-year vesting and 1-year cliff.",
      eligibility: "All co-founders.",
      governmentFees: "$0",
      estimatedTimeline: "1 Day",
      requiredDocuments: ["Cap Table Schedule", "Vesting Terms"],
      officialPortalUrl: "https://isaac.ai/documents",
      freeProcess: "Isaac.AI Automated Document Generator.",
      paidProcess: "Legal counsel review ($300).",
      steps: [
        "Set equity split percentages",
        "Set 4-year vesting schedule with 12-month cliff",
        "Sign IP assignment clause",
      ],
    },
  ];

  // 5. Dynamic Government Grants
  const grants: GrantScheme[] = [];
  if (country === "India") {
    grants.push({
      id: "grant_startup_india",
      title: "Startup India Seed Fund Scheme (SISFS)",
      provider: "DPIIT",
      country: "India",
      category: "Tech Innovation",
      fundingAmount: "Up to ₹20 Lakhs ($25,000) Grant + ₹50 Lakhs Debt",
      deadline: "Rolling Monthly Window",
      eligibility: [
        "DPIIT-recognized startup incorporated under 2 years",
        "Valid proof-of-concept / MVP",
        "Indian promoter shareholding > 51%",
      ],
      benefits: [
        "Non-dilutive prototype grant",
        "3-year tax exemption under Section 80-IAC",
        "Patent rebate of 80%",
      ],
      officialUrl: "https://seedfund.startupindia.gov.in/",
      aiFitScore: 96,
      matchReasons: ["Matches your tech startup profile in India", "Eligible stage"],
      isBookmarked: true,
    });
  } else {
    grants.push({
      id: "grant_nsf_sbir",
      title: "NSF SBIR Phase I Grant",
      provider: "National Science Foundation",
      country: "United States",
      category: "Central",
      fundingAmount: "Up to $275,000 Non-Dilutive Grant",
      deadline: "November 5, 2026",
      eligibility: ["US-based small business (< 500 employees)", "Proprietary technical innovation"],
      benefits: ["Zero equity dilution", "NSF mentor network"],
      officialUrl: "https://seedfund.nsf.gov/",
      aiFitScore: 92,
      matchReasons: ["Deep technical innovation alignment", "Non-dilutive seed scale"],
      isBookmarked: true,
    });
  }

  // 6. Dynamic Investor Profiles
  const investors: InvestorProfile[] = [
    {
      id: "inv_yc",
      name: "Y Combinator",
      title: "Y Combinator (YC Batch W26)",
      type: "Accelerator",
      checkSize: "$500,000 for 7% Equity (SAFE)",
      targetStages: ["Pre-Seed", "Seed"],
      industries: ["B2B SaaS", "AI / ML", "Fintech"],
      portfolioHighlights: ["Stripe", "Airbnb", "Dropbox", "Coinbase"],
      location: "San Francisco, CA / Remote",
      officialUrl: "https://www.ycombinator.com/apply",
      aiFitScore: 96,
      pitchAdvice: "Focus on crisp metrics and clear problem statement showing live agent execution.",
      outreachStatus: "Interested",
    },
    {
      id: "inv_surge",
      name: "Sequoia Surge / Peak XV",
      title: "Peak XV Surge Arc",
      type: "VC Fund",
      checkSize: "$1,000,000 - $3,000,000",
      targetStages: ["Seed", "Series A"],
      industries: ["AI Infrastructure", "SaaS", "Enterprise Tech"],
      portfolioHighlights: ["Pinecone", "Unacademy"],
      location: "Global / India & SEA",
      officialUrl: "https://www.surgeahead.com",
      aiFitScore: 91,
      pitchAdvice: "Highlight LTV/CAC unit economics and founder retention metrics.",
      outreachStatus: "Contacted",
    },
  ];

  return {
    metrics: updatedMetrics,
    healthScore,
    complianceScore,
    investorReadiness,
    currentStageId,
    recommendations,
    documents,
    grants,
    investors,
  };
}
