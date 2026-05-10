import type { TFunction } from 'i18next';
import { copyTradingViewModel as copyData } from './data';
import type { CopyTradeRow, FeatureCopy } from './types';

export type FrontendTranslator = TFunction | ((key: string, fallbackOrOptions?: { defaultValue?: string } | string) => string);

export function translate(t: FrontendTranslator, key: string, fallbackOrOptions?: { defaultValue?: string } | string) {
  return (t as (key: string, fallbackOrOptions?: { defaultValue?: string } | string) => string)(key, fallbackOrOptions);
}

const copy = (t: FrontendTranslator, item: FeatureCopy) => translate(t, item.key, item.fallback);

export interface CopyTradingPageViewModel {
  header: {
    title: string;
    subtitle: string;
  };
  summary: {
    totalAllocatedLabel: string;
    totalAllocatedValue: string;
    totalPnlLabel: string;
    totalPnlValue: string;
  };
  status: Record<CopyTradeRow['status'], string>;
  labels: {
    allocated: string;
    pnl: string;
  };
  actions: {
    manageSettings: string;
    severBond: string;
    restoreResonance: string;
    viewChart: string;
  };
  rows: Array<Omit<CopyTradeRow, 'agent'> & { agentName: string }>;
}

export function createCopyTradingViewModel(t: FrontendTranslator): CopyTradingPageViewModel {
  return {
    header: {
      title: copy(t, copyData.header.title),
      subtitle: copy(t, copyData.header.subtitle),
    },
    summary: {
      totalAllocatedLabel: copy(t, copyData.summary.totalAllocated),
      totalAllocatedValue: '$23,000.00',
      totalPnlLabel: copy(t, copyData.summary.totalPnl),
      totalPnlValue: '+$4,240.00',
    },
    status: {
      running: copy(t, copyData.status.running),
      paused: copy(t, copyData.status.paused),
    },
    labels: {
      allocated: copy(t, copyData.labels.allocated),
      pnl: copy(t, copyData.labels.pnl),
    },
    actions: {
      manageSettings: copy(t, copyData.actions.manageSettings),
      severBond: copy(t, copyData.actions.severBond),
      restoreResonance: copy(t, copyData.actions.restoreResonance),
      viewChart: copy(t, copyData.actions.viewChart),
    },
    rows: copyData.rows.map((row) => ({
      ...row,
      agentName: copy(t, row.agent),
    })),
  };
}
