import { createTelegramCompanionViewModel, selectTelegramCompanionResponse } from '@/features/telegram/viewModel';

export type TelegramCompanionService = {
  createViewModel: typeof createTelegramCompanionViewModel;
  selectResponse: typeof selectTelegramCompanionResponse;
};

export const telegramCompanionService: TelegramCompanionService = {
  createViewModel: createTelegramCompanionViewModel,
  selectResponse: selectTelegramCompanionResponse,
};

export { createTelegramCompanionViewModel, selectTelegramCompanionResponse };
export type { TelegramCompanionPageViewModel, TelegramCompanionResolvedResponse } from '@/features/telegram/viewModel';
