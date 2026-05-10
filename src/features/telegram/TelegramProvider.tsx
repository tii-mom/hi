import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type TelegramColorScheme = 'light' | 'dark' | 'unknown';

interface TelegramWebAppBackButton {
  isVisible?: boolean;
}

interface TelegramSafeAreaInset {
  bottom?: number;
}

interface TelegramWebAppLike {
  viewportHeight?: number;
  viewportStableHeight?: number;
  colorScheme?: TelegramColorScheme;
  safeAreaInset?: TelegramSafeAreaInset;
  contentSafeAreaInset?: TelegramSafeAreaInset;
  initDataUnsafe?: {
    start_param?: string;
  };
  BackButton?: TelegramWebAppBackButton;
  onEvent?: (eventType: string, eventHandler: () => void) => void;
  offEvent?: (eventType: string, eventHandler: () => void) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebAppLike;
    };
  }
}

export interface TelegramShellState {
  isTelegram: boolean;
  viewportHeight?: number;
  stableViewportHeight?: number;
  safeAreaInsetBottom: number;
  colorScheme: TelegramColorScheme;
  launchParams: Record<string, string>;
  backButtonAvailable: boolean;
}

export interface TelegramDeepLink {
  route: string;
  context?: Record<string, string>;
}

const TelegramShellContext = createContext<TelegramShellState | null>(null);

function readLaunchParams(webApp?: TelegramWebAppLike): Record<string, string> {
  const params: Record<string, string> = {};

  if (webApp?.initDataUnsafe?.start_param) {
    params.startParam = webApp.initDataUnsafe.start_param;
  }

  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    ['tgWebAppStartParam', 'startapp', 'start_param'].forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key] = value;
      }
    });
  }

  return params;
}

function readTelegramShellState(): TelegramShellState {
  const webApp = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

  return {
    isTelegram: Boolean(webApp),
    viewportHeight: webApp?.viewportHeight,
    stableViewportHeight: webApp?.viewportStableHeight,
    safeAreaInsetBottom: webApp?.safeAreaInset?.bottom ?? webApp?.contentSafeAreaInset?.bottom ?? 0,
    colorScheme: webApp?.colorScheme ?? 'unknown',
    launchParams: readLaunchParams(webApp),
    backButtonAvailable: Boolean(webApp?.BackButton?.isVisible),
  };
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [shellState, setShellState] = useState<TelegramShellState>(() => readTelegramShellState());

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    const refresh = () => setShellState(readTelegramShellState());

    refresh();
    window.addEventListener('resize', refresh);
    webApp?.onEvent?.('viewportChanged', refresh);
    webApp?.onEvent?.('themeChanged', refresh);

    return () => {
      window.removeEventListener('resize', refresh);
      webApp?.offEvent?.('viewportChanged', refresh);
      webApp?.offEvent?.('themeChanged', refresh);
    };
  }, []);

  const value = useMemo(() => shellState, [shellState]);

  return <TelegramShellContext.Provider value={value}>{children}</TelegramShellContext.Provider>;
}

export function useTelegramShell() {
  const context = useContext(TelegramShellContext);

  if (!context) {
    throw new Error('useTelegramShell must be used inside TelegramProvider.');
  }

  return context;
}
