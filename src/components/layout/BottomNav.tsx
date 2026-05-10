import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { 
  Terminal, Users, MessageSquare, Briefcase, Cpu, Repeat
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppState } from '@/app/state';
import type { CSSProperties } from 'react';

const navItems = [
  { icon: Terminal, labelKey: 'nav.mobile.terminal', path: '/terminal' },
  { icon: Users, labelKey: 'nav.mobile.agents', path: '/terminal/agents' },
  { icon: Cpu, labelKey: 'nav.mobile.chat', path: '/terminal/companion' },
  { icon: MessageSquare, labelKey: 'nav.mobile.debate', path: '/terminal/debate' },
  { icon: Repeat, labelKey: 'nav.mobile.copy', path: '/terminal/copy' },
  { icon: Briefcase, labelKey: 'nav.mobile.portfolio', path: '/terminal/portfolio' },
];

interface BottomNavProps {
  safeAreaInsetBottom?: number;
}

function isNavItemActive(pathname: string, path: string) {
  if (path === '/terminal') {
    return pathname === path;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function BottomNav({ safeAreaInsetBottom = 0 }: BottomNavProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const { motionPreference } = useAppState();
  const reducedMotion = motionPreference === 'reduced';
  const safeAreaBottom =
    safeAreaInsetBottom > 0 ? `${safeAreaInsetBottom}px` : 'env(safe-area-inset-bottom, 0px)';
  const navStyle: CSSProperties = {
    height: `calc(5rem + ${safeAreaBottom})`,
    paddingBottom: safeAreaBottom,
  };

  return (
    <nav
      aria-label={t('nav.mobile.label', 'Mobile terminal navigation')}
      className="min-h-20 bg-black/80 backdrop-blur-md border-t border-border px-2 sm:px-6 flex items-center justify-between gap-1"
      style={navStyle}
    >
      {navItems.map((item) => {
        const label = t(item.labelKey);
        const isActive = isNavItemActive(location.pathname, item.path);
        return (
          <Link 
            key={item.path}
            to={item.path}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className="relative flex h-14 flex-1 basis-0 min-w-0 flex-col items-center justify-center rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {isActive && (
              <motion.div 
                layoutId={reducedMotion ? undefined : 'bottom-nav-active'}
                className="absolute inset-0 bg-accent-blue/10 rounded-xl"
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon
              aria-hidden="true"
              className={cn("w-5 h-5 relative z-10 mb-1", isActive ? "text-accent-blue" : "text-text-secondary")}
            />
            <span className={cn("text-[8px] sm:text-[9px] relative z-10 font-bold tracking-widest uppercase leading-none text-center w-full truncate", isActive ? "text-accent-blue" : "text-text-secondary")}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
