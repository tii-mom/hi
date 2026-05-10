import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Portfolio from './Portfolio';

describe('Portfolio', () => {
  it('renders portfolio view model copy and positions', () => {
    render(<Portfolio />);

    expect(screen.getByRole('heading', { name: /tacit exposure matrix/i })).toBeInTheDocument();
    expect(screen.getByText(/active intuitive positions/i)).toBeInTheDocument();
    expect(screen.getByText('BTC-PERP')).toBeInTheDocument();
  });
});
