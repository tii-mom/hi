import { describe, expect, it } from 'vitest';
import { createCopyTradingViewModel } from './copy';
import { createTelegramCompanionViewModel, selectTelegramCompanionResponse } from './telegram';

const t = (key: string, fallback?: string) => fallback ?? key;

describe('app service contracts', () => {
  it('resolves copy trading strings at the service boundary', () => {
    const viewModel = createCopyTradingViewModel(t);

    expect(viewModel.header.title).toBe('Resonance Scaling');
    expect(viewModel.rows[0].agentName).toBe('Macro Strategist Alpha');
    expect(viewModel.summary.totalAllocatedValue).toBe('$23,000.00');
  });

  it('resolves telegram companion strings at the service boundary', () => {
    const viewModel = createTelegramCompanionViewModel(t);
    const response = selectTelegramCompanionResponse(t, 'report status');

    expect(viewModel.header.title).toBe('Neural Link');
    expect(viewModel.input.sendLabel).toBe('Send prompt');
    expect(response.text).toBe('Synthesizing global resonance...');
    expect(response.widgetData?.risk).toBe('Medium');
  });
});
