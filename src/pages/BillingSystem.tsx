import { CreditCard, Wallet, ArrowUpRight, Copy, Share, Cpu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function BillingSystem() {
  return (
    <div className="h-full flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-accent-emerald" />
            Epoch Neural Billing
          </h2>
          <p className="text-sm text-text-secondary">Manage structural capital alignment and heuristic extraction yields.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wallet Connection / Status */}
        <div className="glass rounded-xl p-6 border-accent-blue/30 relative overflow-hidden col-span-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 blur-[40px]" />
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">Connected Identity</h3>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-black/30 p-4 rounded-lg border border-white/5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-text-secondary">BASE_MAINNET</span>
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              </div>
              <div className="font-mono text-sm tracking-tight flex items-center justify-between">
                0x742...8F9a
                <Copy className="w-3 h-3 text-text-secondary cursor-pointer hover:text-white" />
              </div>
            </div>
            
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">Available Liquidity</span>
              <div className="text-3xl font-light data-value">$12.4K <span className="text-sm text-text-secondary ml-1">USDC</span></div>
              <div className="text-sm data-value text-text-secondary mt-1">2.41 ETH</div>
            </div>

            <button className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors mt-4">
              Manage Wallet
            </button>
          </div>
        </div>

        {/* Rev Share Overview */}
        <div className="glass rounded-xl p-6 col-span-1 md:col-span-2">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">Yield Synthesis Ratio (Smart Contract)</h3>
           
           <div className="flex h-12 rounded-lg overflow-hidden border border-white/10 mb-4 font-mono text-[10px] font-bold">
             <div className="bg-accent-emerald/20 text-accent-emerald w-[70%] flex items-center justify-center border-r border-black/50 relative group cursor-pointer hover:bg-accent-emerald/30 transition-colors">
                <span>WALLET YIELD (70%)</span>
             </div>
             <div className="bg-accent-blue/20 text-accent-blue w-[20%] flex items-center justify-center border-r border-black/50 group cursor-pointer hover:bg-accent-blue/30 transition-colors">
                <span>TACIT ENTITY FEE (20%)</span>
             </div>
             <div className="bg-white/10 text-white w-[10%] flex items-center justify-center group cursor-pointer hover:bg-white/20 transition-colors">
                <span>PROTOCOL ALIGNMENT (10%)</span>
             </div>
           </div>

           <div className="grid grid-cols-3 gap-4 mt-8">
             <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">Lifetime Yield</span>
                <span className="text-lg font-mono text-accent-emerald">+$4,291.50</span>
             </div>
             <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">Paid to Agents</span>
                <span className="text-lg font-mono text-accent-blue">-$1,226.14</span>
             </div>
             <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">Pending Harvest</span>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono text-white">$142.10</span>
                  <button className="text-[9px] bg-white text-black px-2 py-1 rounded font-bold uppercase hover:bg-white/90">Claim</button>
                </div>
             </div>
           </div>
        </div>

      </div>

      {/* Active Subscriptions */}
      <div className="glass rounded-xl flex-1 border border-border p-6 min-h-0 overflow-y-auto">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary border-b border-white/5 pb-2 mb-4">Active Logic Bonds</h3>
        
        <div className="space-y-3">
          {[
            { agent: 'Macro Strategist Alpha', fee: '20% Performance', limit: '10K USDC Multiplier', status: 'Active' },
            { agent: 'Risk Guardian V2', fee: '50 USDC / mo', limit: 'Global Account Veto', status: 'Trial' },
            { agent: 'Meme Sniper', fee: '30% Performance', limit: '1K USDC Max Tx', status: 'Paused' },
          ].map((sub, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Cpu className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{sub.agent}</h4>
                  <div className="flex gap-3 text-[10px] font-mono text-text-secondary mt-1">
                    <span className="text-accent-blue">{sub.fee}</span>
                    <span>LIMIT: {sub.limit}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-[10px] font-bold uppercase px-2 py-1 rounded border",
                  sub.status === 'Active' ? 'text-accent-emerald border-accent-emerald/20 bg-accent-emerald/10' :
                  sub.status === 'Trial' ? 'text-orange-400 border-orange-400/20 bg-orange-400/10' :
                  'text-text-secondary border-white/10 bg-white/5'
                )}>
                  {sub.status}
                </span>
                <button className="text-[10px] font-bold text-white/50 hover:text-white uppercase tracking-wider underline underline-offset-2">Revoke</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
