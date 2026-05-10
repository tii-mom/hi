import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppProvider, useAppState } from '@/app/state';
import { TelegramProvider } from '@/features/telegram';
import App from '@/App';
import { supportedLanguages } from '@/i18n';

function collectLeafKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    collectLeafKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

function AppStateProbe() {
  const { walletStatus, connectedIdentityLabel } = useAppState();

  return (
    <div>
      <div data-testid="wallet-status">{walletStatus}</div>
      <div data-testid="identity-label">{connectedIdentityLabel}</div>
    </div>
  );
}

describe('release readiness', () => {
  it('keeps locale files aligned with the supported language list', () => {
    const localesDir = path.resolve(process.cwd(), 'src/locales');
    const localeFiles = readdirSync(localesDir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace(/\.json$/, ''))
      .sort();

    expect(localeFiles).toEqual([...supportedLanguages].sort());

    const canonical = JSON.parse(readFileSync(path.join(localesDir, 'en.json'), 'utf8')) as Record<string, unknown>;
    const canonicalKeys = new Set(collectLeafKeys(canonical));

    for (const locale of localeFiles) {
      const parsed = JSON.parse(readFileSync(path.join(localesDir, `${locale}.json`), 'utf8')) as Record<string, unknown>;
      const keys = new Set(collectLeafKeys(parsed));

      expect([...canonicalKeys].filter((key) => !keys.has(key)), locale).toEqual([]);
      expect([...keys].filter((key) => !canonicalKeys.has(key)), locale).toEqual([]);
    }
  });

  it('keeps the provider defaults stable for shell consumers', () => {
    render(
      <AppProvider>
        <AppStateProbe />
      </AppProvider>,
    );

    expect(screen.getByTestId('wallet-status')).toHaveTextContent('disconnected');
    expect(screen.getByTestId('identity-label')).toHaveTextContent('No identity connected');
  });

  it('recovers unknown routes through the shared app shell', async () => {
    render(
      <AppProvider>
        <TelegramProvider>
          <MemoryRouter initialEntries={['/missing-route']}>
            <App />
          </MemoryRouter>
        </TelegramProvider>
      </AppProvider>,
    );

    expect(await screen.findByRole('heading', { name: /no active interface node/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open terminal/i })).toHaveAttribute('href', '/terminal');
  });
});
