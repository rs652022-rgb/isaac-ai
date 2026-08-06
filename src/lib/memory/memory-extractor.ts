import { FounderProfile } from "@/types";
import { BusinessMetrics, IdeaValidationData } from "@/types/founder-os";

export interface ExtractedFacts {
  businessName?: string;
  industry?: string;
  country?: string;
  legalStructure?: string;
  mrr?: number;
  arr?: number;
  currentRevenue?: number;
  totalCustomers?: number;
  employees?: number;
  teamSize?: number;
  monthlyExpenses?: number;
  monthlyBurnRate?: number;
  fundingStage?: "Idea" | "Pre-Seed" | "Seed" | "Series A" | "Bootstrapped";
  productStage?: "Concept" | "Wireframe" | "MVP Ready" | "Live Users";
  problem?: string;
  solution?: string;
  targetAudience?: string;
  competitors?: string[];
  gstStatus?: "Registered" | "Not Registered" | "Exempt";
  trademarkStatus?: "Filed" | "Approved" | "Not Filed";
  website?: string;
}

/**
 * Intelligently extracts structured business facts from chat messages.
 */
export function extractMemoryFromText(text: string): ExtractedFacts {
  const facts: ExtractedFacts = {};
  if (!text || typeof text !== "string") return facts;

  const lower = text.toLowerCase();

  // 1. Revenue & MRR Extraction
  const mrrMatch = text.match(/(?:mrr|monthly revenue|making|earning|revenue of|generate|generates)\s*(?:is|of|=|:)?\s*\$?([0-9,]+(?:\.[0-9]+)?)\s*(k|thousand|m|million)?/i);
  if (mrrMatch) {
    let val = parseFloat(mrrMatch[1].replace(/,/g, ""));
    const unit = mrrMatch[2]?.toLowerCase();
    if (unit === "k" || unit === "thousand") val *= 1000;
    if (unit === "m" || unit === "million") val *= 1000000;
    if (val > 0) {
      facts.mrr = val;
      facts.arr = val * 12;
      facts.currentRevenue = val * 12;
    }
  }

  // 2. Customer Count Extraction
  const customerMatch = text.match(/([0-9,]+)\s*(?:paying\s*)?(?:customers|clients|users|subscribers|active users)/i);
  if (customerMatch) {
    const count = parseInt(customerMatch[1].replace(/,/g, ""), 10);
    if (!isNaN(count) && count > 0) {
      facts.totalCustomers = count;
    }
  }

  // 3. Team Size & Employees
  const teamMatch = text.match(/(?:team of|team size|employees|employ|staff of|co-founders|founders)\s*(?:is|=|:)?\s*([0-9]+)/i);
  if (teamMatch) {
    const size = parseInt(teamMatch[1], 10);
    if (!isNaN(size) && size > 0) {
      facts.employees = size;
      facts.teamSize = size;
    }
  }

  // 4. Country & Location
  if (lower.includes("india") || lower.includes("delhi") || lower.includes("bangalore") || lower.includes("mumbai")) {
    facts.country = "India";
  } else if (lower.includes("united states") || lower.includes("usa") || lower.includes("us based") || lower.includes("delaware") || lower.includes("san francisco") || lower.includes("new york")) {
    facts.country = "United States";
  } else if (lower.includes("uk") || lower.includes("united kingdom") || lower.includes("london")) {
    facts.country = "United Kingdom";
  } else if (lower.includes("canada") || lower.includes("toronto")) {
    facts.country = "Canada";
  }

  // 5. Legal Structure & Registration Status
  if (lower.includes("delaware c-corp") || lower.includes("c-corp") || lower.includes("inc.")) {
    facts.legalStructure = "Delaware C-Corp";
  } else if (lower.includes("pvt ltd") || lower.includes("private limited")) {
    facts.legalStructure = "Pvt Ltd";
  } else if (lower.includes("llc")) {
    facts.legalStructure = "LLC";
  } else if (lower.includes("sole proprietorship")) {
    facts.legalStructure = "Sole Proprietorship";
  }

  // 6. GST & Trademark Status
  if (lower.includes("gst registered") || lower.includes("have gst") || lower.includes("gst active")) {
    facts.gstStatus = "Registered";
  } else if (lower.includes("no gst") || lower.includes("without gst") || lower.includes("don't have gst")) {
    facts.gstStatus = "Not Registered";
  }

  if (lower.includes("trademark filed") || lower.includes("trademark registered") || lower.includes("registered trademark")) {
    facts.trademarkStatus = "Approved";
  } else if (lower.includes("no trademark") || lower.includes("without trademark")) {
    facts.trademarkStatus = "Not Filed";
  }

  // 7. Funding Stage
  if (lower.includes("series a")) facts.fundingStage = "Series A";
  else if (lower.includes("seed round") || lower.includes("raising seed")) facts.fundingStage = "Seed";
  else if (lower.includes("pre-seed") || lower.includes("raising preseed")) facts.fundingStage = "Pre-Seed";
  else if (lower.includes("bootstrapped") || lower.includes("self-funded")) facts.fundingStage = "Bootstrapped";
  else if (lower.includes("just an idea") || lower.includes("idea stage")) facts.fundingStage = "Idea";

  // 8. Product Stage
  if (lower.includes("live users") || lower.includes("in production") || lower.includes("launched")) facts.productStage = "Live Users";
  else if (lower.includes("mvp ready") || lower.includes("building mvp") || lower.includes("beta")) facts.productStage = "MVP Ready";
  else if (lower.includes("wireframe") || lower.includes("prototype")) facts.productStage = "Wireframe";
  else if (lower.includes("concept")) facts.productStage = "Concept";

  // 9. Startup / Company Name
  const nameMatch = text.match(/(?:startup name|company name|called|name is|project name)\s*(?:is|=|:)?\s*["']?([A-Za-z0-9\s.]{2,30})["']?/i);
  if (nameMatch && nameMatch[1]) {
    const candidate = nameMatch[1].trim();
    if (candidate && !["the", "a", "an", "my", "our"].includes(candidate.toLowerCase())) {
      facts.businessName = candidate;
    }
  }

  return facts;
}
