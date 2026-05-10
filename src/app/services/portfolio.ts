import { createPortfolioViewModel } from '@/features/portfolio/viewModel';

export type PortfolioService = {
  createViewModel: typeof createPortfolioViewModel;
};

export const portfolioService: PortfolioService = {
  createViewModel: createPortfolioViewModel,
};

export { createPortfolioViewModel };
export type { PortfolioPageViewModel } from '@/features/portfolio/viewModel';
