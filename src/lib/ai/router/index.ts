import { AgentId, IntentClassificationResult, AgentDefinition } from "../agents/types";
import { AgentRegistry } from "../agents/registry";

interface KeywordRule {
  agentId: AgentId;
  keywords: string[];
  weight: number;
}

const ROUTING_RULES: KeywordRule[] = [
  {
    agentId: "finance",
    keywords: ["burn rate", "runway", "financial model", "unit economics", "ltv", "cac", "mrr", "arr", "revenue", "budget", "cost", "pricing", "cash flow", "balance sheet", "pro forma", "gross margin"],
    weight: 1.5,
  },
  {
    agentId: "marketing",
    keywords: ["gtm", "go to market", "marketing", "acquisition", "user growth", "viral", "plg", "product led growth", "seo", "ad campaign", "traffic", "funnel", "content strategy"],
    weight: 1.4,
  },
  {
    agentId: "product",
    keywords: ["mvp", "prd", "roadmap", "user story", "wireframe", "tech stack", "features", "release", "architecture", "sprint", "specification", "product design"],
    weight: 1.4,
  },
  {
    agentId: "investor",
    keywords: ["pitch deck", "fundraising", "vc", "angel", "investor", "seed round", "series a", "valuation", "grant", "term sheet", "cap table", "pitching"],
    weight: 1.5,
  },
  {
    agentId: "legal",
    keywords: ["incorporation", "delaware", "c-corp", "nda", "terms of service", "privacy policy", "equity split", "vesting", "esop", "trademark", "patent", "compliance", "lawyer"],
    weight: 1.5,
  },
  {
    agentId: "sales",
    keywords: ["sales", "b2b", "outbound", "cold email", "prospecting", "pipeline", "crm", "objection", "enterprise sales", "deal close", "demo"],
    weight: 1.4,
  },
  {
    agentId: "branding",
    keywords: ["naming", "brand", "logo", "tagline", "color palette", "elevator pitch", "positioning", "brand voice", "domain name"],
    weight: 1.4,
  },
  {
    agentId: "operations",
    keywords: ["operations", "hiring", "job description", "recruiting", "org chart", "tool stack", "onboarding", "scalability", "process"],
    weight: 1.3,
  },
  {
    agentId: "founder",
    keywords: ["swot", "business model", "value proposition", "pivot", "competitor", "market size", "tam", "sam", "som", "idea validation", "problem statement"],
    weight: 1.3,
  },
];

export class IntentClassifier {
  public static classify(userInput: string): IntentClassificationResult {
    const text = userInput.toLowerCase();
    const scores: Map<AgentId, { score: number; matchedKeywords: string[] }> = new Map();

    for (const rule of ROUTING_RULES) {
      let matchCount = 0;
      const matched: string[] = [];

      for (const kw of rule.keywords) {
        if (text.includes(kw)) {
          matchCount++;
          matched.push(kw);
        }
      }

      if (matchCount > 0) {
        const finalScore = matchCount * rule.weight;
        scores.set(rule.agentId, { score: finalScore, matchedKeywords: matched });
      }
    }

    if (scores.size === 0) {
      return {
        targetAgentId: "orchestrator",
        confidence: 0.7,
        reasoning: "General query routed to Master Orchestrator",
        detectedTopics: ["general strategy"],
      };
    }

    let topAgent: AgentId = "orchestrator";
    let maxScore = 0;
    let topMatched: string[] = [];

    for (const [agentId, data] of scores.entries()) {
      if (data.score > maxScore) {
        maxScore = data.score;
        topAgent = agentId;
        topMatched = data.matchedKeywords;
      }
    }

    const confidence = Math.min(0.98, 0.6 + maxScore * 0.15);

    return {
      targetAgentId: topAgent,
      confidence: Number(confidence.toFixed(2)),
      reasoning: `Matched keywords: [${topMatched.join(", ")}]`,
      detectedTopics: topMatched,
    };
  }
}

export class AgentRouter {
  public static route(requestedAgentId?: AgentId, userInput?: string): { agent: AgentDefinition; classification?: IntentClassificationResult } {
    // If user explicitly chose an agent other than orchestrator, use it directly
    if (requestedAgentId && requestedAgentId !== "orchestrator") {
      const explicitAgent = AgentRegistry.getAgent(requestedAgentId);
      return { agent: explicitAgent };
    }

    // Auto-detect intent from user prompt
    if (userInput) {
      const classification = IntentClassifier.classify(userInput);
      const targetAgent = AgentRegistry.getAgent(classification.targetAgentId);
      return { agent: targetAgent, classification };
    }

    return { agent: AgentRegistry.getAgent("orchestrator") };
  }
}
