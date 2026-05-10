import { describe, expect, it } from 'vitest';
import {
  createAgentMarketplaceViewModel,
  createAgentProfileViewModel,
} from '@/app/services/agents';
import { createCopyTradingViewModel } from '@/app/services/copy';
import { createPortfolioViewModel } from '@/app/services/portfolio';
import { createRiskViewModel, createSystemStressData } from '@/app/services/risk';
import { createTelegramCompanionViewModel } from '@/app/services/telegram';
import { createTerminalViewModel } from '@/app/services/terminal';

const t = (key: string, optionsOrFallback?: { defaultValue?: string } | string) => {
  if (typeof optionsOrFallback === 'string') {
    return optionsOrFallback;
  }

  return optionsOrFallback?.defaultValue ?? key;
};

describe('frontend service contracts', () => {
  it('keeps terminal service output page-ready and runtime-free', () => {
    const viewModel = createTerminalViewModel({
      btcPrice: 64250,
      btcHistory: [{ time: 1, value: 64250 }],
      t,
    });

    expect(viewModel.market.symbol).toBe('BTC/USD');
    expect(viewModel.market.history).toHaveLength(1);
    expect(viewModel.stats).toHaveLength(4);
    expect(viewModel.agentStates.every((agent) => agent.confidence > 0)).toBe(true);
  });

  it('keeps portfolio and risk services resolved for page rendering', () => {
    const portfolio = createPortfolioViewModel(t);
    const risk = createRiskViewModel(t);

    expect(portfolio.allocations.every((item) => typeof item.name === 'string')).toBe(true);
    expect(portfolio.positions.every((position) => typeof position.manager === 'string')).toBe(true);
    expect(risk.heatmapAgents.every((agent) => typeof agent.strategy === 'string')).toBe(true);
    expect(createSystemStressData()).toHaveLength(40);
  });

  it('keeps agents, copy, and telegram surfaces behind stable frontend services', () => {
    const marketplace = createAgentMarketplaceViewModel(t);
    const knownProfile = createAgentProfileViewModel(t, 'macro-alpha');
    const missingProfile = createAgentProfileViewModel(t, 'missing-agent');
    const telegram = createTelegramCompanionViewModel(t);
    const copy = createCopyTradingViewModel(t);

    expect(marketplace.agents.length).toBeGreaterThan(0);
    expect(knownProfile.agent?.id).toBe('macro-alpha');
    expect(missingProfile.agent).toBeUndefined();
    expect(copy.rows.length).toBeGreaterThan(0);
    expect(telegram.header.title).toBeTruthy();
  });
});
