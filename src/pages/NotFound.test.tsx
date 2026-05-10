import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('renders route unknown state with a terminal recovery link', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText(/route unknown/i)).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAccessibleName(/no active interface node/i);
    expect(screen.getByRole('link', { name: /open terminal/i })).toHaveAttribute('href', '/terminal');
    expect(document.title).toBe('Route Unknown | HI Protocol');
  });
});
