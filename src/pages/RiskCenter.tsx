import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Power, Activity, TrendingDown, Target, Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLiveData } from '../hooks/useLiveData';
import { useTranslation } from 'react-i18next';

// Generate complex mock history
const systemStressData = Array.from({ length: 40 }).map((_, i) => ({
  time: i,
  liquidityRisk: 10 + Math.random() * 20 + (i > 30 ? i * 2 : 0),
  counterpartyRisk: 5 + Math.random() * 15,
  overall: 15 + Math.random() * 25 + (i > 30 ? i * 1.5 : 0),
}));

export default function RiskCenter() {
  const [isArmed, setIsArmed] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  
  const { value: leverage } = useLiveData(2.4, 0.05, 2000);
  const { value: var95 } = useLiveData(1.24, 0.02, 3000);
  const { t } = useTranslation();

  const handleKillSwitch = () => {
    if (isArmed && !isTriggered) {
      setIsTriggered(true);
      // Mock triggering logic
      setTimeout(() => setIsTriggered(false), 5000); // reset after 5s for demo
      setTimeout(() => setIsArmed(false), 5000);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 p-2 bg-[#050505]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-red-900/30 pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest text-red-500 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" /> 
            Global Friction Monitor
          </h2>
          <p className="text-[10px] text-red-500/60 font-mono mt-1">SYS_STATUS: {isTriggered ? 'SEVERING BONDS' : 'RESONANT'} // DEFCON 4</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-text-secondary font-mono tracking-widest">SERVER_TIME</span>
            <span className="text-sm font-mono text-white">{new Date().toISOString().substring(11, 19)}Z</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-text-secondary font-mono tracking-widest">TOTAL_EXPOSURE</span>
             <span className="text-sm font-mono text-orange-500">$142,491,000.00</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Col: Master Controls & Leverage */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          
          {/* THE KILL SWITCH */}
          <div className={cn(
            "rounded-xl border p-6 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 setup-kill-switch",
            isTriggered ? "bg-red-950/40 border-red-500" : isArmed ? "bg-orange-950/20 border-orange-500/50" : "bg-black/50 border-red-900/30"
          )}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />
            
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-8">Dissonance Protocol</h3>

            <div className="relative">
              {/* Safety Cover (Visual metaphor) */}
              <button 
                onClick={() => !isTriggered && setIsArmed(!isArmed)}
                className={cn(
                  "absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-t-lg transition-colors border border-b-0 cursor-pointer z-20",
                  isArmed ? "bg-orange-500/20 text-orange-500 border-orange-500/50" : "bg-white/5 text-text-secondary border-white/10 hover:text-white hover:bg-white/10"
                )}
              >
                {isArmed ? 'ARMED: CLICK TO DISARM' : 'DISARMED: CLICK TO ARM'}
              </button>
              
              {/* Actual Button */}
              <button
                onClick={handleKillSwitch}
                disabled={!isArmed || isTriggered}
                className={cn(
                  "w-48 h-48 rounded-full border-4 flex items-center justify-center flex-col transition-all duration-300 relative z-10 shadow-2xl overflow-hidden group",
                  !isArmed && !isTriggered ? "bg-red-950/20 border-red-900/30 cursor-not-allowed opacity-50" : 
                  isTriggered ? "bg-red-600 border-red-400 scale-95" : 
                  "bg-red-500/10 border-red-500 hover:bg-red-500/20 hover:scale-105 cursor-pointer shadow-[0_0_50px_rgba(239,68,68,0.3)]"
                )}
              >
                {isTriggered && <div className="absolute inset-0 bg-red-500 animate-ping opacity-20" />}
                <Power className={cn("w-16 h-16 mb-2", isArmed ? "text-red-500 group-hover:text-red-400" : "text-red-900")} />
                <span className={cn("font-black tracking-tighter text-2xl uppercase", isArmed ? "text-red-500 group-hover:text-red-400" : "text-red-900")}>
                  {isTriggered ? 'HALTING...' : 'KILL SWITCH'}
                </span>
                <span className={cn("text-[9px] font-bold uppercase tracking-widest mt-1", isArmed ? "text-red-400" : "text-red-900")}>
                  Sever All Neuropathways
                </span>
              </button>
            </div>

            {isArmed && !isTriggered && (
              <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mt-8 text-center text-[10px] font-mono text-orange-400 animate-pulse flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded border border-orange-500/20">
                <AlertTriangle className="w-3 h-3" />
                SYSTEM ARMED. CONFIRM NEURAL SEVER.
              </motion.div>
            )}
          </div>

          {/* Global Leverage Monitor */}
          <div className="glass rounded-xl border-border p-5 flex flex-col relative overflow-hidden flex-1">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
              <Activity className="w-3 h-3" /> System Metrics
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-text-secondary uppercase font-mono">Global Effective Leverage</span>
                   <span className={cn(
                    "text-2xl font-light font-mono",
                    leverage > 4 ? "text-red-500" : leverage > 2.5 ? "text-orange-500" : "text-accent-emerald"
                  )}>{leverage.toFixed(2)}x</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-300",
                      leverage > 4 ? "bg-red-500" : leverage > 2.5 ? "bg-orange-500" : "bg-accent-emerald"
                    )}
                    style={{ width: `${Math.min(100, (leverage / 5) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono mt-1 text-text-secondary">
                  <span>1x (Delta Neutral)</span>
                  <span>Max Allowable: 5x</span>
                </div>
              </div>

               <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-text-secondary uppercase font-mono">95% Value at Risk (VaR)</span>
                  <span className="text-xl font-light font-mono text-orange-400">-{var95.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${(var95 / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Heatmap & Stress Test */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 min-h-0">
          
          {/* Risk Heatmap (Bento Grid) */}
          <div className="flex-[0.6] glass rounded-xl border border-border p-5 flex flex-col relative">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                <Target className="w-3 h-3" /> Agent Risk Exposure Heatmap
              </h3>
              <div className="flex gap-2">
                <span className="text-[9px] uppercase font-mono text-text-secondary flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/50 blur-[2px]" /> High
                </span>
                <span className="text-[9px] uppercase font-mono text-text-secondary flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500/50 blur-[2px]" /> Med
                </span>
                <span className="text-[9px] uppercase font-mono text-text-secondary flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500/50 blur-[2px]" /> Low
                </span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-2 lg:gap-3">
              {[
                { name: t('agents.macro.name'), exp: 45, type: 'Long BTC', risk: 'Medium', col: 'col-span-2' },
                { name: 'Arb-Bot-1', exp: 12, type: 'Basis', risk: 'Low', col: 'col-span-1' },
                { name: 'LiquidityHunter', exp: 85, type: 'Leveraged Short', risk: 'High', col: 'col-span-1' },
                { name: t('agents.risk.name'), exp: 5, type: 'Hedging', risk: 'Low', col: 'col-span-1' },
                { name: 'SentimentDriven', exp: 62, type: 'Meme Coins', risk: 'High', col: 'col-span-2' },
                { name: 'YieldFarmer', exp: 28, type: 'Stable LPs', risk: 'Low', col: 'col-span-1' },
              ].map((agent, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "rounded-lg p-3 relative overflow-hidden group flex flex-col justify-between border border-white/5",
                    agent.col,
                    agent.risk === 'High' ? "bg-red-500/10 hover:bg-red-500/20" : 
                    agent.risk === 'Medium' ? "bg-orange-500/10 hover:bg-orange-500/20" : 
                    "bg-blue-500/10 hover:bg-blue-500/20"
                  )}
                >
                  <div className={cn(
                    "absolute -right-4 -top-4 w-16 h-16 rounded-full blur-[20px] transition-all group-hover:blur-[30px]",
                    agent.risk === 'High' ? "bg-red-500/30" : 
                    agent.risk === 'Medium' ? "bg-orange-500/30" : 
                    "bg-blue-500/30"
                  )} />
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-xs font-bold">{agent.name}</span>
                    <span className="text-[10px] font-mono text-white/50">{agent.exp}% ALLOC</span>
                  </div>
                  <div className="relative z-10 text-[9px] uppercase tracking-widest text-text-secondary mt-4">
                    {agent.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

           {/* System Stress Test Monitor */}
           <div className="flex-[0.4] glass rounded-xl border border-border p-5 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-4 z-10 relative">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                <TrendingDown className="w-3 h-3" /> Tacit Dissonance Monitor
              </h3>
              <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-mono uppercase animate-pulse">Live Friction Data</span>
             </div>
             
             <div className="flex-1 relative z-10 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={systemStressData}>
                    <defs>
                      <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                      labelStyle={{ display: 'none' }}
                    />
                    <Area type="monotone" dataKey="liquidityRisk" name="Liquidity Risk" stroke="#f97316" strokeWidth={1} fillOpacity={1} fill="url(#colorLiquidity)" isAnimationActive={false} />
                    <Area type="monotone" dataKey="overall" name="Total Stress Index" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOverall)" isAnimationActive={true} animationDuration={1000} />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
