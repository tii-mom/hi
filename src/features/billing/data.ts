import type { BillingBondStatus, BillingMetricTone, BillingViewModel, BillingYieldSegmentTone } from './types';

export const yieldSegmentToneClasses: Record<BillingYieldSegmentTone, string> = {
  emerald: 'bg-accent-emerald/20 text-accent-emerald hover:bg-accent-emerald/30',
  blue: 'bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30',
  white: 'bg-white/10 text-white hover:bg-white/20',
};

export const summaryMetricToneClasses: Record<BillingMetricTone, string> = {
  emerald: 'text-accent-emerald',
  blue: 'text-accent-blue',
  white: 'text-white',
};

export const bondStatusToneClasses: Record<BillingBondStatus, string> = {
  active: 'text-accent-emerald border-accent-emerald/20 bg-accent-emerald/10',
  trial: 'text-orange-400 border-orange-400/20 bg-orange-400/10',
  paused: 'text-text-secondary border-white/10 bg-white/5',
};

export const billingViewModel: BillingViewModel = {
  title: {
    key: 'billing.header.title',
    fallback: 'Epoch Neural Billing',
  },
  subtitle: {
    key: 'billing.header.subtitle',
    fallback: 'Manage structural capital alignment and heuristic extraction yields.',
  },
  walletDisplay: {
    title: {
      key: 'billing.wallet.title',
      fallback: 'Connected Identity',
    },
    network: {
      key: 'billing.wallet.network',
      fallback: 'BASE_MAINNET',
    },
    identityFallback: {
      key: 'billing.wallet.identityFallback',
      fallback: '0x742...8F9a',
    },
    liquidityLabel: {
      key: 'billing.wallet.liquidity',
      fallback: 'Available Liquidity',
    },
    usdAmount: {
      key: 'billing.wallet.usdAmount',
      fallback: '$12.4K',
    },
    usdTicker: {
      key: 'billing.wallet.usdTicker',
      fallback: 'USDC',
    },
    ethAmount: {
      key: 'billing.wallet.ethAmount',
      fallback: '2.41',
    },
    ethTicker: {
      key: 'billing.wallet.ethTicker',
      fallback: 'ETH',
    },
    manageAction: {
      key: 'billing.wallet.manage',
      fallback: 'Manage Wallet',
    },
  },
  yieldRatio: {
    title: {
      key: 'billing.ratio.title',
      fallback: 'Yield Synthesis Ratio (Smart Contract)',
    },
    segments: [
      {
        id: 'wallet-yield',
        label: {
          key: 'billing.ratio.walletYield',
          fallback: 'Wallet Yield (70%)',
        },
        valuePercent: 70,
        tone: 'emerald',
      },
      {
        id: 'entity-fee',
        label: {
          key: 'billing.ratio.entityFee',
          fallback: 'Tacit Entity Fee (20%)',
        },
        valuePercent: 20,
        tone: 'blue',
      },
      {
        id: 'protocol-alignment',
        label: {
          key: 'billing.ratio.protocolAlignment',
          fallback: 'Protocol Alignment (10%)',
        },
        valuePercent: 10,
        tone: 'white',
      },
    ],
  },
  summaryMetrics: [
    {
      id: 'lifetime-yield',
      label: {
        key: 'billing.summary.lifetimeYield.label',
        fallback: 'Lifetime Yield',
      },
      value: {
        key: 'billing.summary.lifetimeYield.value',
        fallback: '+$4,291.50',
      },
      tone: 'emerald',
    },
    {
      id: 'paid-to-agents',
      label: {
        key: 'billing.summary.paidToAgents.label',
        fallback: 'Paid to Agents',
      },
      value: {
        key: 'billing.summary.paidToAgents.value',
        fallback: '-$1,226.14',
      },
      tone: 'blue',
    },
    {
      id: 'pending-harvest',
      label: {
        key: 'billing.summary.pendingHarvest.label',
        fallback: 'Pending Harvest',
      },
      value: {
        key: 'billing.summary.pendingHarvest.value',
        fallback: '$142.10',
      },
      tone: 'white',
      action: {
        key: 'billing.summary.pendingHarvest.action',
        fallback: 'Claim',
      },
    },
  ],
  logicBonds: {
    title: {
      key: 'billing.logicBonds.title',
      fallback: 'Active Logic Bonds',
    },
    limitPrefix: {
      key: 'billing.logicBonds.limitPrefix',
      fallback: 'LIMIT',
    },
    revokeAction: {
      key: 'billing.logicBonds.revoke',
      fallback: 'Revoke',
    },
    statusLabels: {
      active: {
        key: 'billing.logicBonds.status.active',
        fallback: 'Active',
      },
      trial: {
        key: 'billing.logicBonds.status.trial',
        fallback: 'Trial',
      },
      paused: {
        key: 'billing.logicBonds.status.paused',
        fallback: 'Paused',
      },
    },
    items: [
      {
        id: 'macro-strategist-alpha',
        agent: {
          key: 'agents.registry.macroAlpha.name',
          fallback: 'Macro Strategist Alpha',
        },
        fee: {
          key: 'billing.logicBonds.fee.performance20',
          fallback: '20% Performance',
        },
        limit: {
          key: 'billing.logicBonds.limit.macroMultiplier',
          fallback: '10K USDC Multiplier',
        },
        status: 'active',
      },
      {
        id: 'risk-guardian-v2',
        agent: {
          key: 'agents.registry.riskGuard.name',
          fallback: 'Risk Guardian V2',
        },
        fee: {
          key: 'billing.logicBonds.fee.monthly50',
          fallback: '50 USDC / mo',
        },
        limit: {
          key: 'billing.logicBonds.limit.globalVeto',
          fallback: 'Global Account Veto',
        },
        status: 'trial',
      },
      {
        id: 'meme-sniper',
        agent: {
          key: 'agents.registry.memeSniper.name',
          fallback: 'Meme Sniper',
        },
        fee: {
          key: 'billing.logicBonds.fee.performance30',
          fallback: '30% Performance',
        },
        limit: {
          key: 'billing.logicBonds.limit.maxTx',
          fallback: '1K USDC Max Tx',
        },
        status: 'paused',
      },
    ],
  },
};
