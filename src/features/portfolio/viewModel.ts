import type { TFunction } from 'i18next';
import { portfolioViewModel as portfolioData } from './data';
import type { PortfolioCopy, PortfolioPositionType, PortfolioViewModel } from './types';

const copy = (t: TFunction, item: PortfolioCopy) => t(item.key, { defaultValue: item.fallback });

export interface PortfolioPageViewModel {
  title: string;
  subtitle: string;
  totalManagedLabel: string;
  weightingTitle: string;
  resonanceLabel: string;
  positionsTitle: string;
  positionLabels: {
    managedBy: string;
    size: string;
    entryMark: string;
    pnl: string;
    bond: string;
  };
  positionTypes: Record<PortfolioPositionType, string>;
  allocations: Array<{
    id: string;
    name: string;
    valuePercent: number;
    color: string;
  }>;
  metrics: Array<{
    id: PortfolioViewModel['metrics'][number]['id'];
    label: string;
    value: string;
    tone: PortfolioViewModel['metrics'][number]['tone'];
  }>;
  positions: Array<{
    id: string;
    pair: string;
    manager: string;
    sizeUsd: number;
    entryPrice: number;
    markPrice: number;
    pnlPercent: number;
    type: PortfolioViewModel['positions'][number]['type'];
    bond: string;
  }>;
}

export function createPortfolioViewModel(t: TFunction) {
  return {
    ...portfolioData,
    title: copy(t, portfolioData.title),
    subtitle: copy(t, portfolioData.subtitle),
    totalManagedLabel: copy(t, portfolioData.totalManagedLabel),
    weightingTitle: copy(t, portfolioData.weightingTitle),
    resonanceLabel: copy(t, portfolioData.resonanceLabel),
    positionsTitle: copy(t, portfolioData.positionsTitle),
    positionLabels: {
      managedBy: copy(t, portfolioData.positionLabels.managedBy),
      size: copy(t, portfolioData.positionLabels.size),
      entryMark: copy(t, portfolioData.positionLabels.entryMark),
      pnl: copy(t, portfolioData.positionLabels.pnl),
      bond: copy(t, portfolioData.positionLabels.bond),
    },
    positionTypes: {
      long: copy(t, portfolioData.positionTypes.long),
      hedge: copy(t, portfolioData.positionTypes.hedge),
      short: copy(t, portfolioData.positionTypes.short),
    },
    allocations: portfolioData.allocations.map((item) => ({
      id: item.id,
      name: copy(t, item.label),
      valuePercent: item.valuePercent,
      color: item.color,
    })),
    metrics: portfolioData.metrics.map((metric) => ({
      id: metric.id,
      label: copy(t, metric.label),
      value: copy(t, metric.value),
      tone: metric.tone,
    })),
    positions: portfolioData.positions.map((position) => ({
      ...position,
      manager: copy(t, position.manager),
      bond: copy(t, position.bond),
    })),
  };
}
