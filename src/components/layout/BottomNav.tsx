import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { 
  Terminal, Users, MessageSquare, Briefcase, Cpu, Repeat
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { icon: Terminal, labelKey: 'nav.mobile.terminal', path: '/terminal' },
  { icon: Users, labelKey: 'nav.mobile.agents', path: '/terminal/agents' },
  { icon: Cpu, labelKey: 'nav.mobile.chat', path: '/terminal/companion' },
  { icon: MessageSquare, labelKey: 'nav.mobile.debate', path: '/terminal/debate' },
  { icon: Repeat, labelKey: 'nav.mobile.copy', path: '/terminal/copy' },
  { icon: Briefcase, labelKey: 'nav.mobile.portfolio', path: '/terminal/portfolio' },
];

export default function BottomNav() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="h-20 bg-black/80 backdrop-blur-md border-t border-border px-6 flex items-center justify-between pb-safe">
      {navItems.map((item) => {
        const label = t(item.labelKey);
        const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
        return (
          <Link 
            key={item.path}
            to={item.path}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className="relative flex flex-col items-center justify-center w-14 h-14"
          >
            {isActive && (
              <motion.div 
                layoutId="bottom-nav-active"
                className="absolute inset-0 bg-accent-blue/10 rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon className={cn("w-5 h-5 relative z-10 mb-1", isActive ? "text-accent-blue" : "text-text-secondary")} />
            <span className={cn("text-[9px] relative z-10 font-bold tracking-widest uppercase", isActive ? "text-accent-blue" : "text-text-secondary")}>
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
