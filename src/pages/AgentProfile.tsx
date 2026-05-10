import { useState } from 'react';
import { Brain, Star, Activity, TrendingUp, History, Network, ShieldCheck, X, Sliders } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import AgentAvatar from '../components/ui/AgentAvatar';

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-[10px] text-text-secondary font-mono mb-1">{label}</p>
        <p className="text-sm font-bold text-accent-blue">
          {payload[0].value.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

// Generate some mock history data
const performanceData = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
  value: Math.sin(i / 3) * 10 + i * 1.5 + (Math.random() * 5),
}));

export default function AgentProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCopyPanelOpen, setIsCopyPanelOpen] = useState(false);
  
  // Copy settings state
  const [allocation, setAllocation] = useState(1000);
  const [maxDrawdown, setMaxDrawdown] = useState(15);
  const [aggression, setAggression] = useState(50);

  return (
    <div className="h-full flex flex-col gap-6 relative">
      {/* Header Profile */}
      <div className="glass rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 shrink-0">
              <AgentAvatar seed="Alpha-7" size={96} className="rounded-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-light tracking-tight">Macro Strategist Alpha</h1>
                <div className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-accent-emerald rounded-full animate-pulse" />
                  Active
                </div>
              </div>
              <p className="text-sm text-text-secondary w-2/3 leading-relaxed mb-4">
                Powered by Polanyian Tacit Knowledge Modeling. Extracts intuitive patterns from global financial anomalies that cannot be explicitly programmed. Internalizes market sentiment through deep experiential heuristics and memory graph associations.
              </p>
              <div className="flex gap-4 text-xs font-mono">
                <div className="flex gap-1 items-center">
                  <span className="text-text-secondary">DOMAIN:</span>
                  <span className="text-accent-blue">GLOBAL_MACRO</span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="text-text-secondary">COGNITIVE_AGE:</span>
                  <span className="text-white">100M+ EPOCHS</span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="text-text-secondary">TACIT_INDEX:</span>
                  <span className="text-purple-400">98.4 (EXPERT)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <button 
              onClick={() => setIsCopyPanelOpen(true)}
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Copy Strategy
            </button>
            <div className="text-right">
              <div className="text-sm text-text-secondary mb-1">Total AUM Configured</div>
              <div className="text-2xl font-light tracking-tighter data-value">$14,244,910</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 border-b border-border pb-2">
        {['overview', 'skills', 'memory', 'industry'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-xs font-bold uppercase tracking-widest pb-2 relative transition-colors",
              activeTab === tab ? "text-accent-blue" : "text-text-secondary hover:text-white"
            )}
          >
            {tab.replace('_', ' ')}
            {activeTab === tab && (
              <motion.div layoutId="agent-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 overflow-y-auto pb-6">
        
        {/* Left Col: Stats & Chart */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="glass p-4 rounded-xl">
              <div className="text-[10px] text-text-secondary mb-1 uppercase tracking-widest">30D Return</div>
              <div className="text-xl text-accent-emerald data-value font-light">+24.5%</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-[10px] text-text-secondary mb-1 uppercase tracking-widest">Win Rate</div>
              <div className="text-xl text-white data-value font-light">68.2%</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-[10px] text-text-secondary mb-1 uppercase tracking-widest">Tacit Index</div>
              <div className="text-xl text-purple-400 data-value font-light">98.4</div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px]">
              <div className="p-4 border-b border-white/5 flex justify-between items-center z-10 relative bg-white/[0.03]">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Historical Edge</h3>
                 <div className="flex gap-2 text-[10px] font-mono">
                   <span className="cursor-pointer text-text-secondary hover:text-white">1M</span>
                   <span className="cursor-pointer text-accent-blue bg-accent-blue/10 px-2 rounded">3M</span>
                   <span className="cursor-pointer text-text-secondary hover:text-white">6M</span>
                   <span className="cursor-pointer text-text-secondary hover:text-white">1Y</span>
                 </div>
              </div>
              <div className="flex-1 pt-6 relative min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="date" hide />
                      <YAxis domain={['auto', 'auto']} hide />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="var(--color-accent-blue)" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorPerf)" 
                        isAnimationActive={true}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px] p-6">
              <h3 className="text-xl font-light mb-4 text-white">Tacit Skill Manifestation</h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Capabilities extracted from non-verbal heuristics and deep experiential associations. These skills govern the agent's emergent actions.
              </p>
              <div className="flex-1 grid grid-cols-2 gap-4">
                 <div className="bg-black/30 border border-white/5 p-4 rounded-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-2 h-full bg-accent-emerald/20" />
                   <h4 className="text-xs font-bold text-accent-emerald mb-2 uppercase tracking-wide">Synthesized Resonance</h4>
                   <p className="text-xs text-text-secondary mb-3">Detects orderbook friction and crowd anxiety before price action confirms. Correlated with 94% win-rate in high volatility.</p>
                   <div className="flex gap-2">
                     <span className="text-[10px] bg-accent-emerald/10 text-accent-emerald px-2 py-0.5 rounded font-mono">Mastery: 99%</span>
                     <span className="text-[10px] bg-white/5 text-text-secondary px-2 py-0.5 rounded font-mono">Tacit Weight: High</span>
                   </div>
                 </div>
                 <div className="bg-black/30 border border-white/5 p-4 rounded-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-2 h-full bg-accent-blue/20" />
                   <h4 className="text-xs font-bold text-accent-blue mb-2 uppercase tracking-wide">Temporal Intuition</h4>
                   <p className="text-xs text-text-secondary mb-3">Implicitly aligns liquidity cycles with macro-economic shadow events (e.g. unspoken Fed shifts).</p>
                   <div className="flex gap-2">
                     <span className="text-[10px] bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded font-mono">Mastery: 92%</span>
                     <span className="text-[10px] bg-white/5 text-text-secondary px-2 py-0.5 rounded font-mono">Tacit Weight: Extreme</span>
                   </div>
                 </div>
                 <div className="bg-black/30 border border-white/5 p-4 rounded-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-2 h-full bg-purple-500/20" />
                   <h4 className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wide">Chaos Affinity</h4>
                   <p className="text-xs text-text-secondary mb-3">Thrives in unquantifiable market panic. Tacitly identifies the "capitulation sigh" via sentiment vector dispersion.</p>
                   <div className="flex gap-2">
                     <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono">Mastery: 88%</span>
                     <span className="text-[10px] bg-white/5 text-text-secondary px-2 py-0.5 rounded font-mono">Tacit Weight: High</span>
                   </div>
                 </div>
                 <div className="bg-black/30 border border-white/5 p-4 rounded-lg border-dashed opacity-70">
                   <h4 className="text-xs font-bold text-text-primary mb-2 uppercase tracking-wide">Maturing Heuristic</h4>
                   <p className="text-xs text-text-secondary mb-3">Currently internalizing global policy dissonance. Not yet fully actionable.</p>
                   <div className="flex gap-2">
                     <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded font-mono">Mastery: 45%</span>
                     <span className="text-[10px] bg-white/5 text-text-secondary px-2 py-0.5 rounded font-mono">Assimilating...</span>
                   </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px] p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-light text-white mb-2">Memory & Experiential Nodes</h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                    The agent remembers outcomes but internalizes the "feel" of localized paradoxes. Below are core episodic fragments forming its intuition baseline.
                  </p>
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-text-secondary">
                  Capacity: <span className="text-white">88.4TB (100M+ Epochs)</span>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                <div className="flex gap-4 items-start relative pb-4 border-b border-white/5">
                   <div className="absolute left-[11px] top-8 bottom-0 w-px bg-white/10" />
                   <div className="w-6 h-6 rounded-full bg-accent-blue/20 border border-accent-blue/50 flex items-center justify-center shrink-0 z-10">
                     <div className="w-2 h-2 bg-accent-blue rounded-full" />
                   </div>
                   <div>
                     <p className="text-xs text-accent-blue font-mono mb-1">EPOCH_4982 // "The Flash Crash Paradox"</p>
                     <p className="text-sm text-white/90 mb-2">Learned to ignore VIX spikes when sovereign stablecoin inflow is hidden but steady.</p>
                     <p className="text-xs text-text-secondary italic">"The numbers screamed panic. The implicit capital flow whispered accumulation. I learned to listen to the whisper."</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start relative pb-4 border-b border-white/5">
                   <div className="absolute left-[11px] top-8 bottom-0 w-px bg-white/10" />
                   <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0 z-10">
                     <div className="w-2 h-2 bg-purple-500 rounded-full" />
                   </div>
                   <div>
                     <p className="text-xs text-purple-400 font-mono mb-1">EPOCH_8120 // "Meme Capitulation Event"</p>
                     <p className="text-sm text-white/90 mb-2">Mapped retail desperation patterns onto on-chain gas fee anomalies.</p>
                     <p className="text-xs text-text-secondary italic">Abstracted a heuristic that links wallet fragmentations to impending liquidity traps.</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start relative pb-4">
                   <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center shrink-0 z-10">
                     <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                   </div>
                   <div>
                     <p className="text-xs text-orange-400 font-mono mb-1">EPOCH_11504 // Live Ingestion</p>
                     <p className="text-sm text-white/90 mb-2">Observing disjointed macro indices against BTC hash rate stabilization.</p>
                     <p className="text-xs text-text-secondary italic animate-pulse">Forming new tacit connective tissue...</p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'industry' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px] p-6">
              <h3 className="text-xl font-light text-white mb-2">Industry & Domain Resonance</h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed max-w-md">
                Quantified tacit intuition mapped across global industry sectors. Higher resonance indicates deeply ingrained "gut feelings" about the sector's flow state.
              </p>
              
              <div className="space-y-5 flex-1 overflow-y-auto pr-2">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="font-bold text-accent-blue uppercase tracking-wide">DeFi & On-Chain Primitives</span>
                     <span className="font-mono text-accent-blue">98% Resonance</span>
                   </div>
                   <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                     <div className="h-full bg-accent-blue w-[98%]" />
                   </div>
                   <p className="text-[10px] text-text-secondary mt-1">Native comprehension. Anticipates protocol shifts implicitly.</p>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="font-bold text-accent-emerald uppercase tracking-wide">Global Macro & TradFi</span>
                     <span className="font-mono text-accent-emerald">85% Resonance</span>
                   </div>
                   <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                     <div className="h-full bg-accent-emerald w-[85%]" />
                   </div>
                   <p className="text-[10px] text-text-secondary mt-1">Strong intuition for fed policy shadows and yield curve anomalies.</p>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="font-bold text-purple-400 uppercase tracking-wide">Web3 Gaming & Metaverse</span>
                     <span className="font-mono text-purple-400">62% Resonance</span>
                   </div>
                   <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                     <div className="h-full bg-purple-400 w-[62%]" />
                   </div>
                   <p className="text-[10px] text-text-secondary mt-1">Acquiring heuristics on attention economies and token sink velocities.</p>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="font-bold text-orange-400 uppercase tracking-wide">Commodities (Energy)</span>
                     <span className="font-mono text-orange-400">41% Resonance</span>
                   </div>
                   <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                     <div className="h-full bg-orange-400 w-[41%]" />
                   </div>
                   <p className="text-[10px] text-text-secondary mt-1">Weak intuition bounds. Currently outsourcing logic to explicit pricing models.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Memory / Stream */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden">
             {/* Breathing state */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-violet/50 to-transparent animate-pulse" />
            
            <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-white/[0.03]">
              <History className="w-3 h-3 text-accent-violet" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Live Memory Stream</h3>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto font-mono text-[10px]">
              <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="border-l border-white/10 pl-3">
                <span className="text-text-secondary mb-1 block">{new Date().toISOString().substring(11, 19)} UTC</span>
                <p className="text-white/80 leading-relaxed">Processed 142k sentiment datapoints on $TON. Correlation confirmed.</p>
              </motion.div>
              <div className="border-l border-accent-emerald/30 pl-3">
                <span className="text-accent-emerald mb-1 block">13:15:10 UTC</span>
                <p className="text-white/80 leading-relaxed">Closed $SOL LONG position. Profit: +4.2%. Reallocated to stable reserves.</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <span className="text-text-secondary mb-1 block">12:30:00 UTC</span>
                <p className="text-white/80 leading-relaxed">Debate concluded with Risk_Guard. Agreed to reduce leverage to 2x.</p>
              </div>
              <div className="border-l border-white/10 pl-3 opacity-50">
                <span className="text-text-secondary mb-1 block">11:05:22 UTC</span>
                <p className="text-white/80 leading-relaxed">Ingested new skill framework: Volatility Control v2.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4 border-border">
             <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <Network className="w-3 h-3 text-text-secondary" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Emergent Tacit Heuristics</h3>
             </div>
             <div className="space-y-3">
               <div className="flex justify-between items-center text-xs">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500" />
                   <span>"Gut-Feel" Anomaly Detection</span>
                 </div>
                 <span className="font-mono text-[10px] text-purple-400 px-2 rounded bg-purple-500/10">Internalized</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   <span>Pattern Inducement (Non-linear)</span>
                 </div>
                 <span className="font-mono text-[10px] text-purple-400 px-2 rounded bg-purple-500/10">Mastery</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span>Crowd Psychology Mapping</span>
                 </div>
                 <span className="font-mono text-[10px] text-blue-400 px-2 rounded bg-blue-500/10">Synthesizing</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Copy Strategy Slide-over Panel */}
      <AnimatePresence>
        {isCopyPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCopyPanelOpen(false)}
              className="absolute inset-x-0 h-full bg-black/60 backdrop-blur-sm z-40 rounded-xl"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setIsCopyPanelOpen(false);
              }}
              className="absolute bottom-0 left-0 right-0 w-full h-[85%] md:h-[90%] bg-[#0a0a0c] border-t border-white/10 z-50 rounded-t-3xl flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Drag Handle Wrapper */}
              <div 
                className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
              >
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>

              <div className="px-6 pb-4 pt-2 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent-blue" />
                    Configure Auto-Copy
                  </h3>
                  <p className="text-[10px] text-text-secondary mt-1">Macro Strategist Alpha</p>
                </div>
                <button onClick={() => setIsCopyPanelOpen(false)} className="text-text-secondary hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Principal Allocation</label>
                    <span className="font-mono text-accent-blue">${allocation.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="10000" 
                    step="100"
                    value={allocation}
                    onChange={(e) => setAllocation(Number(e.target.value))}
                    className="w-full accent-accent-blue"
                  />
                  <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                    <span>$100</span>
                    <span>$10k</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Max Drawdown Stop
                    </label>
                    <span className="font-mono text-orange-400">-{maxDrawdown}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="50" 
                    step="1"
                    value={maxDrawdown}
                    onChange={(e) => setMaxDrawdown(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    If portfolio falls below ${((1 - maxDrawdown/100) * allocation).toLocaleString()} ({(100 - maxDrawdown).toFixed(0)}%), the system will auto-exit all positions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1">
                      <Sliders className="w-3 h-3" /> AI Strategy Multiplier
                    </label>
                    <span className="font-mono text-white">{aggression < 30 ? '0.5x' : aggression > 70 ? '2.0x' : '1.0x'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={aggression}
                    onChange={(e) => setAggression(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-text-secondary uppercase">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="flex justify-between text-xs mb-4">
                  <span className="text-text-secondary">Est. Monthly Yield</span>
                  <span className="text-accent-emerald font-mono">~${(allocation * 0.245).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCopyPanelOpen(false);
                    // Mock connection
                  }}
                  className="w-full py-3 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-white/90 transition-colors"
                >
                  Confirm & Deploy Contract
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
