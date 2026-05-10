import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppProvider } from '@/app/state';
import { TelegramProvider } from '@/features/telegram';
import BottomNav from './BottomNav';
import Header from './Header';
import Sidebar from './Sidebar';

function renderWithApp(ui: React.ReactElement, initialPath = '/terminal') {
  return render(
    <AppProvider>
      <TelegramProvider>
        <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
      </TelegramProvider>
    </AppProvider>,
  );
}

describe('layout accessibility hardening', () => {
  it('marks bottom navigation and sidebar links with page-current semantics', () => {
    renderWithApp(
      <Routes>
        <Route path="/terminal/portfolio" element={<><BottomNav /><Sidebar /></>} />
      </Routes>,
      '/terminal/portfolio',
    );

    expect(screen.getAllByRole('navigation')).toHaveLength(2);
    expect(screen.getByRole('link', { name: /assets/i })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /exposure matrix/i })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /term/i })).not.toHaveAttribute('aria-current');
  });

  it('opens the auth modal as a dialog, traps tab focus, and restores focus on escape', async () => {
    renderWithApp(<Header />);

    const walletButton = screen.getByRole('button', { name: /wallet identity/i });
    walletButton.focus();
    fireEvent.click(walletButton);

    const dialog = await screen.findByRole('dialog', { name: /connect identity/i });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(walletButton).toHaveAttribute('aria-expanded', 'true');

    await waitFor(() => expect(screen.getByRole('button', { name: /close identity modal/i })).toHaveFocus());

    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: /base wallet/i })).toHaveFocus();

    fireEvent.keyDown(dialog, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(walletButton).toHaveFocus();
  });
});
