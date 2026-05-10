import type { TerminalAgentState, TerminalMarketState, TerminalStat, TerminalTimelineEvent } from './types';
import { aiMemoryItems, portfolioReasoningItems, terminalStats, terminalTimelineEvents, terminalTimeframes } from './data';

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
  btcHistory: TerminalMarketState['history'];
  t: (key: string, fallback: string) => string;
}): TerminalPageViewModel {
  const { btcPrice, btcHistory, t } = params;
  const terminalStatKeys = ['uptime', 'pathways', 'confidence', 'sentiment'] as const;

  const stats = terminalStats.map((stat, index) => {
    const key = terminalStatKeys[index];

    return {
      ...stat,
      label: t(`terminal.stats.${key}.label`, stat.label),
      value: key === 'sentiment' ? t(`terminal.stats.${key}.value`, stat.value) : stat.value,
      change: t(`terminal.stats.${key}.change`, stat.change),
    };
  });

  return {
    stats,
    market: {
      symbol: 'BTC/USD',
      price: btcPrice,
      changeLabel: '+1.45%',
      streamLabel: t('terminal.market.stream.realtime', 'Realtime'),
      activeTimeframe: '5M',
      timeframes: terminalTimeframes,
      history: btcHistory,
    },
    agentStates: [
      {
        name: t('terminal.agentStates.macro.name', 'Macro AI'),
        role: t('terminal.agentStates.macro.role', 'Macro'),
        confidence: 92,
        status: t('terminal.agentStates.status.scanning', 'Scanning'),
        focus: t('terminal.agentStates.macro.focus', 'BTC structure'),
        colorClass: 'bg-accent-blue',
      },
      {
        name: t('terminal.agentStates.risk.name', 'Risk AI'),
        role: t('terminal.agentStates.risk.role', 'Risk'),
        confidence: 88,
        status: t('terminal.agentStates.status.active', 'Active'),
        focus: t('terminal.agentStates.risk.focus', 'Exposure'),
        colorClass: 'bg-accent-emerald',
      },
      {
        name: t('terminal.agentStates.whale.name', 'Whale AI'),
        role: t('terminal.agentStates.whale.role', 'Flow'),
        confidence: 95,
        status: t('terminal.agentStates.status.tracking', 'Tracking'),
        focus: t('terminal.agentStates.whale.focus', 'Wallets'),
        colorClass: 'bg-orange-500',
      },
      {
        name: t('terminal.agentStates.entropy.name', 'Entropy AI'),
        role: t('terminal.agentStates.entropy.role', 'Noise'),
        confidence: 76,
        status: t('terminal.agentStates.status.idle', 'Idle'),
        focus: t('terminal.agentStates.entropy.focus', 'Drift'),
        colorClass: 'bg-[#94a3b8]',
      },
    ],
    timelineEvents: terminalTimelineEvents,
    portfolioReasoningItems,
    aiMemoryItems,
  };
}
