import { createSystemStressData, riskLevels, riskViewModel as riskData } from './data';
import type { RiskCopy } from './types';
import { translate, type FrontendTranslator } from '@/features/copy/viewModel';

const copy = (t: FrontendTranslator, item: RiskCopy) => translate(t, item.key, { defaultValue: item.fallback });

export interface RiskPageViewModel {
  title: string;
  statusLabel: string;
  statusResonant: string;
  statusSevering: string;
  defconLabel: string;
  serverTimeLabel: string;
  totalExposureLabel: string;
  totalExposureUsd: number;
  protocolTitle: string;
  protocolArmedText: string;
  protocolDisarmedText: string;
  protocolActionText: string;
  protocolSubtext: string;
  protocolArmingNotice: string;
  metricsTitle: string;
  leverageLabel: string;
  leverageScaleMin: string;
  leverageScaleMax: string;
  varLabel: string;
  heatmapTitle: string;
  heatmapAllocationLabel: string;
  heatmapLegend: Record<string, string>;
  heatmapAgents: Array<{
    id: string;
    name: string;
    exposurePercent: number;
    strategy: string;
    risk: (typeof riskLevels)[number];
    colSpanClass: string;
  }>;
  stressTitle: string;
  stressBadge: string;
  stressAreas: {
    liquidity: string;
    overall: string;
  };
}

export function createRiskViewModel(t: FrontendTranslator) {
  return {
    ...riskData,
    title: copy(t, riskData.title),
    statusLabel: copy(t, riskData.statusLabel),
    statusResonant: copy(t, riskData.statusResonant),
    statusSevering: copy(t, riskData.statusSevering),
    defconLabel: copy(t, riskData.defconLabel),
    serverTimeLabel: copy(t, riskData.serverTimeLabel),
    totalExposureLabel: copy(t, riskData.totalExposureLabel),
    protocolTitle: copy(t, riskData.protocolTitle),
    protocolArmedText: copy(t, riskData.protocolArmedText),
    protocolDisarmedText: copy(t, riskData.protocolDisarmedText),
    protocolActionText: copy(t, riskData.protocolActionText),
    protocolSubtext: copy(t, riskData.protocolSubtext),
    protocolArmingNotice: copy(t, riskData.protocolArmingNotice),
    metricsTitle: copy(t, riskData.metricsTitle),
    leverageLabel: copy(t, riskData.leverageLabel),
    leverageScaleMin: copy(t, riskData.leverageScaleMin),
    leverageScaleMax: copy(t, riskData.leverageScaleMax),
    varLabel: copy(t, riskData.varLabel),
    heatmapTitle: copy(t, riskData.heatmapTitle),
    heatmapAllocationLabel: copy(t, riskData.heatmapAllocationLabel),
    heatmapLegend: Object.fromEntries(
      Object.entries(riskData.heatmapLegend).map(([key, value]) => [key, copy(t, value)]),
    ) as Record<string, string>,
    heatmapAgents: riskData.heatmapAgents.map((agent) => ({
      ...agent,
      name: copy(t, agent.name),
      strategy: copy(t, agent.strategy),
    })),
    stressTitle: copy(t, riskData.stressTitle),
    stressBadge: copy(t, riskData.stressBadge),
    stressAreas: {
      liquidity: copy(t, riskData.stressAreas.liquidity),
      overall: copy(t, riskData.stressAreas.overall),
    },
  };
}


export { createSystemStressData };
