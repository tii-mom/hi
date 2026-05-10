import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('renders the extracted landing value props and hero node labels', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /tacit internalization/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /heuristic resonance/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /emergent consensus/i })).toBeInTheDocument();
    expect(screen.getByText(/friction net/i)).toBeInTheDocument();
    expect(screen.getByText(/entropy scanner/i)).toBeInTheDocument();
    expect(screen.getByText(/meme heuristic/i)).toBeInTheDocument();
    expect(screen.getByText(/liquidity intuition/i)).toBeInTheDocument();
  });
});
