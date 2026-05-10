import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { 
  Terminal, Users, MessageSquare, Briefcase, Cpu, Repeat
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { icon: Terminal, label: 'Terminal', path: '/terminal' },
  { icon: Users, label: 'Agents', path: '/terminal/agents' },
  { icon: Cpu, label: 'Chat', path: '/terminal/companion' },
  { icon: MessageSquare, label: 'Debate', path: '/terminal/debate' },
  { icon: Repeat, label: 'Copy', path: '/terminal/copy' },
  { icon: Briefcase, label: 'Portfolio', path: '/terminal/portfolio' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="h-20 bg-black/80 backdrop-blur-md border-t border-border px-6 flex items-center justify-between pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path}
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
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
