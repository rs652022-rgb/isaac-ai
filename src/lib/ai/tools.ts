export interface AITool {
  name: string;
  description: string;
  parameters?: Record<string, any>;
}

export const ISAAC_TOOLS: AITool[] = [
  {
    name: "audit_business_model",
    description: "Stress-tests unit economics, revenue streams, and customer acquisition costs."
  },
  {
    name: "calculate_runway",
    description: "Calculates burn rate, runway projection, and cash-flow horizons."
  },
  {
    name: "generate_prd",
    description: "Creates lean MVP Product Requirement Documents and User Stories."
  },
  {
    name: "incorporation_advisor",
    description: "Compares legal entity options (Delaware C-Corp, Pvt Ltd, LLC) and compliance deadlines."
  },
  {
    name: "pitch_deck_analyzer",
    description: "Audits pitch deck slides against VC evaluation criteria."
  }
];

export function getAgentTools(agentId?: string): AITool[] {
  return ISAAC_TOOLS;
}
