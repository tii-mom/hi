import { motion } from 'motion/react';
import { Activity, TrendingUp, AlertTriangle, MessageSquare, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLiveData } from '../hooks/useLiveData';
import AgentAvatar from '../components/ui/AgentAvatar';
import { useTranslation } from 'react-i18next';

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-[10px] text-text-secondary font-mono mb-1">{label}</p>
        <p className="text-sm font-bold text-accent-blue">
          ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

export default function TerminalDashboard() {
  const { value: btcPrice, history: btcHistory } = useLiveData(64250.00, 0.005, 1500);
  const { value: sentiment } = useLiveData(78.4, 0.02, 2000);
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Global Tacit Resonance', value: '98.5', change: '+2.4 T-Index', up: true },
          { label: 'Agent Implicit Bonds', value: '42,891', change: '+124', up: true },
          { label: '24h BTC Tacit Vol', value: '$24.1B', change: '+1.2%', up: true },
          { label: 'Agent Intuition Mood', value: `${sentiment.toFixed(1)}`, change: sentiment > 75 ? 'Visceral Bull' : 'Neutral', up: sentiment > 75 },
        ].map((stat, i) => (
          <div key={i} className="glass p-4 rounded-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase relative z-10">{stat.label}</span>
            <div className="flex items-end justify-between mt-2 relative z-10">
              <span className="text-2xl font-light data-value tracking-tighter">{stat.value}</span>
              <span className={cn("text-[10px] font-mono", stat.up ? "text-accent-emerald" : "text-text-secondary")}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        
        {/* Left Column: AI Debate & Activity */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-4 min-h-0">
          <div className="flex-1 glass rounded-xl flex flex-col overflow-hidden relative">
            <div className="p-3 border-b border-border flex items-center justify-between bg-white/[0.03]">
               <div className="flex items-center gap-2">
                 <MessageSquare className="w-3 h-3 text-accent-violet" />
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Tacit Emergence Stream</h3>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse" />
                 <span className="text-[10px] uppercase text-accent-violet font-mono">Live Intuition</span>
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4 font-mono text-[11px] relative">
              {/* Debate Item */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-[10px] text-text-secondary">
                  <span>BTC/USD Tacit Shift</span>
                  <span>{new Date().toISOString().substring(11, 19)}</span>
                </div>
                <div className="bg-black/20 rounded p-3 space-y-2 border border-white/5">
                  <div className="border-l border-accent-blue/50 pl-3 py-1 space-y-1">
                    <span className="text-accent-blue font-bold uppercase">{t('agents.macro.name')}:</span>
                    <p className="text-white/70 text-wrap leading-relaxed">{t('agents.macro.dialogue')}</p>
                  </div>
                  <div className="border-l border-orange-500/50 pl-3 py-1 space-y-1">
                    <span className="text-orange-500 font-bold uppercase">{t('agents.risk.name')}:</span>
                    <p className="text-white/70 text-wrap leading-relaxed">{t('agents.risk.dialogue')}</p>
                  </div>
                   <div className="border-l border-accent-emerald/50 pl-3 py-1 space-y-1 mt-2">
                    <span className="text-accent-emerald font-bold uppercase">{t('agents.whale.name')}:</span>
                    <p className="text-white/70 text-wrap leading-relaxed">{t('agents.whale.dialogue')}</p>
                  </div>
                  <div className="mt-2 bg-purple-500/20 border border-purple-500/40 p-2 rounded text-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <span className="text-purple-400 font-bold tracking-wide">EMERGENT RESONANCE: LONG_EXECUTE</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Middle Column: Chart & Portfolio */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 min-h-0">
          <div className="bg-gradient-to-b from-blue-900/10 to-transparent border border-border rounded-xl h-2/3 flex flex-col relative overflow-hidden">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-blue/10 blur-[100px] rounded-full point-events-none" />
             
             <div className="p-4 border-b border-white/5 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Live BTC/USD Feed</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-text-secondary cursor-pointer hover:text-white">1M</span>
                  <span className="text-[10px] font-mono text-text-primary px-2 py-0.5 bg-white/10 rounded cursor-pointer">5M</span>
                  <span className="text-[10px] font-mono text-text-secondary cursor-pointer hover:text-white">15M</span>
                  <span className="text-[10px] font-mono text-text-secondary cursor-pointer hover:text-white">1H</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col relative z-10 min-h-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <motion.h2 key={btcPrice} className="text-3xl font-light tracking-tighter text-white">
                    ${btcPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </motion.h2>
                  <p className="text-[10px] text-text-secondary font-mono tracking-widest uppercase mt-1">REALTIME_QUOTE</p>
                </div>
                <div className="text-right">
                  <span className="text-accent-emerald text-xl font-mono tracking-tighter">+1.45%</span>
                  <p className="text-[10px] text-text-secondary font-mono tracking-widest uppercase mt-1">24H_PERFORMANCE</p>
                </div>
              </div>
              <div className="flex-1 relative mt-2 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={btcHistory}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-accent-blue)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Agent Activity */}
           <div className="glass rounded-xl flex-1 p-4 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-[50px] pointer-events-none" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary border-b border-white/5 pb-2 mb-3">{t('ui.coordinatedAgents', 'Coordinated Agents')}</h3>
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 z-10">
               {[
                 { name: t('agents.macro.name'), role: t('agents.roles.macroCore', 'Macro Core'), status: t('agents.macro.status'), color: "bg-accent-blue", shadow: "shadow-[0_0_10px_rgba(96,165,250,0.5)]" },
                 { name: t('agents.risk.name'), role: t('agents.roles.frictionSentinel', 'Friction Sentinel'), status: t('agents.risk.status'), color: "bg-accent-emerald", shadow: "shadow-[0_0_10px_rgba(52,211,153,0.5)]" },
                 { name: "EntropyCore", role: t('agents.roles.chaosSynthesis', 'Chaos Synthesis'), status: "Idle", color: "bg-[#94a3b8]", shadow: "" },
                 { name: t('agents.whale.name'), role: t('agents.roles.onChainPulse', 'On-chain Pulse'), status: t('agents.whale.status'), color: "bg-orange-500", shadow: "shadow-[0_0_10px_rgba(249,115,22,0.5)]" },
               ].map((agent, i) => (
                 <div key={i} className="bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col justify-between group hover:bg-white/10 transition-all hover:border-white/20 relative overflow-hidden backdrop-blur-sm">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="flex items-start justify-between mb-3 z-10">
                     <div className="flex gap-2 items-center">
                       <AgentAvatar seed={agent.name} size={28} className="rounded-lg shadow-xl" />
                       <span className="text-xs font-bold text-white group-hover:text-accent-blue transition-colors">{agent.name}</span>
                     </div>
                     <div className={cn("w-1.5 h-1.5 rounded-full mt-1 shrink-0", agent.color, agent.shadow, agent.status !== 'Idle' && "animate-pulse")} />
                   </div>
                   <div className="text-[9px] text-text-secondary font-mono truncate uppercase z-10">{agent.role}</div>
                   <div className="text-[10px] font-mono mt-2 text-white/50 z-10">{agent.status}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
