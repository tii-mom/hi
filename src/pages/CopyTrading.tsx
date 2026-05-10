import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, TrendingUp, Settings, StopCircle, PlayCircle, BarChart2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ResponsiveContainer, AreaChart, Area, Tooltip, YAxis } from 'recharts';
import AgentAvatar from '../components/ui/AgentAvatar';

const activeCopies = [
  { 
    id: 1, 
    agent: 'Macro Strategist Alpha', 
    style: 'cyberpunk-chrome' as const,
    status: 'Running',
    allocation: '$12,500', 
    pnl: '+$1,240', 
    pnlPct: '+9.92%', 
    history: Array.from({ length: 20 }, (_, i) => ({ val: 10000 + i * 50 + Math.random() * 500 }))
  },
  { 
    id: 2, 
    agent: 'Meme Sniper', 
    style: 'cosmic-explorer' as const,
    status: 'Paused',
    allocation: '$2,000', 
    pnl: '-$420', 
    pnlPct: '-21.0%', 
    history: Array.from({ length: 20 }, (_, i) => ({ val: 2000 - i * 10 + Math.random() * 200 - 100 }))
  },
  { 
    id: 3, 
    agent: 'Whale Tracker AI', 
    style: 'minimalist-ai' as const,
    status: 'Running',
    allocation: '$8,500', 
    pnl: '+$3,420', 
    pnlPct: '+40.2%', 
    history: Array.from({ length: 20 }, (_, i) => ({ val: 5000 + i * 150 + Math.random() * 800 }))
  }
];

export default function CopyTrading() {
  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border pb-4 shrink-0">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">Resonance Scaling</h2>
          <p className="text-sm text-text-secondary">Manage your active intuitive alignment bonds</p>
        </div>
        <div className="flex gap-4 items-center">
           <div className="text-right">
             <div className="text-[10px] text-text-secondary uppercase">Total Allocated</div>
             <div className="font-mono font-bold">$23,000.00</div>
           </div>
           <div className="text-right">
             <div className="text-[10px] text-text-secondary uppercase">Total PnL</div>
             <div className="font-mono font-bold text-accent-emerald">+$4,240.00</div>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6 space-y-4">
        {activeCopies.map((copy, i) => (
          <motion.div 
            key={copy.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl border border-white/10 p-5 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group"
          >
            {/* Background Effect */}
            <div className={cn(
              "absolute -left-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity",
              copy.pnl.startsWith('-') ? "bg-red-500" : "bg-emerald-500"
            )} />

            <div className="flex items-center gap-4 min-w-[240px] relative z-10 w-full sm:w-auto mt-2 sm:mt-0">
              <AgentAvatar seed={copy.agent} size={48} styleType={copy.style} className="shrink-0" />
              <div>
                <h3 className="font-bold">{copy.agent}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded border", 
                    copy.status === 'Running' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" : "bg-orange-500/10 text-orange-500 border-orange-500/30"
                  )}>
                    {copy.status === 'Running' ? 'Resonating' : 'Dissonant'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full h-[60px] relative z-10 hidden sm:block">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={copy.history}>
                  <defs>
                    <linearGradient id={`gradient-${copy.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={copy.pnl.startsWith('-') ? '#ef4444' : '#10b981'} stopOpacity={0.3}/>
                      <stop offset="100%" stopColor={copy.pnl.startsWith('-') ? '#ef4444' : '#10b981'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <YAxis domain={['auto', 'auto']} hide />
                  <Area 
                    type="monotone" 
                    dataKey="val" 
                    stroke={copy.pnl.startsWith('-') ? '#ef4444' : '#10b981'} 
                    fill={`url(#gradient-${copy.id})`} 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-8 w-full sm:w-auto relative z-10 mt-4 sm:mt-0 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
              <div>
                <div className="text-[10px] text-text-secondary mb-1">ALLOCATED</div>
                <div className="font-mono font-medium">{copy.allocation}</div>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-[10px] text-text-secondary mb-1">PNL</div>
                <div className={cn("font-mono font-medium", copy.pnl.startsWith('-') ? "text-red-400" : "text-accent-emerald")}>
                  {copy.pnl} <span className="text-[10px] opacity-70 ml-1">({copy.pnlPct})</span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2 sm:ml-4 sm:border-l border-white/10 sm:pl-6">
                 <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors" title="Manage Settings">
                   <Settings className="w-4 h-4" />
                 </button>
                 {copy.status === 'Running' ? (
                   <button className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/20 transition-colors" title="Sever Bond">
                     <StopCircle className="w-4 h-4" />
                   </button>
                 ) : (
                   <button className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 transition-colors" title="Restore Resonance">
                     <PlayCircle className="w-4 h-4" />
                   </button>
                 )}
                 <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 transition-colors sm:hidden" title="View Chart">
                     <BarChart2 className="w-4 h-4" />
                 </button>
              </div>
            </div>
            
          </motion.div>
        ))}
      </div>
    </div>
  );
}
