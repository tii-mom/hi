import { Bell, Search, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AuthModal from '../ui/AuthModal';
import { useAppState } from '@/app/state';
import { cn } from '@/lib/utils';
import { useLiveData } from '../../hooks/useLiveData';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const {
    authModalOpen,
    closeAuthModal,
    connectedIdentityLabel,
    motionPreference,
    openAuthModal,
    walletStatus,
  } = useAppState();
  const { t } = useTranslation();
  const { value: sentiment } = useLiveData(78.4, 0.02, 2000);
  const { value: revenue } = useLiveData(14291.02, 0.005, 1000);

  const [sysStatus, setSysStatus] = useState<'active' | 'lagging'>('active');
  const reducedMotion = motionPreference === 'reduced';

  useEffect(() => {
    // Simulate dynamic system coordination status
    const interval = setInterval(() => {
      setSysStatus(Math.random() > 0.85 ? 'lagging' : 'active');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = sysStatus === 'active' ? 'text-accent-emerald/80' : 'text-orange-500';
  const walletLabel =
    walletStatus === 'connected' && connectedIdentityLabel
      ? connectedIdentityLabel
      : walletStatus === 'connecting'
        ? t('header.wallet.linking')
        : t('header.wallet.connect');
  const sentimentStateLabel =
    sentiment > 75 ? t('header.metrics.bullish') : t('header.metrics.neutral');

  return (
    <>
      <header className="h-14 border-b border-border bg-black/40 backdrop-blur-md flex items-center justify-between px-6 z-40 sticky top-0 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            aria-label="HI Protocol home"
            className="w-8 h-8 bg-gradient-to-br from-accent-emerald to-accent-blue rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)] shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span className="text-black font-black text-xs">HI</span>
          </Link>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">HI PROTOCOL</span>
            <span
              aria-live="polite"
              className={cn(
                "text-[10px] font-mono uppercase transition-colors duration-500",
                statusColor,
                sysStatus === 'lagging' && !reducedMotion && "animate-pulse",
              )}
            >
              {t('header.status.systemReady')} // {t('header.status.agentCoord')}: {t(`header.status.${sysStatus}`)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:flex gap-4 items-center text-[11px] font-mono mr-2">
            <div className="flex flex-col items-end">
              <span className="text-text-secondary">{t('header.metrics.globalSentiment')}</span>
              <span className={sentiment > 75 ? "text-accent-emerald" : "text-text-secondary"}>
                {sentiment.toFixed(1)} {sentimentStateLabel}
              </span>
            </div>
            <div className="w-[1px] h-6 bg-white/10"></div>
            <div className="flex flex-col items-end">
              <span className="text-text-secondary">{t('header.metrics.agentRevenue24h')}</span>
              <span className="text-accent-blue">
                ${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <LanguageSwitcher direction="down" />
          </div>

          <button
            type="button"
            aria-label={t('header.actions.search')}
            className="relative p-2 text-text-secondary hover:text-white transition-colors hidden sm:block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label={t('header.actions.notifications')}
            className="relative p-2 text-text-secondary hover:text-white transition-colors rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Bell className="w-4 h-4" />
            <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-blue rounded-full" />
          </button>
          
          <button 
            type="button"
            onClick={openAuthModal}
            aria-label={t('header.actions.wallet')}
            aria-haspopup="dialog"
            aria-expanded={authModalOpen}
            className={cn(
              "flex items-center gap-2 h-8 px-3 rounded-lg text-white transition-colors text-[10px] font-bold uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              walletStatus === 'connected'
                ? "bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30 hover:bg-accent-emerald/30"
                : "bg-blue-600 hover:bg-blue-500"
            )}
          >
            <Wallet className="w-3 h-3" />
            <span className="hidden sm:inline">{walletLabel}</span>
          </button>
        </div>
      </header>
      
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </>
  );
}
