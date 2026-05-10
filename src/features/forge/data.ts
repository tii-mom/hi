import type { ForgeViewModel } from './types';

export const forgeViewModel: ForgeViewModel = {
  title: {
    key: 'forge.header.title',
    fallback: 'Intuition Forge',
  },
  subtitle: {
    key: 'forge.header.subtitle',
    fallback: 'Synthesize base intelligence, tacit thresholds, and experiential heuristics to forge a new autonomous entity.',
  },
  incubateAction: {
    key: 'forge.header.action',
    fallback: 'Incubate Agent (0.5 ETH)',
  },
  modelSectionTitle: {
    key: 'forge.sections.model',
    fallback: '1. Explicit Intelligence Base',
  },
  personalitySectionTitle: {
    key: 'forge.sections.personality',
    fallback: '2. Tacit Friction Thresholds',
  },
  seedSectionTitle: {
    key: 'forge.sections.seeds',
    fallback: '3. Seed Heuristics',
  },
  previewTitle: {
    key: 'forge.preview.title',
    fallback: 'Entity Preview',
  },
  modelOptions: [
    {
      id: 'gpt-4',
      name: {
        key: 'forge.models.gpt4.name',
        fallback: 'GPT-4 Omni',
      },
      description: {
        key: 'forge.models.gpt4.description',
        fallback: 'High reasoning, balanced analytical capabilities. Best for macro trading.',
      },
      level: {
        key: 'forge.models.gpt4.level',
        fallback: 'Lvl 1',
      },
      tone: 'blue',
    },
    {
      id: 'claude-3',
      name: {
        key: 'forge.models.claude35.name',
        fallback: 'Claude 3.5 Sonnet',
      },
      description: {
        key: 'forge.models.claude35.description',
        fallback: 'Fast execution, code-native. Best for high-frequency or arbitrage strategies.',
      },
      level: {
        key: 'forge.models.claude35.level',
        fallback: 'Lvl 1',
      },
      tone: 'emerald',
    },
  ],
  personalityThresholds: [
    {
      id: 'stiff',
      label: {
        key: 'forge.personality.stiff',
        fallback: 'Stiff',
      },
    },
    {
      id: 'fluid',
      label: {
        key: 'forge.personality.fluid',
        fallback: 'Fluid',
      },
    },
    {
      id: 'reactive',
      label: {
        key: 'forge.personality.reactive',
        fallback: 'Reactive',
      },
    },
    {
      id: 'chaotic',
      label: {
        key: 'forge.personality.chaotic',
        fallback: 'Chaotic',
      },
    },
  ],
  seedHeuristicSlots: [
    {
      id: 'ingest-trait',
      kind: 'action',
      label: {
        key: 'forge.seeds.ingest.label',
        fallback: 'Ingest Trait',
      },
    },
    {
      id: 'emergent-pattern-scan',
      kind: 'active',
      label: {
        key: 'forge.seeds.pattern.label',
        fallback: 'Emergent Pattern Scan',
      },
      badge: {
        key: 'forge.seeds.pattern.badge',
        fallback: 'Lvl 1',
      },
    },
    {
      id: 'locked-matrix',
      kind: 'locked',
      label: {
        key: 'forge.seeds.locked.label',
        fallback: 'Locked Matrix',
      },
    },
  ],
  previewIdentity: {
    name: {
      key: 'forge.preview.name',
      fallback: 'Unnamed_Entity_01',
    },
    classification: {
      key: 'forge.preview.classification',
      fallback: 'CLASS: HYBRID',
    },
    generation: {
      key: 'forge.preview.generation',
      fallback: 'GEN: 2',
    },
  },
  previewMetrics: [
    {
      id: 'explicit-reasoning',
      label: {
        key: 'forge.metrics.explicitReasoning.label',
        fallback: 'Explicit Reasoning',
      },
      tone: 'blue',
      valuePercent: 85,
    },
    {
      id: 'tacit-index',
      label: {
        key: 'forge.metrics.tacitIndex.label',
        fallback: 'Tacit Index',
      },
      tone: 'violet',
      valuePercent: 92,
    },
    {
      id: 'entropy-seeking',
      label: {
        key: 'forge.metrics.entropySeeking.label',
        fallback: 'Entropy Seeking',
      },
      tone: 'emerald',
      valuePercent: 40,
      valuePercentByPersonality: {
        stiff: 40,
        fluid: 40,
        reactive: 75,
        chaotic: 100,
      },
    },
  ],
};
