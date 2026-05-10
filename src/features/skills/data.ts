import { SearchCode, Shield, Target, TrendingDown, Zap } from 'lucide-react';
import type { FeatureCopy, SkillMarketplaceCard, SkillMarketplaceCopy } from './types';
import type { SkillRarity } from './types';

export const rarityLevels: SkillRarity[] = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];

export const skillMarketplaceCopy: SkillMarketplaceCopy = {
  header: {
    title: {
      key: 'skills.header.title',
      fallback: 'Heuristics Marketplace',
    },
    subtitle: {
      key: 'skills.header.subtitle',
      fallback: 'Trade and synthesize evolved tacit capabilities forged from experiential market history',
    },
  },
  actions: {
    synthesize: {
      key: 'skills.actions.synthesize',
      fallback: 'Synthesize Heuristics',
    },
    cancel: {
      key: 'skills.actions.cancel',
      fallback: 'Cancel Synthesis',
    },
    synthesizeSelected: {
      key: 'skills.actions.synthesizeSelected',
      fallback: 'Synthesize Selected ({{selected}}/{{limit}})',
    },
  },
  metrics: {
    tacitWeight: {
      key: 'skills.metrics.tacitWeight',
      fallback: 'TACIT WEIGHT',
    },
    activeBonds: {
      key: 'skills.metrics.activeBonds',
      fallback: 'ACTIVE BONDS',
    },
    epochs: {
      key: 'skills.metrics.epochs',
      fallback: 'EPOCHS',
    },
  },
  modal: {
    loadingTitle: {
      key: 'skills.modal.loading.title',
      fallback: 'Synthesizing Intuition...',
    },
    loadingSubtitle: {
      key: 'skills.modal.loading.subtitle',
      fallback: 'Forging non-verbal neural associations',
    },
    successTitle: {
      key: 'skills.modal.success.title',
      fallback: 'Synthesis Complete',
    },
    successBody: {
      key: 'skills.modal.success.body',
      fallback: 'Synthesis successful! A deeper, unquantifiable experiential capability has emerged.',
    },
    successAction: {
      key: 'skills.modal.success.action',
      fallback: 'Internalize Heuristic',
    },
  },
  rarities: {
    Common: { key: 'skills.rarities.common', fallback: 'Common' },
    Rare: { key: 'skills.rarities.rare', fallback: 'Rare' },
    Epic: { key: 'skills.rarities.epic', fallback: 'Epic' },
    Legendary: { key: 'skills.rarities.legendary', fallback: 'Legendary' },
    Mythic: { key: 'skills.rarities.mythic', fallback: 'Mythic' },
  },
};

export const generatedSkillNames: FeatureCopy[] = [
  { key: 'skills.generated.oracleHeuristic', fallback: 'Oracle Heuristic' },
  { key: 'skills.generated.quantumIntuition', fallback: 'Quantum Intuition' },
  { key: 'skills.generated.tacitNode', fallback: 'Tacit Node' },
  { key: 'skills.generated.singularityResonance', fallback: 'Singularity Resonance' },
  { key: 'skills.generated.omniSynthesis', fallback: 'Omni-Synthesis' },
];

export const initialSkillCatalog: SkillMarketplaceCard[] = [
  {
    id: '1',
    name: { key: 'skills.catalog.memeResonanceRadar', fallback: 'Meme Resonance Radar' },
    rarity: 'Legendary',
    power: 94,
    users: '1.2k',
    icon: Zap,
    bgClass: 'bg-orange-500/10',
    colorClass: 'text-orange-500',
    borderClass: 'border-orange-500/30',
  },
  {
    id: '2',
    name: { key: 'skills.catalog.smartMoneyIntuition', fallback: 'Smart Money Intuition' },
    rarity: 'Epic',
    power: 88,
    users: '3.4k',
    icon: SearchCode,
    bgClass: 'bg-purple-500/10',
    colorClass: 'text-purple-500',
    borderClass: 'border-purple-500/30',
  },
  {
    id: '3',
    name: { key: 'skills.catalog.blackSwanPremonition', fallback: 'Black Swan Premonition' },
    rarity: 'Legendary',
    power: 99,
    users: '800',
    icon: Shield,
    bgClass: 'bg-rose-500/10',
    colorClass: 'text-rose-500',
    borderClass: 'border-rose-500/30',
  },
  {
    id: '4',
    name: { key: 'skills.catalog.volatilityWhisperer', fallback: 'Volatility Whisperer' },
    rarity: 'Rare',
    power: 76,
    users: '8.9k',
    icon: Target,
    bgClass: 'bg-blue-500/10',
    colorClass: 'text-blue-500',
    borderClass: 'border-blue-500/30',
  },
  {
    id: '5',
    name: { key: 'skills.catalog.frictionShield', fallback: 'Friction Shield' },
    rarity: 'Common',
    power: 45,
    users: '12.4k',
    icon: Shield,
    bgClass: 'bg-slate-500/10',
    colorClass: 'text-slate-400',
    borderClass: 'border-slate-500/30',
  },
  {
    id: '6',
    name: { key: 'skills.catalog.capitulationSniper', fallback: 'Capitulation Sniper' },
    rarity: 'Epic',
    power: 82,
    users: '2.1k',
    icon: TrendingDown,
    bgClass: 'bg-emerald-500/10',
    colorClass: 'text-emerald-500',
    borderClass: 'border-emerald-500/30',
  },
];

export const rarityClassNames: Record<SkillRarity, string> = {
  Mythic: 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]',
  Legendary: 'text-orange-500 border-orange-500/20 bg-orange-500/10',
  Epic: 'text-purple-500 border-purple-500/20 bg-purple-500/10',
  Rare: 'text-blue-500 border-blue-500/20 bg-blue-500/10',
  Common: 'text-slate-400 border-slate-500/20 bg-slate-500/10',
};
