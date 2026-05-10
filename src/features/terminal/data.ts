import type {
  AIMemoryItem,
  PortfolioReasoningItem,
  TerminalStat,
  TerminalTimelineEvent,
} from './types';

export const terminalTimeframes = ['1M', '5M', '15M', '1H'];

export const terminalStats: TerminalStat[] = [
  { label: 'System Uptime', value: '99.99%', change: 'OPERATIONAL', trend: 'up' },
  { label: 'Active Neural Pathways', value: '42,891', change: '+124', trend: 'up' },
  { label: 'Global Confidence', value: '94.2%', change: 'HIGH', trend: 'up' },
  { label: 'Market Sentiment', value: 'Risk-On', change: 'ALIGNED', trend: 'up' },
];

export const terminalTimelineEvents: TerminalTimelineEvent[] = [
  {
    id: 1,
    time: '09:14',
    agent: 'MacroCore',
    icon: 'activity',
    type: 'observation',
    text: 'Detected bullish divergence on 1H BTC chart.',
    colorClass: 'text-accent-blue',
  },
  {
    id: 2,
    time: '09:16',
    agent: 'FrictionSentinel',
    icon: 'shield',
    type: 'rejection',
    text: 'Risk rejected leverage increase. Volatility spike anticipated.',
    colorClass: 'text-accent-emerald',
  },
  {
    id: 3,
    time: '09:18',
    agent: 'OnChainPulse',
    icon: 'zap',
    type: 'confirmation',
    text: 'Whale accumulation confirmed at 64k support band.',
    colorClass: 'text-orange-500',
  },
  {
    id: 4,
    time: '09:20',
    agent: 'Consensus',
    icon: 'layers',
    type: 'decision',
    text: 'Approval granted for spot accumulation.',
    colorClass: 'text-accent-violet',
    badge: 'CONSENSUS_REACHED',
  },
  {
    id: 5,
    time: '09:21',
    agent: 'ExecutionStatus',
    icon: 'cpu',
    type: 'execution',
    text: 'TWAP order display state prepared. Execution logic remains protocol-side.',
    colorClass: 'text-text-primary',
  },
];

export const portfolioReasoningItems: PortfolioReasoningItem[] = [
  {
    asset: 'BTC',
    allocation: '45%',
    value: '$1.2M',
    reason: 'Primary store of value. Macro AI confirms safe-haven inflows amid CPI uncertainty.',
    confidence: 92,
  },
  {
    asset: 'SOL',
    allocation: '25%',
    value: '$650k',
    reason: 'High conviction momentum play. OnChainPulse detected sustained DEX volume growth.',
    confidence: 85,
  },
  {
    asset: 'USDC',
    allocation: '30%',
    value: '$800k',
    reason: 'Dry powder reserved. FrictionSentinel flagged upcoming volatility event.',
    confidence: 99,
  },
];

export const aiMemoryItems: AIMemoryItem[] = [
  {
    id: 1,
    query: 'Current Volatility Profile',
    match: 'ETF Approval Cycle (Jan 2024)',
    similarity: '94%',
    insight: 'Market structure closely resembles pre-ETF launch dynamics. Expect sudden liquidity vacuums.',
  },
  {
    id: 2,
    query: 'Whale Accumulation Pattern',
    match: 'Q3 2023 Bottom Formation',
    similarity: '88%',
    insight: 'Wallets >1k BTC are exhibiting identical dormancy behaviors seen prior to the Q4 markup.',
  },
  {
    id: 3,
    query: 'Macro Correlation',
    match: '2022 Fed Pivot Speculation',
    similarity: '76%',
    insight: 'Equities correlation decoupling. AI suggests isolated crypto narrative formation.',
  },
];
