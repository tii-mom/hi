import { describe, expect, it } from 'vitest';
import { createFrontendServiceContext, getServiceReadiness } from './config';
import { createHttpClient } from './httpClient';
import { createIntegrationBoundaryContract, wrapMockReadModel } from './contracts';
import { createCopyTradingViewModel } from './copy';
import { loadTerminalReadModel } from './readModels';
import { createTelegramCompanionViewModel, selectTelegramCompanionResponse } from './telegram';

const t = (key: string, fallback?: string) => fallback ?? key;

describe('app service contracts', () => {
  it('reports mock mode when the production API boundary is not configured', () => {
    const context = createFrontendServiceContext();
    const readiness = getServiceReadiness({ ...context, apiBaseUrl: undefined });
    const contract = createIntegrationBoundaryContract({ ...context, apiBaseUrl: undefined });

    expect(readiness.mode).toBe('mock');
    expect(readiness.health).toBe('unconfigured');
    expect(contract.readonlyResources).toContain('terminal');
    expect(contract.identityEntrypoints).toEqual(['walletconnect', 'telegram-launch-params', 'session-cookie']);
    expect(contract.executionSurfaces).toContain('risk-kill-switch');
  });

  it('wraps mock read models in explicit async resource metadata', () => {
    const resource = wrapMockReadModel({ title: 'Mock terminal' }, { now: () => new Date('2026-05-10T00:00:00.000Z'), online: true });

    expect(resource.status).toBe('success');
    expect(resource.meta.source).toBe('mock');
    expect(resource.meta.updatedAt).toBe('2026-05-10T00:00:00.000Z');
  });

  it('keeps unconfigured HTTP clients from pretending to be live services', async () => {
    const client = createHttpClient({ now: () => new Date('2026-05-10T00:00:00.000Z'), online: true });
    const result = await client.getJson('/terminal');

    expect(result.status).toBe('error');
    expect(result.error?.code).toBe('unconfigured');
    expect(result.meta.source).toBe('mock');
  });

  it('loads mock-backed read models through the adapter boundary when the api base is absent', async () => {
    const resource = await loadTerminalReadModel(
      t,
      {
        btcPrice: 64250,
        btcHistory: [{ time: 1, value: 64250 }],
      },
      { context: { now: () => new Date('2026-05-10T00:00:00.000Z'), online: true } },
    );

    expect(resource.status).toBe('success');
    expect(resource.meta.source).toBe('mock');
    expect(resource.data?.market.symbol).toBe('BTC/USD');
  });

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
