export type PortfolioPositionType = 'long' | 'hedge' | 'short';

export interface PortfolioCopy {
  key: string;
  fallback: string;
}

export interface PortfolioAllocationSegment {
  id: string;
  label: PortfolioCopy;
  valuePercent: number;
  color: string;
}

export interface PortfolioMetric {
  id: 'structural-friction' | 'entropy-drift';
  label: PortfolioCopy;
  value: PortfolioCopy;
  tone: 'blue' | 'orange';
}

export interface PortfolioPosition {
  id: string;
  pair: string;
  manager: PortfolioCopy;
  sizeUsd: number;
  entryPrice: number;
  markPrice: number;
  pnlPercent: number;
  type: PortfolioPositionType;
  bond: PortfolioCopy;
}

export interface PortfolioViewModel {
  title: PortfolioCopy;
  subtitle: PortfolioCopy;
  totalManagedLabel: PortfolioCopy;
  totalManagedUsd: number;
  weightingTitle: PortfolioCopy;
  resonanceLabel: PortfolioCopy;
  resonancePercent: number;
  positionsTitle: PortfolioCopy;
  positionLabels: {
    managedBy: PortfolioCopy;
    size: PortfolioCopy;
    entryMark: PortfolioCopy;
    pnl: PortfolioCopy;
    bond: PortfolioCopy;
  };
  positionTypes: Record<PortfolioPositionType, PortfolioCopy>;
  allocations: PortfolioAllocationSegment[];
  metrics: PortfolioMetric[];
  positions: PortfolioPosition[];
}
