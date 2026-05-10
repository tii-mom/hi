import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppProvider } from '@/app/state';
import RouteFallback from './RouteFallback';

describe('RouteFallback', () => {
  it('announces route hydration as a busy status', () => {
    render(
      <AppProvider>
        <RouteFallback />
      </AppProvider>,
    );

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(status).toHaveTextContent(/hydrating interface/i);
  });
});
