import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from '@/components/layout/Header';
import { AppProvider, useAppState } from './AppProvider';

function AppStateProbe() {
  const {
    authModalOpen,
    walletStatus,
    connectedIdentityLabel,
    openAuthModal,
    setWalletConnecting,
    connectWallet,
    disconnectWallet,
  } = useAppState();

  return (
    <div>
      <div data-testid="auth-modal-state">{authModalOpen ? 'open' : 'closed'}</div>
      <div data-testid="wallet-status">{walletStatus}</div>
      <div data-testid="identity-label">{connectedIdentityLabel}</div>
      <button type="button" onClick={openAuthModal}>
        Open auth
      </button>
      <button type="button" onClick={setWalletConnecting}>
        Start connection
      </button>
      <button type="button" onClick={() => connectWallet('HI Operator 01')}>
        Confirm connection
      </button>
      <button type="button" onClick={disconnectWallet}>
        Disconnect
      </button>
    </div>
  );
}

describe('AppProvider', () => {
  it('tracks wallet connection state across app consumers', () => {
    render(
      <AppProvider>
        <AppStateProbe />
      </AppProvider>,
    );

    expect(screen.getByTestId('auth-modal-state')).toHaveTextContent('closed');
    expect(screen.getByTestId('wallet-status')).toHaveTextContent('disconnected');
    expect(screen.getByTestId('identity-label')).toHaveTextContent('No identity connected');

    fireEvent.click(screen.getByRole('button', { name: /open auth/i }));
    expect(screen.getByTestId('auth-modal-state')).toHaveTextContent('open');

    fireEvent.click(screen.getByRole('button', { name: /start connection/i }));
    expect(screen.getByTestId('wallet-status')).toHaveTextContent('connecting');

    fireEvent.click(screen.getByRole('button', { name: /confirm connection/i }));
    expect(screen.getByTestId('auth-modal-state')).toHaveTextContent('closed');
    expect(screen.getByTestId('wallet-status')).toHaveTextContent('connected');
    expect(screen.getByTestId('identity-label')).toHaveTextContent('HI Operator 01');

    fireEvent.click(screen.getByRole('button', { name: /disconnect/i }));
    expect(screen.getByTestId('wallet-status')).toHaveTextContent('disconnected');
    expect(screen.getByTestId('identity-label')).toHaveTextContent('No identity connected');
  });

  it('opens the global wallet identity modal from the shell header', () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AppProvider>,
    );

    expect(screen.getByText('Connect')).toBeInTheDocument();

    const walletButton = screen.getByRole('button', { name: /wallet identity/i });
    expect(walletButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(walletButton);

    expect(walletButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { name: /connect identity/i })).toBeInTheDocument();
  });
});
