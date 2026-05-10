export type TerminalTrend = 'up' | 'neutral' | 'down';

export type TerminalTimelineEventType =
  | 'observation'
  | 'rejection'
  | 'confirmation'
  | 'decision'
  | 'execution';

export type TerminalTimelineIcon = 'activity' | 'shield' | 'zap' | 'layers' | 'cpu';

export interface TerminalStat {
  label: string;
  value: string;
  change: string;
  trend: TerminalTrend;
}

export interface TerminalHistoryPoint {
  time: string;
  value: number;
}

export interface TerminalMarketState {
  symbol: string;
  price: number;
  changeLabel: string;
  streamLabel: string;
  activeTimeframe: string;
  timeframes: string[];
  history: TerminalHistoryPoint[];
}

export interface TerminalAgentState {
  name: string;
  role: string;
  confidence: number;
  status: string;
  focus: string;
  colorClass: string;
}

export interface TerminalTimelineEvent {
  id: number;
  time: string;
  agent: string;
  icon: TerminalTimelineIcon;
  type: TerminalTimelineEventType;
  text: string;
  colorClass: string;
  badge?: string;
}

export interface PortfolioReasoningItem {
  asset: string;
  allocation: string;
  value: string;
  reason: string;
  confidence: number;
}

export interface AIMemoryItem {
  id: number;
  query: string;
  match: string;
  similarity: string;
  insight: string;
}
