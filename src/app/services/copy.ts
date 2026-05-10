import { createCopyTradingViewModel } from '@/features/copy/viewModel';
import { copyTradingViewModel as copyTradingData } from '@/features/copy/data';

export type CopyTradingService = {
  createViewModel: typeof createCopyTradingViewModel;
};

export const copyTradingService: CopyTradingService = {
  createViewModel: createCopyTradingViewModel,
};

export const copyTradingViewModel = copyTradingData;
export { createCopyTradingViewModel };
export type { CopyTradingPageViewModel } from '@/features/copy/viewModel';
