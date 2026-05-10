import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLiveData } from '../../../hooks/useLiveData';
import { terminalStats, terminalTimeframes } from '../data';
import type { TerminalAgentState, TerminalMarketState, TerminalStat } from '../types';

const terminalStatKeys = ['uptime', 'pathways', 'confidence', 'sentiment'] as const;

export function useTerminalViewModel() {
  const { t } = useTranslation();
  const { value: btcPrice, history: btcHistory } = useLiveData(64250.0, 0.005, 1500);

  const stats = useMemo<TerminalStat[]>(
    () =>
      terminalStats.map((stat, index) => {
        const key = terminalStatKeys[index];

        return {
          ...stat,
          label: t(`terminal.stats.${key}.label`, stat.label),
          value: key === 'sentiment' ? t(`terminal.stats.${key}.value`, stat.value) : stat.value,
          change: t(`terminal.stats.${key}.change`, stat.change),
        };
      }),
    [t],
  );

  const agentStates = useMemo<TerminalAgentState[]>(
    () => [
      {
        name: t('terminal.agentStates.macro.name'),
        role: t('terminal.agentStates.macro.role'),
        confidence: 92,
        status: t('terminal.agentStates.status.scanning'),
        focus: t('terminal.agentStates.macro.focus'),
        colorClass: 'bg-accent-blue',
      },
      {
        name: t('terminal.agentStates.risk.name'),
        role: t('terminal.agentStates.risk.role'),
        confidence: 88,
        status: t('terminal.agentStates.status.active'),
        focus: t('terminal.agentStates.risk.focus'),
        colorClass: 'bg-accent-emerald',
      },
      {
        name: t('terminal.agentStates.whale.name'),
        role: t('terminal.agentStates.whale.role'),
        confidence: 95,
        status: t('terminal.agentStates.status.tracking'),
        focus: t('terminal.agentStates.whale.focus'),
        colorClass: 'bg-orange-500',
      },
      {
        name: t('terminal.agentStates.entropy.name'),
        role: t('terminal.agentStates.entropy.role'),
        confidence: 76,
        status: t('terminal.agentStates.status.idle'),
        focus: t('terminal.agentStates.entropy.focus'),
        colorClass: 'bg-[#94a3b8]',
      },
    ],
    [t],
  );

  const market = useMemo<TerminalMarketState>(
    () => ({
      symbol: 'BTC/USD',
      price: btcPrice,
      changeLabel: '+1.45%',
      streamLabel: t('terminal.market.stream.realtime'),
      activeTimeframe: '5M',
      timeframes: terminalTimeframes,
      history: btcHistory,
    }),
    [btcHistory, btcPrice, t],
  );

  return {
    stats,
    market,
    agentStates,
  };
}
