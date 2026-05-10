import { createAgentMarketplaceViewModel, createAgentProfileViewModel } from '@/features/agents/viewModel';

export type AgentsService = {
  createMarketplaceViewModel: typeof createAgentMarketplaceViewModel;
  createProfileViewModel: typeof createAgentProfileViewModel;
};

export const agentsService: AgentsService = {
  createMarketplaceViewModel: createAgentMarketplaceViewModel,
  createProfileViewModel: createAgentProfileViewModel,
};

export { createAgentMarketplaceViewModel, createAgentProfileViewModel };
export type { AgentMarketplaceViewModel, AgentProfileViewModel } from '@/features/agents/viewModel';
