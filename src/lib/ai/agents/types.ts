/**
 * Multi-Agent System Core Type Definitions
 */

export type AgentId =
  | "orchestrator"
  | "founder"
  | "finance"
  | "marketing"
  | "product"
  | "sales"
  | "branding"
  | "investor"
  | "legal"
  | "operations";

export interface AgentDefinition {
  id: AgentId;
  name: string;
  title: string;
  category: "Strategy" | "Finance & Legal" | "Marketing & Sales" | "Tech & Product" | "Operations & HR" | "Funding";
  avatar: string;
  color: string;
  description: string;
  responsibilities: string[];
  systemPrompt: string;
}

export interface IntentClassificationResult {
  targetAgentId: AgentId;
  confidence: number; // 0.0 to 1.0
  reasoning: string;
  detectedTopics: string[];
}
