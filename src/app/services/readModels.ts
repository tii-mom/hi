import { createAgentMarketplaceViewModel, createAgentProfileViewModel } from './agents';
import { createCopyTradingViewModel } from './copy';
import { createFrontendServiceContext } from './config';
import { createHttpClient } from './httpClient';
import { createPortfolioViewModel } from './portfolio';
import { createRiskViewModel } from './risk';
import { createTelegramCompanionViewModel } from './telegram';
import { createTerminalViewModel } from './terminal';
import { wrapMockReadModel } from './contracts';
import type { AsyncResource, FrontendServiceContext } from './types';
import type { AgentMarketplaceViewModel, AgentProfileViewModel } from './agents';
import type { CopyTradingPageViewModel } from './copy';
import type { PortfolioPageViewModel } from './portfolio';
import type { RiskPageViewModel } from './risk';
import type { TelegramCompanionPageViewModel } from './telegram';
import type { TerminalPageViewModel } from './terminal';
import type { FrontendTranslator } from '@/features/copy/viewModel';

interface TerminalFallbackInput {
  btcPrice: number;
  btcHistory: Array<{ time: string | number; value: number }>;
}

interface ReadModelOptions {
  context?: FrontendServiceContext;
}

function resolveContext(context?: FrontendServiceContext) {
  return context ?? createFrontendServiceContext();
}

function shouldUseMock(context: FrontendServiceContext) {
  return !context.apiBaseUrl;
}

async function loadLiveOrMock<T>(
  path: string,
  createMock: () => T,
  options?: ReadModelOptions,
): Promise<AsyncResource<T>> {
  const context = resolveContext(options?.context);

  if (shouldUseMock(context)) {
    return wrapMockReadModel(createMock(), context);
  }

  return createHttpClient(context).getJson<T>(path);
}

export function loadTerminalReadModel(
  t: FrontendTranslator,
  fallback: TerminalFallbackInput,
  options?: ReadModelOptions,
) {
  return loadLiveOrMock<TerminalPageViewModel>(
    '/frontend/terminal',
    () => createTerminalViewModel({ ...fallback, t }),
    options,
  );
}

export function loadPortfolioReadModel(t: FrontendTranslator, options?: ReadModelOptions) {
  return loadLiveOrMock<PortfolioPageViewModel>('/frontend/portfolio', () => createPortfolioViewModel(t), options);
}

export function loadRiskReadModel(t: FrontendTranslator, options?: ReadModelOptions) {
  return loadLiveOrMock<RiskPageViewModel>('/frontend/risk', () => createRiskViewModel(t), options);
}

export function loadAgentsReadModel(t: FrontendTranslator, options?: ReadModelOptions) {
  return loadLiveOrMock<AgentMarketplaceViewModel>('/frontend/agents', () => createAgentMarketplaceViewModel(t), options);
}

export function loadAgentProfileReadModel(agentId: string, t: FrontendTranslator, options?: ReadModelOptions) {
  return loadLiveOrMock<AgentProfileViewModel>(
    `/frontend/agents/${encodeURIComponent(agentId)}`,
    () => createAgentProfileViewModel(t, agentId),
    options,
  );
}

export function loadCopyTradingReadModel(t: FrontendTranslator, options?: ReadModelOptions) {
  return loadLiveOrMock<CopyTradingPageViewModel>('/frontend/copy-trading', () => createCopyTradingViewModel(t), options);
}

export function loadTelegramCompanionReadModel(t: FrontendTranslator, options?: ReadModelOptions) {
  return loadLiveOrMock<TelegramCompanionPageViewModel>(
    '/frontend/telegram-companion',
    () => createTelegramCompanionViewModel(t),
    options,
  );
}
