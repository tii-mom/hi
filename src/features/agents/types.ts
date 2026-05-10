export type AgentOperatingStatus = 'active' | 'scanning' | 'tracking' | 'idle' | 'lagging';

export type AgentRiskLevel = 'Low' | 'Medium' | 'High';

export interface AgentSummary {
  id: string;
  name: string;
  role: string;
  status: AgentOperatingStatus;
  confidence: number;
  focus?: string;
}

export interface AgentPerformancePoint {
  date: string;
  value: number;
}

export interface AgentProfileStats {
  return30d: string;
  winRate: string;
  tacitIndex: string;
}

export interface AgentProfileSkill {
  name: string;
  description: string;
  mastery: string;
  tacitWeight: string;
  colorClass: string;
  railClass: string;
  badgeClass: string;
  muted?: boolean;
}

export interface AgentMemoryNode {
  epoch: string;
  title: string;
  summary: string;
  insight: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  dotClass: string;
  live?: boolean;
}

export interface AgentIndustryResonance {
  label: string;
  resonance: number;
  description: string;
  colorClass: string;
  barClass: string;
}

export interface AgentLiveMemoryEvent {
  time: string;
  text: string;
  borderClass: string;
  timeClass: string;
  muted?: boolean;
}

export interface AgentHeuristic {
  label: string;
  status: string;
  dotClass: string;
  statusClass: string;
}

export interface AgentEntity {
  id: string;
  contentKeyPrefix: string;
  name: string;
  type: string;
  tacit: number;
  risk: AgentRiskLevel;
  returnLabel: string;
  followers: string;
  statusLabel: string;
  avatarSeed: string;
  description: string;
  domain: string;
  cognitiveAge: string;
  expertiseLabel: string;
  aumLabel: string;
  copyYieldRate: number;
  stats: AgentProfileStats;
  performanceData: AgentPerformancePoint[];
  skills: AgentProfileSkill[];
  memoryCapacity: string;
  memoryNodes: AgentMemoryNode[];
  industryResonance: AgentIndustryResonance[];
  liveMemory: AgentLiveMemoryEvent[];
  heuristics: AgentHeuristic[];
}
