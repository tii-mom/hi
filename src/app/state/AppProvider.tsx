import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export type WalletStatus = 'disconnected' | 'connecting' | 'connected';
export type MotionPreference = 'system' | 'reduced' | 'full';

export interface AppStateValue {
  authModalOpen: boolean;
  walletStatus: WalletStatus;
  connectedIdentityLabel: string;
  motionPreference: MotionPreference;
  setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
  setWalletStatus: Dispatch<SetStateAction<WalletStatus>>;
  setConnectedIdentityLabel: Dispatch<SetStateAction<string>>;
  setMotionPreference: Dispatch<SetStateAction<MotionPreference>>;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  connectWallet: (identityLabel: string) => void;
  resetWalletConnection: () => void;
  setWalletConnecting: () => void;
  confirmWalletConnection: (identityLabel: string) => void;
  disconnectWallet: () => void;
}

const DEFAULT_CONNECTED_IDENTITY_LABEL = 'No identity connected';

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

function getInitialMotionPreference(): MotionPreference {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'system';
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'system';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [walletStatus, setWalletStatus] = useState<WalletStatus>('disconnected');
  const [connectedIdentityLabel, setConnectedIdentityLabel] = useState(DEFAULT_CONNECTED_IDENTITY_LABEL);
  const [motionPreference, setMotionPreference] = useState<MotionPreference>(getInitialMotionPreference);

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const connectWallet = useCallback((identityLabel: string) => {
    setConnectedIdentityLabel(identityLabel.trim() || DEFAULT_CONNECTED_IDENTITY_LABEL);
    setWalletStatus('connected');
    setAuthModalOpen(false);
  }, []);

  const setWalletConnecting = useCallback(() => {
    setWalletStatus('connecting');
  }, []);

  const confirmWalletConnection = useCallback((identityLabel: string) => {
    setConnectedIdentityLabel(identityLabel.trim() || DEFAULT_CONNECTED_IDENTITY_LABEL);
    setWalletStatus('connected');
  }, []);

  const resetWalletConnection = useCallback(() => {
    setWalletStatus('disconnected');
    setConnectedIdentityLabel(DEFAULT_CONNECTED_IDENTITY_LABEL);
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletStatus('disconnected');
    setConnectedIdentityLabel(DEFAULT_CONNECTED_IDENTITY_LABEL);
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      authModalOpen,
      walletStatus,
      connectedIdentityLabel,
      motionPreference,
      setAuthModalOpen,
      setWalletStatus,
      setConnectedIdentityLabel,
      setMotionPreference,
      openAuthModal,
      closeAuthModal,
      connectWallet,
      resetWalletConnection,
      setWalletConnecting,
      confirmWalletConnection,
      disconnectWallet,
    }),
    [
      authModalOpen,
      walletStatus,
      connectedIdentityLabel,
      motionPreference,
      openAuthModal,
      closeAuthModal,
      connectWallet,
      resetWalletConnection,
      setWalletConnecting,
      confirmWalletConnection,
      disconnectWallet,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }

  return context;
}
