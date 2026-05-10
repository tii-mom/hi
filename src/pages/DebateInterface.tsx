import { motion } from 'motion/react';
import { Activity, ShieldAlert, TrendingUp, Check, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import AgentAvatar from '../components/ui/AgentAvatar';
import { useTranslation } from 'react-i18next';

export default function DebateInterface() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">{t('nav.resonanceChamber')}</h2>
          <p className="text-sm text-text-secondary">AI models synthesizing implicit heuristics before execution</p>
        </div>
        <div className="px-3 py-1 rounded bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-mono animate-pulse">
          Synthesis #49201 Active
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
        {/* Debate Thread */}
        <div className="col-span-2 glass rounded-xl border border-border p-6 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-6 pr-4">
            
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 relative">
                <div className="absolute inset-0 rounded-full animate-pulse-ring-blue" />
                <AgentAvatar seed={t('agents.macro.name')} size={40} className="rounded-full relative z-10" styleType="cyberpunk-chrome" />
              </div>
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl rounded-tl-none border border-accent-blue/20 shadow-[0_0_15px_rgba(96,165,250,0.1)] flex-1 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent-blue/50" />
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-accent-blue">{t('agents.macro.name')}</span>
                  <span className="text-[10px] font-mono text-text-secondary">TACTIC RESONANCE: HIGH</span>
                </div>
                <p className="text-sm text-text-primary leading-relaxed relative z-10">
                  {t('agents.macro.dialogue')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 relative">
                <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]" />
                <AgentAvatar seed={t('agents.risk.name')} size={40} className="rounded-full relative z-10" styleType="cosmic-explorer" />
              </div>
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl rounded-tl-none border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)] flex-1 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50" />
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-orange-500">{t('agents.risk.name')}</span>
                  <span className="text-[10px] font-mono text-orange-400/80 animate-pulse">FRICTION: DETECTED</span>
                </div>
                <p className="text-sm text-text-primary leading-relaxed">
                  {t('agents.risk.dialogue')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 relative">
                 <div className="absolute inset-0 rounded-full animate-pulse-ring" />
                <AgentAvatar seed={t('agents.whale.name')} size={40} className="rounded-full relative z-10" styleType="minimalist-ai" />
              </div>
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl rounded-tl-none border border-accent-emerald/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent-emerald/50" />
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-accent-emerald">{t('agents.whale.name')}</span>
                  <span className="text-[10px] font-mono text-text-secondary">DATA: ON-CHAIN</span>
                </div>
                <p className="text-sm text-text-primary leading-relaxed">
                  {t('agents.whale.dialogue')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="bg-accent-emerald/10 border border-accent-emerald/30 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-accent-emerald uppercase tracking-wider mb-1">{t('ui.consensusAchieved')}</h4>
                <p className="text-xs text-text-secondary">Approved with modified parameters (50% size).</p>
              </div>
              <button className="px-4 py-2 bg-accent-emerald text-black text-sm font-bold rounded-lg hover:bg-accent-emerald/80 transition-colors">
                {t('ui.viewTx')}
              </button>
            </div>
          </div>
        </div>

        {/* Voting & Graph */}
        <div className="col-span-1 flex flex-col gap-6 h-full min-h-0">
          <div className="glass rounded-xl border border-border p-4 flex-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary border-b border-border pb-2 mb-4">{t('ui.vectorMatrix')}</h3>
            <div className="space-y-4">
              {[
                { name: t('agents.macro.name'), vote: t('ui.resonant'), icon: Check, color: 'text-accent-emerald' },
                { name: t('agents.risk.name'), vote: t('ui.dissonant'), icon: X, color: 'text-orange-500' },
                { name: t('agents.whale.name'), vote: t('ui.resonant'), icon: Check, color: 'text-accent-emerald' },
                { name: 'Meme AI', vote: t('ui.observing'), icon: Activity, color: 'text-text-secondary' },
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/5">
                  <span className="text-sm font-medium">{v.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-mono", v.color)}>{v.vote}</span>
                    <v.icon className={cn("w-4 h-4", v.color)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl border border-border p-4 flex-[0.6] flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 w-full flex justify-between items-center z-10 pointer-events-none">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">{t('ui.intuitionGraph')}</h3>
                <span className="text-[9px] font-mono text-accent-violet animate-pulse border border-accent-violet/30 bg-accent-violet/10 px-2 py-0.5 rounded">{t('ui.synthesizing')}</span>
             </div>
             
             {/* Simple Node Graph using SVG */}
             <div className="relative w-full aspect-square max-w-[300px] mt-4">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  {/* Edges */}
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M 100 50 L 50 150" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    d="M 100 50 L 150 150" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                    d="M 50 150 L 150 150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-red-500/50" 
                  />
                  
                  {/* Nodes */}
                  <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0 }} cx="100" cy="50" r="16" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                  <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} cx="50" cy="150" r="16" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="2" />
                  <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.6 }} cx="150" cy="150" r="16" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />

                  {/* Active Pulses */}
                  <circle cx="100" cy="50" r="16" fill="none" stroke="#3b82f6" strokeWidth="2" className="animate-ping opacity-20" />
                  
                  {/* Labels */}
                  <text x="100" y="50" fontSize="8" fill="white" textAnchor="middle" dominantBaseline="middle" className="font-mono font-bold">M</text>
                  <text x="50" y="150" fontSize="8" fill="white" textAnchor="middle" dominantBaseline="middle" className="font-mono font-bold">R</text>
                  <text x="150" y="150" fontSize="8" fill="white" textAnchor="middle" dominantBaseline="middle" className="font-mono font-bold">W</text>

                  {/* Context text */}
                  <text x="100" y="25" fontSize="6" fill="#888" textAnchor="middle" className="font-mono uppercase">Macro (Intuition)</text>
                  <text x="30" y="175" fontSize="6" fill="#888" textAnchor="middle" className="font-mono uppercase">Risk (Friction)</text>
                  <text x="170" y="175" fontSize="6" fill="#888" textAnchor="middle" className="font-mono uppercase">Whale (Alignment)</text>
                </svg>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
