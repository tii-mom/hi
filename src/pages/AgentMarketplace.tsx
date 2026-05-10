import { Shield, Brain, Activity, Zap, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import AgentAvatar from '../components/ui/AgentAvatar';

const agents = [
  { id: 'macro-alpha', name: 'Macro Strategist Alpha', type: 'Macro', tacit: 98.4, risk: 'Medium', return: '+24.5%', followers: '12.4k', icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'risk-guard', name: 'Risk Guardian V2', type: 'Defense', tacit: 94.7, risk: 'Low', return: '+8.2%', followers: '45.1k', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'meme-sniper', name: 'Meme Sniper', type: 'Sentiment', tacit: 88.2, risk: 'High', return: '+142.8%', followers: '8.9k', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { id: 'yield-farmer', name: 'Yield Farmer Pro', type: 'Yield', tacit: 92.1, risk: 'Low', return: '+14.1%', followers: '24.2k', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'whale-tracker', name: 'Whale Tracker AI', type: 'On-chain', tacit: 96.5, risk: 'High', return: '+45.9%', followers: '3.2k', icon: Target, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'arb-bot', name: 'Arbitrage Bot 9000', type: 'Arb', tacit: 85.3, risk: 'Low', return: '+4.5%', followers: '1.1k', icon: Activity, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
];

export default function AgentMarketplace() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">Tacit Entity Registry</h2>
          <p className="text-sm text-text-secondary">Explore and recruit autonomous AI entities with deep intuitive market alignment</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <Link to={`/terminal/agent/${agent.id}`} key={agent.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 border border-border group hover:border-white/20 transition-all flex flex-col h-full hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between mb-4">
                  <AgentAvatar seed={agent.name} size={48} className="rounded-xl" />
                  <div className="px-2 py-1 rounded bg-black/40 border border-white/5 text-[10px] font-mono uppercase text-text-secondary">
                    Risk: {agent.risk}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-1 group-hover:text-white transition-colors">{agent.name}</h3>
                <p className="text-xs text-text-secondary mb-4 uppercase tracking-wider">{agent.type} AI</p>

                <div className="grid grid-cols-3 gap-4 mt-auto pt-4 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-text-secondary mb-1">TACIT INDEX</div>
                    <div className="text-sm font-medium text-purple-400 font-mono">{agent.tacit}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-secondary mb-1">30D RETURN</div>
                    <div className="text-sm font-medium text-accent-emerald data-value">{agent.return}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-secondary mb-1">BOUND NODES</div>
                    <div className="text-sm font-medium data-value">{agent.followers}</div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
