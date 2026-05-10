export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskCopy {
  key: string;
  fallback: string;
}

export interface RiskStressPoint {
  id: string;
  time: number;
  liquidityRisk: number;
  counterpartyRisk: number;
  overall: number;
}

export interface RiskExposureCard {
  id: string;
  name: RiskCopy;
  exposurePercent: number;
  strategy: RiskCopy;
  risk: RiskLevel;
  colSpanClass: string;
}

export interface RiskViewModel {
  title: RiskCopy;
  statusLabel: RiskCopy;
  statusResonant: RiskCopy;
  statusSevering: RiskCopy;
  defconLabel: RiskCopy;
  serverTimeLabel: RiskCopy;
  totalExposureLabel: RiskCopy;
  totalExposureUsd: number;
  protocolTitle: RiskCopy;
  protocolArmedText: RiskCopy;
  protocolDisarmedText: RiskCopy;
  protocolActionText: RiskCopy;
  protocolSubtext: RiskCopy;
  protocolArmingNotice: RiskCopy;
  metricsTitle: RiskCopy;
  leverageLabel: RiskCopy;
  leverageScaleMin: RiskCopy;
  leverageScaleMax: RiskCopy;
  varLabel: RiskCopy;
  heatmapTitle: RiskCopy;
  heatmapAllocationLabel: RiskCopy;
  heatmapLegend: Record<RiskLevel, RiskCopy>;
  heatmapAgents: RiskExposureCard[];
  stressTitle: RiskCopy;
  stressBadge: RiskCopy;
  stressAreas: {
    liquidity: RiskCopy;
    overall: RiskCopy;
  };
}
