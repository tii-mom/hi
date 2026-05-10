import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ForgeStudio from './ForgeStudio';

describe('ForgeStudio', () => {
  it('renders the forge view model and updates the entropy preview', () => {
    render(<ForgeStudio />);

    expect(screen.getByRole('heading', { name: /intuition forge/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /incubate agent \(0\.5 eth\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gpt-4 omni/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chaotic/i })).toBeInTheDocument();
    expect(screen.getByText(/emergent pattern scan/i)).toBeInTheDocument();
    expect(screen.getByText(/explicit reasoning/i)).toBeInTheDocument();
    expect(screen.getByText('40/100')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /chaotic/i }));

    expect(screen.getByText('100/100')).toBeInTheDocument();
  });
});
