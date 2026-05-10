import type { AgentMarketplaceViewModel, AgentProfileViewModel } from './agents';
import type { CopyTradingPageViewModel } from './copy';
import type { PortfolioPageViewModel } from './portfolio';
import type { RiskPageViewModel } from './risk';
import type { TelegramCompanionPageViewModel } from './telegram';
import type { TerminalPageViewModel } from './terminal';
import type { AsyncResource, FrontendServiceContext, ServiceReadiness } from './types';
import { createSuccessResource } from './types';
import { getServiceReadiness } from './config';

export interface FrontendReadModelContract {
  terminal: AsyncResource<TerminalPageViewModel>;
  portfolio: AsyncResource<PortfolioPageViewModel>;
  risk: AsyncResource<RiskPageViewModel>;
  agents: AsyncResource<AgentMarketplaceViewModel>;
  agentProfile: AsyncResource<AgentProfileViewModel>;
  copyTrading: AsyncResource<CopyTradingPageViewModel>;
  telegramCompanion: AsyncResource<TelegramCompanionPageViewModel>;
}

export interface IntegrationBoundaryContract {
  readiness: ServiceReadiness;
  readonlyResources: Array<keyof FrontendReadModelContract>;
  identityEntrypoints: Array<'walletconnect' | 'telegram-launch-params' | 'session-cookie'>;
  realtimeChannels: Array<'terminal-feed' | 'risk-alerts' | 'telegram-events'>;
  executionSurfaces: Array<'copy-trading' | 'agent-actions' | 'risk-kill-switch' | 'billing'>;
}

export function createIntegrationBoundaryContract(
  context?: FrontendServiceContext,
): IntegrationBoundaryContract {
  return {
    readiness: getServiceReadiness(context),
    readonlyResources: ['terminal', 'portfolio', 'risk', 'agents', 'agentProfile', 'copyTrading', 'telegramCompanion'],
    identityEntrypoints: ['walletconnect', 'telegram-launch-params', 'session-cookie'],
    realtimeChannels: ['terminal-feed', 'risk-alerts', 'telegram-events'],
    executionSurfaces: ['copy-trading', 'agent-actions', 'risk-kill-switch', 'billing'],
  };
}

export function wrapMockReadModel<T>(data: T, context?: FrontendServiceContext): AsyncResource<T> {
  return createSuccessResource(data, {
    source: 'mock',
    updatedAt: context?.now().toISOString(),
    staleAfterMs: 30_000,
  });
}
