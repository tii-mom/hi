import type { AgentAvatarStyle } from '@/components/ui/AgentAvatar';

export interface FeatureCopy {
  key: string;
  fallback: string;
}

export interface CopyTradeHistoryPoint {
  val: number;
}

export interface CopyTradeRow {
  id: string;
  agent: FeatureCopy;
  style: AgentAvatarStyle;
  status: 'running' | 'paused';
  allocation: string;
  pnl: string;
  pnlPercent: string;
  history: number[];
}

export interface CopyTradingViewModel {
  header: CopyTradingCopy['header'];
  summary: CopyTradingCopy['summary'];
  status: CopyTradingCopy['status'];
  labels: CopyTradingCopy['labels'];
  actions: CopyTradingCopy['actions'];
  rows: CopyTradeRow[];
}

export interface CopyTradingCopy {
  header: {
    title: FeatureCopy;
    subtitle: FeatureCopy;
  };
  summary: {
    totalAllocated: FeatureCopy;
    totalPnl: FeatureCopy;
  };
  status: {
    running: FeatureCopy;
    paused: FeatureCopy;
  };
  labels: {
    allocated: FeatureCopy;
    pnl: FeatureCopy;
  };
  actions: {
    manageSettings: FeatureCopy;
    severBond: FeatureCopy;
    restoreResonance: FeatureCopy;
    viewChart: FeatureCopy;
  };
}
