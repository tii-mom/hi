import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { TelegramProvider, useTelegramShell, type TelegramShellState } from './TelegramProvider';

const originalTelegram = window.Telegram;

function TelegramStateProbe() {
  const shellState = useTelegramShell();

  return <pre data-testid="telegram-state">{JSON.stringify(shellState)}</pre>;
}

describe('TelegramProvider', () => {
  afterEach(() => {
    if (originalTelegram) {
      window.Telegram = originalTelegram;
      return;
    }

    Reflect.deleteProperty(window, 'Telegram');
  });

  it('exposes stable non-Telegram state when window.Telegram is absent', () => {
    Reflect.deleteProperty(window, 'Telegram');

    render(
      <TelegramProvider>
        <TelegramStateProbe />
      </TelegramProvider>,
    );

    const state = JSON.parse(screen.getByTestId('telegram-state').textContent ?? '{}') as TelegramShellState;

    expect(state).toMatchObject({
      isTelegram: false,
      safeAreaInsetBottom: 0,
      colorScheme: 'unknown',
      launchParams: {},
      backButtonAvailable: false,
    });
    expect(state.viewportHeight).toBeUndefined();
    expect(state.stableViewportHeight).toBeUndefined();
  });
});
