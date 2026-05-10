import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SkillMarketplace from './SkillMarketplace';

function enterSynthesisMode() {
  render(<SkillMarketplace />);
  fireEvent.click(screen.getByRole('button', { name: /synthesize heuristics/i }));
}

function selectSkill(name: RegExp) {
  fireEvent.click(screen.getByRole('button', { name }));
}

describe('SkillMarketplace', () => {
  afterEach(() => {
    try {
      vi.clearAllTimers();
    } catch {
      // no-op
    }
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('switches into synthesis mode', () => {
    render(<SkillMarketplace />);

    fireEvent.click(screen.getByRole('button', { name: /synthesize heuristics/i }));

    expect(screen.getByRole('button', { name: /cancel synthesis/i })).toBeInTheDocument();
  });

  it('enables synthesis after selecting two skills', () => {
    enterSynthesisMode();

    selectSkill(/meme resonance radar/i);
    expect(screen.getByRole('button', { name: /synthesize selected \(1\/3\)/i })).toBeDisabled();

    selectSkill(/smart money intuition/i);
    expect(screen.getByRole('button', { name: /synthesize selected \(2\/3\)/i })).toBeEnabled();
  });

  it('shows the loading modal while fusion is processing', () => {
    vi.useFakeTimers();

    enterSynthesisMode();
    selectSkill(/meme resonance radar/i);
    selectSkill(/smart money intuition/i);
    fireEvent.click(screen.getByRole('button', { name: /synthesize selected \(2\/3\)/i }));

    expect(screen.getByRole('heading', { name: /synthesizing intuition/i })).toBeInTheDocument();
    expect(screen.getByText(/forging non-verbal neural associations/i)).toBeInTheDocument();
  });

  it('reveals the fused skill after the synthesis timer completes', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);

    enterSynthesisMode();
    selectSkill(/meme resonance radar/i);
    selectSkill(/smart money intuition/i);
    fireEvent.click(screen.getByRole('button', { name: /synthesize selected \(2\/3\)/i }));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/synthesis complete/i)).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /oracle heuristic/i }).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/synthesis successful! a deeper, unquantifiable experiential capability has emerged\./i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /internalize heuristic/i })).toBeInTheDocument();
  });
});
