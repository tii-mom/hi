import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { copyTradingViewModel } from '@/features/copy';
import CopyTrading from './CopyTrading';

describe('CopyTrading', () => {
  it('renders localized shell copy and stable copy rows', () => {
    render(<CopyTrading />);

    expect(screen.getByRole('heading', { name: /resonance scaling/i })).toBeInTheDocument();
    expect(screen.getByText(/manage your active intuitive alignment bonds/i)).toBeInTheDocument();
    expect(screen.getByText('$23,000.00')).toBeInTheDocument();
    expect(screen.getByText('+$4,240.00')).toBeInTheDocument();
    expect(screen.getByText('Macro Strategist Alpha')).toBeInTheDocument();
    expect(screen.getAllByText('Resonating')).toHaveLength(2);
    expect(screen.getByText('Dissonant')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /manage settings/i })).toHaveLength(copyTradingViewModel.rows.length);

    expect(copyTradingViewModel.rows.map((row) => row.id)).toEqual([
      'macro-strategist-alpha',
      'meme-sniper',
      'whale-tracker-ai',
    ]);
    expect(copyTradingViewModel.rows.every((row) => row.history.every((value) => typeof value === 'number'))).toBe(
      true,
    );
  });
});
