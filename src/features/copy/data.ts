import type { CopyTradeRow, CopyTradingCopy, CopyTradingViewModel } from './types';

function buildHistory(base: number, slope: number, oscillation: number, offset = 0): number[] {
  return Array.from({ length: 20 }, (_, index) => ({
    val: Number((base + index * slope + Math.sin(index / 2.5 + offset) * oscillation).toFixed(2)),
  })).map((point) => point.val);
}

export const copyTradingCopy: CopyTradingCopy = {
  header: {
    title: {
      key: 'copy.trading.header.title',
      fallback: 'Resonance Scaling',
    },
    subtitle: {
      key: 'copy.trading.header.subtitle',
      fallback: 'Manage your active intuitive alignment bonds',
    },
  },
  summary: {
    totalAllocated: {
      key: 'copy.trading.summary.totalAllocated',
      fallback: 'Total Allocated',
    },
    totalPnl: {
      key: 'copy.trading.summary.totalPnl',
      fallback: 'Total PnL',
    },
  },
  status: {
    running: {
      key: 'copy.trading.status.running',
      fallback: 'Resonating',
    },
    paused: {
      key: 'copy.trading.status.paused',
      fallback: 'Dissonant',
    },
  },
  labels: {
    allocated: {
      key: 'copy.trading.labels.allocated',
      fallback: 'ALLOCATED',
    },
    pnl: {
      key: 'copy.trading.labels.pnl',
      fallback: 'PNL',
    },
  },
  actions: {
    manageSettings: {
      key: 'copy.trading.actions.manage',
      fallback: 'Manage Settings',
    },
    severBond: {
      key: 'copy.trading.actions.severBond',
      fallback: 'Sever Bond',
    },
    restoreResonance: {
      key: 'copy.trading.actions.restoreResonance',
      fallback: 'Restore Resonance',
    },
    viewChart: {
      key: 'copy.trading.actions.viewChart',
      fallback: 'View Chart',
    },
  },
};

export const copyTradingRows: CopyTradeRow[] = [
  {
    id: 'macro-strategist-alpha',
    agent: {
      key: 'agents.registry.macroAlpha.name',
      fallback: 'Macro Strategist Alpha',
    },
    style: 'cyberpunk-chrome',
    status: 'running',
    allocation: '$12,500',
    pnl: '+$1,240',
    pnlPercent: '+9.92%',
    history: buildHistory(10000, 50, 250, 0.4),
  },
  {
    id: 'meme-sniper',
    agent: {
      key: 'agents.registry.memeSniper.name',
      fallback: 'Meme Sniper',
    },
    style: 'cosmic-explorer',
    status: 'paused',
    allocation: '$2,000',
    pnl: '-$420',
    pnlPercent: '-21.0%',
    history: buildHistory(2000, -10, 180, 1.2),
  },
  {
    id: 'whale-tracker-ai',
    agent: {
      key: 'agents.registry.whaleTracker.name',
      fallback: 'Whale Tracker AI',
    },
    style: 'minimalist-ai',
    status: 'running',
    allocation: '$8,500',
    pnl: '+$3,420',
    pnlPercent: '+40.2%',
    history: buildHistory(5000, 150, 480, 0.8),
  },
];

export const copyTradingViewModel: CopyTradingViewModel = {
  header: copyTradingCopy.header,
  summary: copyTradingCopy.summary,
  status: copyTradingCopy.status,
  labels: copyTradingCopy.labels,
  actions: copyTradingCopy.actions,
  rows: copyTradingRows,
};
