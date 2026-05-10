export type BillingBondStatus = 'active' | 'trial' | 'paused';

export type BillingMetricTone = 'emerald' | 'blue' | 'white';

export type BillingYieldSegmentTone = 'emerald' | 'blue' | 'white';

export interface BillingCopy {
  key: string;
  fallback: string;
}

export interface BillingWalletDisplay {
  title: BillingCopy;
  network: BillingCopy;
  identityFallback: BillingCopy;
  liquidityLabel: BillingCopy;
  usdAmount: BillingCopy;
  usdTicker: BillingCopy;
  ethAmount: BillingCopy;
  ethTicker: BillingCopy;
  manageAction: BillingCopy;
}

export interface BillingYieldSegment {
  id: string;
  label: BillingCopy;
  valuePercent: number;
  tone: BillingYieldSegmentTone;
}

export interface BillingSummaryMetric {
  id: string;
  label: BillingCopy;
  value: BillingCopy;
  tone: BillingMetricTone;
  action?: BillingCopy;
}

export interface BillingLogicBond {
  id: string;
  agent: BillingCopy;
  fee: BillingCopy;
  limit: BillingCopy;
  status: BillingBondStatus;
}

export interface BillingViewModel {
  title: BillingCopy;
  subtitle: BillingCopy;
  walletDisplay: BillingWalletDisplay;
  yieldRatio: {
    title: BillingCopy;
    segments: BillingYieldSegment[];
  };
  summaryMetrics: BillingSummaryMetric[];
  logicBonds: {
    title: BillingCopy;
    limitPrefix: BillingCopy;
    revokeAction: BillingCopy;
    statusLabels: Record<BillingBondStatus, BillingCopy>;
    items: BillingLogicBond[];
  };
}
