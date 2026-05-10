import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { selectTelegramCompanionResponse } from '@/features/telegram/companion';
import TelegramCompanion from './TelegramCompanion';

afterEach(() => {
  vi.useRealTimers();
});

describe('TelegramCompanion', () => {
  it('renders localized shell copy and controls', () => {
    render(<TelegramCompanion />);

    expect(screen.getByRole('heading', { name: /neural link/i })).toBeInTheDocument();
    expect(screen.getByText(/tacit synchronization active/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/share your constraints, ask for resonance/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /record voice prompt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send prompt/i })).toBeDisabled();
    expect(
      screen.getByText(/tacit os context: active portfolio \/ base mainnet \/ neutral volatility/i),
    ).toBeInTheDocument();
  });

  it('preserves user input and resolves the report widget response', async () => {
    vi.useFakeTimers();
    render(<TelegramCompanion />);

    const input = screen.getByPlaceholderText(/share your constraints, ask for resonance/i);
    fireEvent.change(input, { target: { value: 'status report please' } });

    expect(input).toHaveValue('status report please');

    fireEvent.click(screen.getByRole('button', { name: /send prompt/i }));

    expect(screen.getByText('status report please')).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(screen.getByText(/synthesizing\.\.\./i)).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1800);
    });

    expect(screen.getByText(/synthesizing global resonance\.\.\./i)).toBeInTheDocument();
    expect(screen.getByText(/system orchestrator/i)).toBeInTheDocument();
    expect(screen.getByText(/btc alignment/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1\.2%/)).toBeInTheDocument();
    expect(screen.getByText(/eth alignment/i)).toBeInTheDocument();
    expect(screen.getByText(/-0\.4%/)).toBeInTheDocument();
    expect(screen.getByText(/entropy \/ risk/i)).toBeInTheDocument();
    expect(screen.getByText(/medium/i)).toBeInTheDocument();
    expect(selectTelegramCompanionResponse('buy the dip').id).toBe('trade');
    expect(selectTelegramCompanionResponse('hello there').id).toBe('default');
  });
});
