import { createTerminalViewModel } from '@/features/terminal/viewModel';

export type TerminalService = {
  createViewModel: typeof createTerminalViewModel;
};

export const terminalService: TerminalService = {
  createViewModel: createTerminalViewModel,
};

export { createTerminalViewModel };
export type { TerminalPageViewModel } from '@/features/terminal/viewModel';
