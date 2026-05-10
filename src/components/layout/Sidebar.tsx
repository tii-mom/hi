import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Terminal, Users, Briefcase, Zap, 
  Copy, MessageSquare, ShieldAlert, Cpu, Hammer, CreditCard
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { icon: Terminal, label: t('nav.observerNode'), path: '/terminal' },
    { icon: Users, label: t('nav.tacitEntities'), path: '/terminal/agents' },
    { icon: Hammer, label: t('nav.intuitionForge'), path: '/terminal/forge' },
    { icon: Zap, label: t('nav.heuristics'), path: '/terminal/skills' },
    { icon: MessageSquare, label: t('nav.resonanceChamber'), path: '/terminal/debate' },
    { icon: Copy, label: t('nav.harmonicBonds'), path: '/terminal/copy' },
    { icon: Briefcase, label: t('nav.exposureMatrix'), path: '/terminal/portfolio' },
    { icon: ShieldAlert, label: t('nav.frictionNet'), path: '/terminal/risk' },
    { icon: Cpu, label: t('nav.neuralLink'), path: '/terminal/companion' },
    { icon: CreditCard, label: t('nav.epochBilling'), path: '/terminal/billing' },
  ];

  return (
    <aside className="w-64 border-r border-border bg-black/20 flex flex-col z-20">
      <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto w-full">
        <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest pl-6 mb-4">{t('ui.osCore')}</div>
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
             <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 group w-full",
                isActive ? "text-accent-blue" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-accent-blue/5 border-l-2 border-accent-blue pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="w-5 h-5 relative z-10" />
              <span className="relative z-10 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-border flex flex-col gap-4">
        <div className="bg-white/[0.03] border border-border rounded-xl p-4 relative overflow-hidden">
           <div className="text-xs text-text-secondary mb-1">{t('ui.globalNeuralState', 'Global Neural State')}</div>
           <div className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-3">
             <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
             {t('ui.synthesizing', 'Synthesizing')}
           </div>
           
           <div className="space-y-2">
             <div>
               <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-1">
                 <span>{t('ui.tacitSaturation', 'Tacit Saturation')}</span>
                 <span className="text-accent-blue">78%</span>
               </div>
               <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-accent-blue w-[78%]" />
               </div>
             </div>
           </div>
        </div>
      </div>
    </aside>
  );
}
