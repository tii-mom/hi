import type { LucideIcon } from 'lucide-react';

export type SkillRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface FeatureCopy {
  key: string;
  fallback: string;
}

export interface SkillSummary {
  id: string;
  name: string;
  rarity: SkillRarity;
  power: number;
  activeBonds: string;
}

export interface SkillMarketplaceCard {
  id: string;
  name: FeatureCopy;
  rarity: SkillRarity;
  power: number;
  users: string;
  icon: LucideIcon;
  bgClass: string;
  colorClass: string;
  borderClass: string;
}

export interface SkillMarketplaceCopy {
  header: {
    title: FeatureCopy;
    subtitle: FeatureCopy;
  };
  actions: {
    synthesize: FeatureCopy;
    cancel: FeatureCopy;
    synthesizeSelected: FeatureCopy;
  };
  metrics: {
    tacitWeight: FeatureCopy;
    activeBonds: FeatureCopy;
    epochs: FeatureCopy;
  };
  modal: {
    loadingTitle: FeatureCopy;
    loadingSubtitle: FeatureCopy;
    successTitle: FeatureCopy;
    successBody: FeatureCopy;
    successAction: FeatureCopy;
  };
  rarities: Record<SkillRarity, FeatureCopy>;
}
