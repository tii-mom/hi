import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AgentProfile from './AgentProfile';

function renderProfile(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/terminal/agent/:id" element={<AgentProfile />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('AgentProfile', () => {
  it('renders the selected agent from the route parameter', () => {
    renderProfile('/terminal/agent/macro-alpha');

    expect(screen.getByRole('heading', { name: /macro strategist alpha/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy strategy/i })).toBeInTheDocument();
    expect(screen.getByText(/GLOBAL_MACRO/i)).toBeInTheDocument();
  });

  it('renders a profile-level empty state for unknown agents', () => {
    renderProfile('/terminal/agent/unknown-id');

    expect(screen.getByRole('heading', { name: /agent profile not found/i })).toBeInTheDocument();
    expect(screen.getByText(/unknown-id/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to registry/i })).toHaveAttribute('href', '/terminal/agents');
  });
});
