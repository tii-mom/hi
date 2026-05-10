import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { useTelegramShell } from '@/features/telegram';
import { useAppState } from '@/app/state';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

const routeTitleKeys: Record<string, string> = {
  '/terminal': 'nav.observerNode',
  '/terminal/agents': 'agents.marketplace.title',
  '/terminal/forge': 'forge.header.title',
  '/terminal/skills': 'skills.header.title',
  '/terminal/debate': 'nav.resonanceChamber',
  '/terminal/copy': 'copy.trading.header.title',
  '/terminal/portfolio': 'portfolio.header.title',
  '/terminal/risk': 'risk.header.title',
  '/terminal/companion': 'nav.neuralLink',
  '/terminal/billing': 'billing.header.title',
};

function getRouteTitleKey(pathname: string) {
  if (pathname.startsWith('/terminal/agent/')) {
    return 'nav.tacitEntities';
  }

  return routeTitleKeys[pathname] ?? 'nav.observerNode';
}

export default function Shell() {
  const location = useLocation();
  const telegram = useTelegramShell();
  const { t } = useTranslation();
  const { motionPreference } = useAppState();
  const [systemTime, setSystemTime] = useState(() => new Date().toISOString().substring(11, 19));
  const reducedMotion = motionPreference === 'reduced';
  const routeTitle = t(getRouteTitleKey(location.pathname));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSystemTime(new Date().toISOString().substring(11, 19));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = `${routeTitle} | HI Protocol`;
  }, [routeTitle]);

  const shellStyle = useMemo<CSSProperties>(() => {
    const stableHeight = telegram.stableViewportHeight ?? telegram.viewportHeight;
    const safeAreaBottom =
      telegram.safeAreaInsetBottom > 0 ? `${telegram.safeAreaInsetBottom}px` : 'env(safe-area-inset-bottom)';

    if (!telegram.isTelegram || !stableHeight) {
      return {};
    }

    return {
      height: `${stableHeight}px`,
      paddingBottom: safeAreaBottom,
    };
  }, [telegram.isTelegram, telegram.safeAreaInsetBottom, telegram.stableViewportHeight, telegram.viewportHeight]);

  return (
    <div
      className="flex flex-col h-[100dvh] w-full bg-bg-base text-text-primary overflow-hidden relative"
      data-telegram-shell={telegram.isTelegram ? 'true' : 'false'}
      data-telegram-theme={telegram.colorScheme}
      style={shellStyle}
    >
      {/* Living Ambient Lighting */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen",
          !reducedMotion && "animate-breathe",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen",
          !reducedMotion && "animate-breathe",
        )}
        style={reducedMotion ? undefined : { animationDelay: '2s' }}
      />
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[5px] bg-accent-emerald/10 blur-[10px] pointer-events-none animate-scanline"
        />
      )}

      <Header />
      <main aria-labelledby="terminal-route-title" className="flex flex-1 overflow-hidden relative">
        <h1 id="terminal-route-title" className="sr-only">{routeTitle}</h1>
        <div aria-hidden="true" className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
        <div className="hidden md:flex relative z-10">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-hidden relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="h-full overflow-auto scroll-smooth p-4 md:p-6 pb-24 md:pb-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <div className="md:hidden absolute bottom-0 inset-x-0 w-full z-50">
        <BottomNav safeAreaInsetBottom={telegram.safeAreaInsetBottom} />
      </div>
      
      {/* Bottom Global Status */}
      <footer className="hidden md:flex h-8 border-t border-border bg-black items-center px-6 justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest relative z-50">
        <div className="flex gap-6">
          <span className="text-accent-emerald/60">{t('shell.footer.network')}: BASE_MAINNET</span>
          <span>{t('shell.footer.latency')}: 12ms</span>
          <span>{t('shell.footer.agentsSync')}: 4/4</span>
        </div>
        <div className="flex gap-6">
          <span>{t('shell.footer.billing')}: {t('shell.footer.enabled')}</span>
          {telegram.isTelegram && (
            <span className="text-accent-blue/70">
              {t('shell.footer.telegramView')}: {telegram.backButtonAvailable ? t('shell.footer.backReady') : t('shell.footer.embedded')}
            </span>
          )}
          <span className="text-text-secondary">{t('shell.footer.systemTime')}: {systemTime} {t('shell.footer.utc')}</span>
        </div>
      </footer>
    </div>
  );
}
