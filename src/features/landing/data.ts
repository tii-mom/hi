import { Activity, Brain, Shield, Users, Zap, type LucideIcon } from 'lucide-react';
import type {
  LandingHeroIcon,
  LandingValuePropIcon,
  LandingValuePropTone,
  LandingValuePropToneClasses,
  LandingViewModel,
} from './types';

export const heroNodeIcons: Record<LandingHeroIcon, LucideIcon> = {
  shield: Shield,
  activity: Activity,
  users: Users,
  zap: Zap,
};

export const valuePropIcons: Record<LandingValuePropIcon, LucideIcon> = {
  brain: Brain,
  zap: Zap,
  shield: Shield,
};

export const valuePropToneClasses: Record<LandingValuePropTone, LandingValuePropToneClasses> = {
  blue: {
    wrapper: 'bg-accent-blue/10',
    icon: 'text-accent-blue',
    border: 'border-accent-blue/20',
  },
  violet: {
    wrapper: 'bg-accent-violet/10',
    icon: 'text-accent-violet',
    border: 'border-accent-violet/20',
  },
  emerald: {
    wrapper: 'bg-accent-emerald/10',
    icon: 'text-accent-emerald',
    border: 'border-accent-emerald/20',
  },
};

export const landingViewModel: LandingViewModel = {
  heroSecondaryNodes: [
    {
      id: 'friction-net',
      top: '20%',
      left: '20%',
      icon: 'shield',
      label: {
        key: 'nav.frictionNet',
        fallback: 'Friction Net',
      },
    },
    {
      id: 'entropy-scanner',
      top: '20%',
      left: '80%',
      icon: 'activity',
      label: {
        key: 'ui.entropyScanner',
        fallback: 'Entropy Scanner',
      },
    },
    {
      id: 'meme-heuristic',
      top: '75%',
      left: '25%',
      icon: 'users',
      label: {
        key: 'ui.memeHeuristic',
        fallback: 'Meme Heuristic',
      },
    },
    {
      id: 'liquidity-intuition',
      top: '75%',
      left: '75%',
      icon: 'zap',
      label: {
        key: 'ui.liquidityIntuition',
        fallback: 'Liquidity Intuition',
      },
    },
  ],
  valueProps: [
    {
      id: 'tacit-internalization',
      icon: 'brain',
      tone: 'blue',
      title: {
        key: 'landing.valueProps.tacitInternalization.title',
        fallback: 'Tacit Internalization',
      },
      description: {
        key: 'landing.valueProps.tacitInternalization.description',
        fallback:
          'Agents that absorb unquantifiable market friction and sentiment dispersion, developing an implicit "gut feeling" for price action.',
      },
    },
    {
      id: 'heuristic-resonance',
      icon: 'zap',
      tone: 'violet',
      title: {
        key: 'landing.valueProps.heuristicResonance.title',
        fallback: 'Heuristic Resonance',
      },
      description: {
        key: 'landing.valueProps.heuristicResonance.description',
        fallback:
          'Acquire fragments of tacit knowledge. Evolve your agents with rare, implicit capabilities forged from deep historic market traumas.',
      },
    },
    {
      id: 'emergent-consensus',
      icon: 'shield',
      tone: 'emerald',
      title: {
        key: 'landing.valueProps.emergentConsensus.title',
        fallback: 'Emergent Consensus',
      },
      description: {
        key: 'landing.valueProps.emergentConsensus.description',
        fallback:
          'A unique Resonance Chamber where models synthesize their non-verbal intuitions. Trades execute only when tacit alignment is achieved.',
      },
    },
  ],
};
