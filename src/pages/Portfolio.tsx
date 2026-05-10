import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Shield, TrendingUp, Cpu, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const macroData = [
  { name: 'DeFi Primitives', value: 40, color: '#3b82f6' },
  { name: 'Stable Yield', value: 30, color: '#10b981' },
  { name: 'Entropy/Meme', value: 15, color: '#f97316' },
  { name: 'On-chain AI', value: 15, color: '#8b5cf6' },
];

export default function Portfolio() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border pb-4 shrink-0">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">Tacit Exposure Matrix</h2>
          <p className="text-sm text-text-secondary">Intuitive mapping of capital against systemic volatility</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-text-secondary uppercase">Total Managed Alignment</div>
          <div className="font-mono font-bold text-xl">$4,291,090.00</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 overflow-y-auto pb-6">
        {/* Left Col: Chart */}
        <div className="lg:col-span-1 glass rounded-xl border border-border p-6 flex flex-col relative">
           <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">Heuristic Weighting</h3>
           <div className="flex-1 w-full relative min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={macroData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                   stroke="none"
                 >
                   {macroData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                   itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                 />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
               <span className="text-[10px] text-text-secondary uppercase">Resonance</span>
               <span className="font-mono font-bold">98.4%</span>
             </div>
           </div>
           
           <div className="space-y-3 mt-6">
             {macroData.map((item, i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-sm">{item.name}</span>
                 </div>
                 <span className="text-sm font-mono">{item.value}%</span>
               </div>
             ))}
           </div>
        </div>

        {/* Right Col: active arrays */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex gap-4">
             <div className="flex-1 glass rounded-xl border border-border p-4 flex items-center gap-4">
               <div className="w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0">
                 <Shield className="w-5 h-5 text-accent-blue" />
               </div>
               <div>
                 <div className="text-[10px] uppercase text-text-secondary">Structural Friction</div>
                 <div className="font-mono font-bold">Low Variance</div>
               </div>
             </div>
             <div className="flex-1 glass rounded-xl border border-border p-4 flex items-center gap-4">
               <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                 <Activity className="w-5 h-5 text-orange-500" />
               </div>
               <div>
                 <div className="text-[10px] uppercase text-text-secondary">Entropy Drift</div>
                 <div className="font-mono font-bold text-orange-400">+14.2% daily</div>
               </div>
             </div>
          </div>

          <div className="glass rounded-xl border border-border p-6 flex-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">Active Intuitive Positions</h3>
            
            <div className="space-y-2">
              {[
                { pair: 'BTC-PERP', entity: 'Macro AI', size: '$1.2M', entry: '64,200', current: '68,100', pnl: '+6.07%', type: 'LONG', tac: 'High' },
                { pair: 'SOL-PERP', entity: 'Chaos AI', size: '$400K', entry: '142.50', current: '138.20', pnl: '-3.01%', type: 'LONG', tac: 'Med' },
                { pair: 'ETH-PERP', entity: 'Fund AI', size: '$850K', entry: '3,100', current: '3,050', pnl: '-1.61%', type: 'HEDGE', tac: 'Low' },
                { pair: 'PEPE-PERP', entity: 'Meme AI', size: '$100K', entry: '0.000008', current: '0.000012', pnl: '+50.0%', type: 'LONG', tac: 'Extreme' },
              ].map((pos, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex-[2]">
                    <div className="font-bold flex items-center gap-2">
                      {pos.pair}
                      <span className={cn(
                        "text-[9px] px-1.5 py-0.5 rounded font-mono",
                        pos.type === 'LONG' ? "bg-emerald-500/10 text-emerald-500" : pos.type === 'HEDGE' ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {pos.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-text-secondary mt-1">Managed by: <span className="text-accent-blue">{pos.entity}</span></div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[10px] uppercase text-text-secondary">Size</div>
                    <div className="font-mono text-sm">{pos.size}</div>
                  </div>
                  <div className="flex-[1.5] text-right">
                     <div className="text-[10px] uppercase text-text-secondary">Entry / Mark</div>
                     <div className="font-mono text-xs text-text-secondary">{pos.entry} / <span className="text-white">{pos.current}</span></div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[10px] uppercase text-text-secondary">PNL</div>
                    <div className={cn("font-mono text-sm font-bold", pos.pnl.startsWith('-') ? "text-red-400" : "text-emerald-400")}>
                      {pos.pnl}
                    </div>
                  </div>
                   <div className="flex-[0.5] text-right">
                    <div className="text-[10px] uppercase text-text-secondary">Bond</div>
                    <div className="font-mono text-xs">{pos.tac}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
