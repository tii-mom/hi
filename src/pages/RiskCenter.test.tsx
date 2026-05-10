import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RiskCenter from './RiskCenter';

describe('RiskCenter', () => {
  it('renders risk shell copy and kill switch interactions', () => {
    render(<RiskCenter />);

    expect(screen.getByRole('heading', { name: /global friction monitor/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /disarmed: click to arm/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /disarmed: click to arm/i }));
    expect(screen.getByRole('button', { name: /armed: click to disarm/i })).toBeInTheDocument();
  });
});
