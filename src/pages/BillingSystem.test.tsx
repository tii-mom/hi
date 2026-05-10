import { useEffect, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppProvider, useAppState } from '@/app/state';
import BillingSystem from './BillingSystem';

function renderBilling() {
  return render(
    <AppProvider>
      <BillingSystem />
    </AppProvider>,
  );
}

function ConnectedWallet({ children }: { children: ReactNode }) {
  const { connectWallet } = useAppState();

  useEffect(() => {
    connectWallet('HI Operator 01');
  }, [connectWallet]);

  return <>{children}</>;
}

describe('BillingSystem', () => {
  it('renders billing feature data with the wallet display fallback', () => {
    renderBilling();

    expect(screen.getByRole('heading', { name: /epoch neural billing/i })).toBeInTheDocument();
    expect(screen.getByText('0x742...8F9a')).toBeInTheDocument();
    expect(screen.getByText(/wallet yield \(70%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/lifetime yield/i)).toBeInTheDocument();
    expect(screen.getByText(/macro strategist alpha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /claim/i })).toBeInTheDocument();
  });

  it('uses the global app wallet label when the display state is connected', async () => {
    render(
      <AppProvider>
        <ConnectedWallet>
          <BillingSystem />
        </ConnectedWallet>
      </AppProvider>,
    );

    expect(await screen.findByText('HI Operator 01')).toBeInTheDocument();
  });
});
