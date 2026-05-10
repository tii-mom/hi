import type { PortfolioViewModel } from './types';

export const portfolioViewModel: PortfolioViewModel = {
  title: {
    key: 'portfolio.header.title',
    fallback: 'Tacit Exposure Matrix',
  },
  subtitle: {
    key: 'portfolio.header.subtitle',
    fallback: 'Intuitive mapping of capital against systemic volatility',
  },
  totalManagedLabel: {
    key: 'portfolio.header.totalManaged',
    fallback: 'Total Managed Alignment',
  },
  totalManagedUsd: 4291090,
  weightingTitle: {
    key: 'portfolio.weighting.title',
    fallback: 'Heuristic Weighting',
  },
  resonanceLabel: {
    key: 'portfolio.weighting.resonance',
    fallback: 'Resonance',
  },
  resonancePercent: 98.4,
  positionsTitle: {
    key: 'portfolio.positions.title',
    fallback: 'Active Intuitive Positions',
  },
  positionLabels: {
    managedBy: {
      key: 'portfolio.positions.labels.managedBy',
      fallback: 'Managed by',
    },
    size: {
      key: 'portfolio.positions.labels.size',
      fallback: 'Size',
    },
    entryMark: {
      key: 'portfolio.positions.labels.entryMark',
      fallback: 'Entry / Mark',
    },
    pnl: {
      key: 'portfolio.positions.labels.pnl',
      fallback: 'PNL',
    },
    bond: {
      key: 'portfolio.positions.labels.bond',
      fallback: 'Bond',
    },
  },
  positionTypes: {
    long: {
      key: 'portfolio.positions.types.long',
      fallback: 'LONG',
    },
    hedge: {
      key: 'portfolio.positions.types.hedge',
      fallback: 'HEDGE',
    },
    short: {
      key: 'portfolio.positions.types.short',
      fallback: 'SHORT',
    },
  },
  allocations: [
    {
      id: 'defi-primitives',
      label: {
        key: 'portfolio.allocations.defiPrimitives',
        fallback: 'DeFi Primitives',
      },
      valuePercent: 40,
      color: '#3b82f6',
    },
    {
      id: 'stable-yield',
      label: {
        key: 'portfolio.allocations.stableYield',
        fallback: 'Stable Yield',
      },
      valuePercent: 30,
      color: '#10b981',
    },
    {
      id: 'entropy-meme',
      label: {
        key: 'portfolio.allocations.entropyMeme',
        fallback: 'Entropy/Meme',
      },
      valuePercent: 15,
      color: '#f97316',
    },
    {
      id: 'on-chain-ai',
      label: {
        key: 'portfolio.allocations.onChainAi',
        fallback: 'On-chain AI',
      },
      valuePercent: 15,
      color: '#8b5cf6',
    },
  ],
  metrics: [
    {
      id: 'structural-friction',
      label: {
        key: 'portfolio.metrics.structuralFriction.label',
        fallback: 'Structural Friction',
      },
      value: {
        key: 'portfolio.metrics.structuralFriction.value',
        fallback: 'Low Variance',
      },
      tone: 'blue',
    },
    {
      id: 'entropy-drift',
      label: {
        key: 'portfolio.metrics.entropyDrift.label',
        fallback: 'Entropy Drift',
      },
      value: {
        key: 'portfolio.metrics.entropyDrift.value',
        fallback: '+14.2% daily',
      },
      tone: 'orange',
    },
  ],
  positions: [
    {
      id: 'btc-perp-macro',
      pair: 'BTC-PERP',
      manager: {
        key: 'portfolio.positions.managers.macroAi',
        fallback: 'Macro AI',
      },
      sizeUsd: 1200000,
      entryPrice: 64200,
      markPrice: 68100,
      pnlPercent: 6.07,
      type: 'long',
      bond: {
        key: 'portfolio.positions.bonds.high',
        fallback: 'High',
      },
    },
    {
      id: 'sol-perp-chaos',
      pair: 'SOL-PERP',
      manager: {
        key: 'portfolio.positions.managers.chaosAi',
        fallback: 'Chaos AI',
      },
      sizeUsd: 400000,
      entryPrice: 142.5,
      markPrice: 138.2,
      pnlPercent: -3.01,
      type: 'long',
      bond: {
        key: 'portfolio.positions.bonds.medium',
        fallback: 'Med',
      },
    },
    {
      id: 'eth-perp-fund',
      pair: 'ETH-PERP',
      manager: {
        key: 'portfolio.positions.managers.fundAi',
        fallback: 'Fund AI',
      },
      sizeUsd: 850000,
      entryPrice: 3100,
      markPrice: 3050,
      pnlPercent: -1.61,
      type: 'hedge',
      bond: {
        key: 'portfolio.positions.bonds.low',
        fallback: 'Low',
      },
    },
    {
      id: 'pepe-perp-meme',
      pair: 'PEPE-PERP',
      manager: {
        key: 'portfolio.positions.managers.memeAi',
        fallback: 'Meme AI',
      },
      sizeUsd: 100000,
      entryPrice: 0.000008,
      markPrice: 0.000012,
      pnlPercent: 50,
      type: 'long',
      bond: {
        key: 'portfolio.positions.bonds.extreme',
        fallback: 'Extreme',
      },
    },
  ],
};
