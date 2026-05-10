import type { ConsensusViewModel } from './types';

export const consensusViewModel: ConsensusViewModel = {
  header: {
    subtitle: {
      key: 'consensus.header.subtitle',
      fallback: 'AI models synthesizing implicit heuristics before execution',
    },
    synthesisStatus: {
      key: 'consensus.header.synthesisStatus',
      fallback: 'Synthesis #49201 Active',
    },
  },
  dialogues: [
    {
      id: 'macro',
      name: {
        key: 'agents.macro.name',
        fallback: 'Macro AI',
      },
      status: {
        key: 'agents.macro.status',
        fallback: 'TACTIC RESONANCE: HIGH',
      },
      dialogue: {
        key: 'agents.macro.dialogue',
        fallback:
          'BTC momentum improving on 4H timeframes. Institutional volume profiles suggest accumulation near the 0.618 Fib retracement. Experiencing an intuitive pull towards LONG.',
      },
      avatarStyle: 'cyberpunk-chrome',
      statusColorClass: 'text-accent-blue',
      statusClass: 'text-text-secondary',
      borderColorClass: 'border-accent-blue/20',
      shadowColorClass: 'shadow-[0_0_15px_rgba(96,165,250,0.1)]',
      railColorClass: 'bg-accent-blue/50',
    },
    {
      id: 'risk',
      name: {
        key: 'agents.risk.name',
        fallback: 'Risk AI',
      },
      status: {
        key: 'agents.risk.status',
        fallback: 'FRICTION: DETECTED',
      },
      dialogue: {
        key: 'agents.risk.dialogue',
        fallback:
          'Sensing unspoken friction in orderbook depth. Macro environment is unstable pending policy shifts. Modulating exposure to 50%.',
      },
      avatarStyle: 'cosmic-explorer',
      statusColorClass: 'text-orange-500',
      statusClass: 'text-orange-400/80 animate-pulse',
      borderColorClass: 'border-orange-500/20',
      shadowColorClass: 'shadow-[0_0_15px_rgba(249,115,22,0.1)]',
      railColorClass: 'bg-orange-500/50',
    },
    {
      id: 'whale',
      name: {
        key: 'agents.whale.name',
        fallback: 'Whale AI',
      },
      status: {
        key: 'agents.whale.status',
        fallback: 'DATA: ON-CHAIN',
      },
      dialogue: {
        key: 'agents.whale.dialogue',
        fallback:
          'Large accumulation pattern detected via entity clustering. Capital flow indicates silent rotation into Layer 1 base assets.',
      },
      avatarStyle: 'minimalist-ai',
      statusColorClass: 'text-accent-emerald',
      statusClass: 'text-text-secondary',
      borderColorClass: 'border-accent-emerald/20',
      shadowColorClass: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
      railColorClass: 'bg-accent-emerald/50',
    },
  ],
  consensus: {
    status: {
      key: 'ui.consensusAchieved',
      fallback: 'Consensus Achieved',
    },
    message: {
      key: 'consensus.outcome.message',
      fallback: 'Approved with modified parameters (50% size).',
    },
    action: {
      key: 'ui.viewTx',
      fallback: 'View Transaction',
    },
  },
  voteMatrix: {
    title: {
      key: 'ui.vectorMatrix',
      fallback: 'Tacit Vector Matrix',
    },
    votes: [
      {
        id: 'macro',
        name: {
          key: 'agents.macro.name',
          fallback: 'Macro AI',
        },
        vote: {
          key: 'ui.resonant',
          fallback: 'RESONANT',
        },
        icon: 'check',
        colorClass: 'text-accent-emerald',
      },
      {
        id: 'risk',
        name: {
          key: 'agents.risk.name',
          fallback: 'Risk AI',
        },
        vote: {
          key: 'ui.dissonant',
          fallback: 'DISSONANT',
        },
        icon: 'x',
        colorClass: 'text-orange-500',
      },
      {
        id: 'whale',
        name: {
          key: 'agents.whale.name',
          fallback: 'Whale AI',
        },
        vote: {
          key: 'ui.resonant',
          fallback: 'RESONANT',
        },
        icon: 'check',
        colorClass: 'text-accent-emerald',
      },
      {
        id: 'meme',
        name: {
          key: 'portfolio.positions.managers.memeAi',
          fallback: 'Meme AI',
        },
        vote: {
          key: 'ui.observing',
          fallback: 'OBSERVING',
        },
        icon: 'activity',
        colorClass: 'text-text-secondary',
      },
    ],
  },
  graph: {
    title: {
      key: 'ui.intuitionGraph',
      fallback: 'Intuition Graph',
    },
    status: {
      key: 'ui.synthesizing',
      fallback: 'Synthesizing',
    },
    nodes: [
      {
        id: 'macro',
        x: '100',
        y: '25',
        initialX: '100',
        initialY: '50',
        initial: 'M',
        label: {
          key: 'consensus.graph.nodes.macro',
          fallback: 'Macro (Intuition)',
        },
      },
      {
        id: 'risk',
        x: '30',
        y: '175',
        initialX: '50',
        initialY: '150',
        initial: 'R',
        label: {
          key: 'consensus.graph.nodes.risk',
          fallback: 'Risk (Friction)',
        },
      },
      {
        id: 'whale',
        x: '170',
        y: '175',
        initialX: '150',
        initialY: '150',
        initial: 'W',
        label: {
          key: 'consensus.graph.nodes.whale',
          fallback: 'Whale (Alignment)',
        },
      },
    ],
  },
};
