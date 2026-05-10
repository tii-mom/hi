export type ForgeModelId = 'gpt-4' | 'claude-3';

export type ForgePersonalityId = 'stiff' | 'fluid' | 'reactive' | 'chaotic';

export type ForgeModelTone = 'blue' | 'emerald';

export type ForgeMetricTone = 'blue' | 'violet' | 'emerald';

export type ForgeSeedSlotKind = 'action' | 'active' | 'locked';

export interface ForgeCopy {
  key: string;
  fallback: string;
}

export interface ForgeModelOption {
  id: ForgeModelId;
  name: ForgeCopy;
  description: ForgeCopy;
  level: ForgeCopy;
  tone: ForgeModelTone;
}

export interface ForgePersonalityThreshold {
  id: ForgePersonalityId;
  label: ForgeCopy;
}

export interface ForgeSeedHeuristicSlot {
  id: string;
  kind: ForgeSeedSlotKind;
  label: ForgeCopy;
  badge?: ForgeCopy;
}

export interface ForgePreviewMetric {
  id: string;
  label: ForgeCopy;
  tone: ForgeMetricTone;
  valuePercent: number;
  valuePercentByPersonality?: Record<ForgePersonalityId, number>;
}

export interface ForgePreviewIdentity {
  name: ForgeCopy;
  classification: ForgeCopy;
  generation: ForgeCopy;
}

export interface ForgeViewModel {
  title: ForgeCopy;
  subtitle: ForgeCopy;
  incubateAction: ForgeCopy;
  modelSectionTitle: ForgeCopy;
  personalitySectionTitle: ForgeCopy;
  seedSectionTitle: ForgeCopy;
  previewTitle: ForgeCopy;
  modelOptions: ForgeModelOption[];
  personalityThresholds: ForgePersonalityThreshold[];
  seedHeuristicSlots: ForgeSeedHeuristicSlot[];
  previewIdentity: ForgePreviewIdentity;
  previewMetrics: ForgePreviewMetric[];
}
