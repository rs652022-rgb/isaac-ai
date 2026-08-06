import { AgentDefinition, AgentId } from "./types";
import { ORCHESTRATOR_AGENT } from "./prompts/orchestrator";
import { FOUNDER_AGENT } from "./prompts/founder";
import { FINANCE_AGENT } from "./prompts/finance";
import { MARKETING_AGENT } from "./prompts/marketing";
import { PRODUCT_AGENT } from "./prompts/product";
import { SALES_AGENT } from "./prompts/sales";
import { BRANDING_AGENT } from "./prompts/branding";
import { INVESTOR_AGENT } from "./prompts/investor";
import { LEGAL_AGENT } from "./prompts/legal";
import { OPERATIONS_AGENT } from "./prompts/operations";
import { ISAAC_SYSTEM_PROMPT } from "../systemPrompt";

export class AgentRegistry {
  private static agentsMap: Map<AgentId, AgentDefinition> = new Map();

  static {
    // Register initial core specialized agents
    this.registerAgent(ORCHESTRATOR_AGENT);
    this.registerAgent(FOUNDER_AGENT);
    this.registerAgent(FINANCE_AGENT);
    this.registerAgent(MARKETING_AGENT);
    this.registerAgent(PRODUCT_AGENT);
    this.registerAgent(SALES_AGENT);
    this.registerAgent(BRANDING_AGENT);
    this.registerAgent(INVESTOR_AGENT);
    this.registerAgent(LEGAL_AGENT);
    this.registerAgent(OPERATIONS_AGENT);
  }

  /**
   * Dynamically register a new specialized agent
   */
  public static registerAgent(agent: AgentDefinition) {
    this.agentsMap.set(agent.id, agent);
  }

  public static getAgent(id: AgentId): AgentDefinition {
    return this.agentsMap.get(id) || ORCHESTRATOR_AGENT;
  }

  public static getAllAgents(): AgentDefinition[] {
    return Array.from(this.agentsMap.values());
  }

  public static getSystemPrompt(id?: AgentId): string {
    const targetAgent = this.getAgent(id || "orchestrator");
    return `${ISAAC_SYSTEM_PROMPT}\n\nActive Agent Persona: ${targetAgent.name} (${targetAgent.title})\nCategory: ${targetAgent.category}\nSpecific Agent Instructions: ${targetAgent.systemPrompt}`;
  }
}
