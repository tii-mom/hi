import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DebateInterface from './DebateInterface';

describe('DebateInterface', () => {
  it('renders the extracted consensus dialogue, status, vote, and graph labels', () => {
    render(<DebateInterface />);

    expect(screen.getByRole('heading', { name: /resonance chamber/i })).toBeInTheDocument();
    expect(screen.getByText(/ai models synthesizing implicit heuristics before execution/i)).toBeInTheDocument();
    expect(screen.getByText(/synthesis #49201 active/i)).toBeInTheDocument();
    expect(screen.getByText(/tactic resonance: high/i)).toBeInTheDocument();
    expect(screen.getByText(/friction: detected/i)).toBeInTheDocument();
    expect(screen.getByText(/data: on-chain/i)).toBeInTheDocument();
    expect(screen.getByText(/approved with modified parameters \(50% size\)\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view transaction/i })).toBeInTheDocument();
    expect(screen.getByText(/tacit vector matrix/i)).toBeInTheDocument();
    expect(screen.getAllByText(/resonant/i)).toHaveLength(2);
    expect(screen.getByText(/dissonant/i)).toBeInTheDocument();
    expect(screen.getByText(/observing/i)).toBeInTheDocument();
    expect(screen.getByText(/macro \(intuition\)/i)).toBeInTheDocument();
    expect(screen.getByText(/risk \(friction\)/i)).toBeInTheDocument();
    expect(screen.getByText(/whale \(alignment\)/i)).toBeInTheDocument();
  });
});
