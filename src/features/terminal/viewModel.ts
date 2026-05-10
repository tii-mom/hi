import type { TerminalAgentState, TerminalMarketState, TerminalStat, TerminalTimelineEvent } from './types';
import { aiMemoryItems, portfolioReasoningItems, terminalStats, terminalTimelineEvents, terminalTimeframes } from './data';
import { translate, type FrontendTranslator } from '@/features/copy/viewModel';

export interface TerminalPageViewModel {
  stats: TerminalStat[];
  market: TerminalMarketState;
  agentStates: TerminalAgentState[];
  timelineEvents: TerminalTimelineEvent[];
  portfolioReasoningItems: typeof portfolioReasoningItems;
  aiMemoryItems: typeof aiMemoryItems;
}

export function createTerminalViewModel(params: {
  btcPrice: number;
  btcHistory: Array<{ time: string | number; value: number }>;
  t: FrontendTranslator;
}): TerminalPageViewModel {
  const { btcPrice, btcHistory, t } = params;
  const terminalStatKeys = ['uptime', 'pathways', 'confidence', 'sentiment'] as const;

  const stats = terminalStats.map((stat, index) => {
    const key = terminalStatKeys[index];

    return {
      ...stat,
      label: translate(t, `terminal.stats.${key}.label`, stat.label),
      value: key === 'sentiment' ? translate(t, `terminal.stats.${key}.value`, stat.value) : stat.value,
      change: translate(t, `terminal.stats.${key}.change`, stat.change),
    };
  });

  return {
    stats,
    market: {
      symbol: 'BTC/USD',
      price: btcPrice,
      changeLabel: '+1.45%',
      streamLabel: translate(t, 'terminal.market.stream.realtime', 'Realtime'),
      activeTimeframe: '5M',
      timeframes: terminalTimeframes,
      history: btcHistory.map((point) => ({ ...point, time: String(point.time) })),
    },
    agentStates: [
      {
        name: translate(t, 'terminal.agentStates.macro.name', 'Macro AI'),
        role: translate(t, 'terminal.agentStates.macro.role', 'Macro'),
        confidence: 92,
        status: translate(t, 'terminal.agentStates.status.scanning', 'Scanning'),
        focus: translate(t, 'terminal.agentStates.macro.focus', 'BTC structure'),
        colorClass: 'bg-accent-blue',
      },
      {
        name: translate(t, 'terminal.agentStates.risk.name', 'Risk AI'),
        role: translate(t, 'terminal.agentStates.risk.role', 'Risk'),
        confidence: 88,
        status: translate(t, 'terminal.agentStates.status.active', 'Active'),
        focus: translate(t, 'terminal.agentStates.risk.focus', 'Exposure'),
        colorClass: 'bg-accent-emerald',
      },
      {
        name: translate(t, 'terminal.agentStates.whale.name', 'Whale AI'),
        role: translate(t, 'terminal.agentStates.whale.role', 'Flow'),
        confidence: 95,
        status: translate(t, 'terminal.agentStates.status.tracking', 'Tracking'),
        focus: translate(t, 'terminal.agentStates.whale.focus', 'Wallets'),
        colorClass: 'bg-orange-500',
      },
      {
        name: translate(t, 'terminal.agentStates.entropy.name', 'Entropy AI'),
        role: translate(t, 'terminal.agentStates.entropy.role', 'Noise'),
        confidence: 76,
        status: translate(t, 'terminal.agentStates.status.idle', 'Idle'),
        focus: translate(t, 'terminal.agentStates.entropy.focus', 'Drift'),
        colorClass: 'bg-[#94a3b8]',
      },
    ],
    timelineEvents: terminalTimelineEvents,
    portfolioReasoningItems,
    aiMemoryItems,
  };
}
