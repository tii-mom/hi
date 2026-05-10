import { Bell, Search, User, Activity, Wallet, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthModal from '../ui/AuthModal';
import { cn } from '@/src/lib/utils';
import { useLiveData } from '../../hooks/useLiveData';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { value: sentiment } = useLiveData(78.4, 0.02, 2000);
  const { value: revenue } = useLiveData(14291.02, 0.005, 1000);
  const { i18n } = useTranslation();

  const [sysStatus, setSysStatus] = useState<'Active' | 'Lagging'>('Active');

  useEffect(() => {
    // Simulate dynamic system coordination status
    const interval = setInterval(() => {
      setSysStatus(Math.random() > 0.85 ? 'Lagging' : 'Active');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = sysStatus === 'Active' ? 'text-accent-emerald/80' : 'text-orange-500';

  return (
    <>
      <header className="h-14 border-b border-border bg-black/40 backdrop-blur-md flex items-center justify-between px-6 z-40 sticky top-0 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-8 h-8 bg-gradient-to-br from-accent-emerald to-accent-blue rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)] shrink-0">
            <span className="text-black font-black text-xs">HI</span>
          </Link>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">HI PROTOCOL</span>
            <span className={cn("text-[10px] font-mono uppercase transition-colors duration-500", statusColor, sysStatus === 'Lagging' && "animate-pulse")}>
              Sys_Ready // Agent_Coord: {sysStatus}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:flex gap-4 items-center text-[11px] font-mono mr-2">
            <div className="flex flex-col items-end">
              <span className="text-text-secondary">GLOBAL_SENTIMENT</span>
              <span className={sentiment > 75 ? "text-accent-emerald" : "text-text-secondary"}>
                {sentiment.toFixed(1)} {sentiment > 75 ? 'BULLISH' : 'NEUTRAL'}
              </span>
            </div>
            <div className="w-[1px] h-6 bg-white/10"></div>
            <div className="flex flex-col items-end">
              <span className="text-text-secondary">AGENT_REVENUE_24H</span>
              <span className="text-accent-blue">
                ${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <LanguageSwitcher direction="down" />
          </div>

          <button className="relative p-2 text-text-secondary hover:text-white transition-colors hidden sm:block">
            <Search className="w-4 h-4" />
          </button>

          <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-blue rounded-full" />
          </button>
          
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            <Wallet className="w-3 h-3" />
            <span className="hidden sm:inline">Connect</span>
          </button>
        </div>
      </header>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
