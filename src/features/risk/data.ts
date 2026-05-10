import type { RiskStressPoint, RiskViewModel } from './types';

export const riskViewModel: RiskViewModel = {
  title: {
    key: 'risk.header.title',
    fallback: 'Global Friction Monitor',
  },
  statusLabel: {
    key: 'risk.header.statusLabel',
    fallback: 'SYS_STATUS',
  },
  statusResonant: {
    key: 'risk.header.status.resonant',
    fallback: 'RESONANT',
  },
  statusSevering: {
    key: 'risk.header.status.severing',
    fallback: 'SEVERING BONDS',
  },
  defconLabel: {
    key: 'risk.header.defcon',
    fallback: 'DEFCON 4',
  },
  serverTimeLabel: {
    key: 'risk.header.serverTime',
    fallback: 'SERVER_TIME',
  },
  totalExposureLabel: {
    key: 'risk.header.totalExposure',
    fallback: 'TOTAL_EXPOSURE',
  },
  totalExposureUsd: 142491000,
  protocolTitle: {
    key: 'risk.protocol.title',
    fallback: 'Dissonance Protocol',
  },
  protocolArmedText: {
    key: 'risk.protocol.armed',
    fallback: 'ARMED: CLICK TO DISARM',
  },
  protocolDisarmedText: {
    key: 'risk.protocol.disarmed',
    fallback: 'DISARMED: CLICK TO ARM',
  },
  protocolActionText: {
    key: 'risk.protocol.action',
    fallback: 'KILL SWITCH',
  },
  protocolSubtext: {
    key: 'risk.protocol.subtitle',
    fallback: 'Sever All Neuropathways',
  },
  protocolArmingNotice: {
    key: 'risk.protocol.notice',
    fallback: 'SYSTEM ARMED. CONFIRM NEURAL SEVER.',
  },
  metricsTitle: {
    key: 'risk.metrics.title',
    fallback: 'System Metrics',
  },
  leverageLabel: {
    key: 'risk.metrics.leverage',
    fallback: 'Global Effective Leverage',
  },
  leverageScaleMin: {
    key: 'risk.metrics.leverageScaleMin',
    fallback: '1x (Delta Neutral)',
  },
  leverageScaleMax: {
    key: 'risk.metrics.leverageScaleMax',
    fallback: 'Max Allowable: 5x',
  },
  varLabel: {
    key: 'risk.metrics.var',
    fallback: '95% Value at Risk (VaR)',
  },
  heatmapTitle: {
    key: 'risk.heatmap.title',
    fallback: 'Agent Risk Exposure Heatmap',
  },
  heatmapAllocationLabel: {
    key: 'risk.heatmap.allocation',
    fallback: 'ALLOC',
  },
  heatmapLegend: {
    high: {
      key: 'risk.heatmap.legend.high',
      fallback: 'High',
    },
    medium: {
      key: 'risk.heatmap.legend.medium',
      fallback: 'Med',
    },
    low: {
      key: 'risk.heatmap.legend.low',
      fallback: 'Low',
    },
  },
  heatmapAgents: [
    {
      id: 'macro',
      name: {
        key: 'agents.macro.name',
        fallback: 'Macro AI',
      },
      exposurePercent: 45,
      strategy: {
        key: 'risk.heatmap.strategies.longBtc',
        fallback: 'Long BTC',
      },
      risk: 'medium',
      colSpanClass: 'col-span-2',
    },
    {
      id: 'arb-bot-1',
      name: {
        key: 'risk.heatmap.agents.arbBot1',
        fallback: 'Arb-Bot-1',
      },
      exposurePercent: 12,
      strategy: {
        key: 'risk.heatmap.strategies.basis',
        fallback: 'Basis',
      },
      risk: 'low',
      colSpanClass: 'col-span-1',
    },
    {
      id: 'liquidity-hunter',
      name: {
        key: 'risk.heatmap.agents.liquidityHunter',
        fallback: 'LiquidityHunter',
      },
      exposurePercent: 85,
      strategy: {
        key: 'risk.heatmap.strategies.leveragedShort',
        fallback: 'Leveraged Short',
      },
      risk: 'high',
      colSpanClass: 'col-span-1',
    },
    {
      id: 'risk',
      name: {
        key: 'agents.risk.name',
        fallback: 'Risk AI',
      },
      exposurePercent: 5,
      strategy: {
        key: 'risk.heatmap.strategies.hedging',
        fallback: 'Hedging',
      },
      risk: 'low',
      colSpanClass: 'col-span-1',
    },
    {
      id: 'sentiment-driven',
      name: {
        key: 'risk.heatmap.agents.sentimentDriven',
        fallback: 'SentimentDriven',
      },
      exposurePercent: 62,
      strategy: {
        key: 'risk.heatmap.strategies.memeCoins',
        fallback: 'Meme Coins',
      },
      risk: 'high',
      colSpanClass: 'col-span-2',
    },
    {
      id: 'yield-farmer',
      name: {
        key: 'risk.heatmap.agents.yieldFarmer',
        fallback: 'YieldFarmer',
      },
      exposurePercent: 28,
      strategy: {
        key: 'risk.heatmap.strategies.stableLps',
        fallback: 'Stable LPs',
      },
      risk: 'low',
      colSpanClass: 'col-span-1',
    },
  ],
  stressTitle: {
    key: 'risk.stress.title',
    fallback: 'Tacit Dissonance Monitor',
  },
  stressBadge: {
    key: 'risk.stress.badge',
    fallback: 'Live Friction Data',
  },
  stressAreas: {
    liquidity: {
      key: 'risk.stress.series.liquidity',
      fallback: 'Liquidity Risk',
    },
    overall: {
      key: 'risk.stress.series.overall',
      fallback: 'Total Stress Index',
    },
  },
};

export const createSystemStressData = (): RiskStressPoint[] =>
  Array.from({ length: 40 }).map((_, index) => {
    const trendFactor = index > 30 ? index - 30 : 0;

    return {
      id: `stress-${index}`,
      time: index,
      liquidityRisk: 12 + index * 0.35 + trendFactor * 1.8,
      counterpartyRisk: 8 + index * 0.22,
      overall: 18 + index * 0.55 + trendFactor * 1.4,
    };
  });
