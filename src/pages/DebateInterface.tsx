import { motion } from 'motion/react';
import { Activity, Check, X, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { consensusViewModel, type ConsensusCopy, type ConsensusVoteIcon } from '@/features/consensus';
import { cn } from '@/lib/utils';
import AgentAvatar from '../components/ui/AgentAvatar';

const voteIconMap: Record<ConsensusVoteIcon, LucideIcon> = {
  check: Check,
  x: X,
  activity: Activity,
};

export default function DebateInterface() {
  const { t } = useTranslation();
  const copy = (item: ConsensusCopy) => t(item.key, item.fallback);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">{t('nav.resonanceChamber')}</h2>
          <p className="text-sm text-text-secondary">{copy(consensusViewModel.header.subtitle)}</p>
        </div>
        <div className="px-3 py-1 rounded bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-mono animate-pulse">
          {copy(consensusViewModel.header.synthesisStatus)}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
        {/* Debate Thread */}
        <div className="col-span-2 glass rounded-xl border border-border p-6 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-6 pr-4">
            {consensusViewModel.dialogues.map((dialogue) => (
              <div key={dialogue.id} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 relative">
                  <div className="absolute inset-0 rounded-full animate-pulse-ring-blue" />
                  <AgentAvatar
                    seed={copy(dialogue.name)}
                    size={40}
                    className="rounded-full relative z-10"
                    styleType={dialogue.avatarStyle}
                  />
                </div>
                <div
                  className={cn(
                    'bg-black/60 backdrop-blur-md p-4 rounded-xl rounded-tl-none border flex-1 relative overflow-hidden group',
                    dialogue.borderColorClass,
                    dialogue.shadowColorClass,
                  )}
                >
                  <div className={cn('absolute top-0 left-0 w-1 h-full', dialogue.railColorClass)} />
                  <div className="flex justify-between items-center mb-2">
                    <span className={cn('text-sm font-semibold', dialogue.statusColorClass)}>
                      {copy(dialogue.name)}
                    </span>
                    <span className={cn('text-[10px] font-mono', dialogue.statusClass)}>{copy(dialogue.status)}</span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed relative z-10">{copy(dialogue.dialogue)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="bg-accent-emerald/10 border border-accent-emerald/30 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-accent-emerald uppercase tracking-wider mb-1">
                  {copy(consensusViewModel.consensus.status)}
                </h4>
                <p className="text-xs text-text-secondary">{copy(consensusViewModel.consensus.message)}</p>
              </div>
              <button className="px-4 py-2 bg-accent-emerald text-black text-sm font-bold rounded-lg hover:bg-accent-emerald/80 transition-colors">
                {copy(consensusViewModel.consensus.action)}
              </button>
            </div>
          </div>
        </div>

        {/* Voting & Graph */}
        <div className="col-span-1 flex flex-col gap-6 h-full min-h-0">
          <div className="glass rounded-xl border border-border p-4 flex-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary border-b border-border pb-2 mb-4">
              {copy(consensusViewModel.voteMatrix.title)}
            </h3>
            <div className="space-y-4">
              {consensusViewModel.voteMatrix.votes.map((vote) => {
                const Icon = voteIconMap[vote.icon];

                return (
                  <div
                    key={vote.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/5"
                  >
                    <span className="text-sm font-medium">{copy(vote.name)}</span>
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs font-mono', vote.colorClass)}>{copy(vote.vote)}</span>
                      <Icon className={cn('w-4 h-4', vote.colorClass)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="glass rounded-xl border border-border p-4 flex-[0.6] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 w-full flex justify-between items-center z-10 pointer-events-none">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                {copy(consensusViewModel.graph.title)}
              </h3>
              <span className="text-[9px] font-mono text-accent-violet animate-pulse border border-accent-violet/30 bg-accent-violet/10 px-2 py-0.5 rounded">
                {copy(consensusViewModel.graph.status)}
              </span>
            </div>

            {/* Simple Node Graph using SVG */}
            <div className="relative w-full aspect-square max-w-[300px] mt-4">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                {/* Edges */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  d="M 100 50 L 50 150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-white/20"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
                  d="M 100 50 L 150 150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-white/20"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.4 }}
                  d="M 50 150 L 150 150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-red-500/50"
                />

                {/* Nodes */}
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0 }}
                  cx="100"
                  cy="50"
                  r="16"
                  fill="#3b82f6"
                  fillOpacity="0.2"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  cx="50"
                  cy="150"
                  r="16"
                  fill="#f97316"
                  fillOpacity="0.2"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.6 }}
                  cx="150"
                  cy="150"
                  r="16"
                  fill="#10b981"
                  fillOpacity="0.2"
                  stroke="#10b981"
                  strokeWidth="2"
                />

                {/* Active Pulses */}
                <circle
                  cx="100"
                  cy="50"
                  r="16"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  className="animate-ping opacity-20"
                />

                {/* Labels */}
                {consensusViewModel.graph.nodes.map((node) => (
                  <text
                    key={`${node.id}-initial`}
                    x={node.initialX}
                    y={node.initialY}
                    fontSize="8"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono font-bold"
                  >
                    {node.initial}
                  </text>
                ))}

                {/* Context text */}
                {consensusViewModel.graph.nodes.map((node) => (
                  <text
                    key={node.id}
                    x={node.x}
                    y={node.y}
                    fontSize="6"
                    fill="#888"
                    textAnchor="middle"
                    className="font-mono uppercase"
                  >
                    {copy(node.label)}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
