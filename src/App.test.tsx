import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppProvider } from '@/app/state';
import { TelegramProvider } from '@/features/telegram';
import App from './App';

describe('App routing', () => {
  it('renders the 404 recovery surface for unknown routes', async () => {
    render(
      <AppProvider>
        <TelegramProvider>
          <MemoryRouter initialEntries={['/missing-route']}>
            <App />
          </MemoryRouter>
        </TelegramProvider>
      </AppProvider>,
    );

    expect(await screen.findByRole('heading', { name: /no active interface node/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open terminal/i })).toHaveAttribute('href', '/terminal');
  });

  it('renders the terminal shell on the main route', async () => {
    render(
      <AppProvider>
        <TelegramProvider>
          <MemoryRouter initialEntries={['/terminal']}>
            <App />
          </MemoryRouter>
        </TelegramProvider>
      </AppProvider>,
    );

    expect(await screen.findByRole('link', { name: /observer node/i }, { timeout: 5000 })).toHaveAttribute('href', '/terminal');
    expect(screen.getByText(/network/i)).toBeInTheDocument();
  });
});
