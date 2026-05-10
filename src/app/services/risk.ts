import { createRiskViewModel, createSystemStressData } from '@/features/risk/viewModel';

export type RiskService = {
  createViewModel: typeof createRiskViewModel;
  createSystemStressData: typeof createSystemStressData;
};

export const riskService: RiskService = {
  createViewModel: createRiskViewModel,
  createSystemStressData,
};

export { createRiskViewModel, createSystemStressData };
export type { RiskPageViewModel } from '@/features/risk/viewModel';
