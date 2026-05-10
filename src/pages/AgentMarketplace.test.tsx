import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AgentMarketplace from './AgentMarketplace';

describe('AgentMarketplace', () => {
  it('renders registry cards from the agent feature data', () => {
    render(
      <MemoryRouter>
        <AgentMarketplace />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /tacit entity registry/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /macro strategist alpha/i })).toHaveAttribute(
      'href',
      '/terminal/agent/macro-alpha',
    );
    expect(screen.getAllByText(/TACIT INDEX/i).length).toBeGreaterThan(0);
  });
});
