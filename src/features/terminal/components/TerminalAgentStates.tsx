import { cn } from '@/lib/utils';
import AgentAvatar from '@/components/ui/AgentAvatar';
import { useTranslation } from 'react-i18next';
import type { TerminalAgentState } from '../types';

interface TerminalAgentStatesProps {
  agents: TerminalAgentState[];
}

export default function TerminalAgentStates({ agents }: TerminalAgentStatesProps) {
  const { t } = useTranslation();
  const idleStatus = t('terminal.agentStates.status.idle');

  return (
    <div className="flex-1 glass rounded-xl flex flex-col overflow-hidden relative">
      <div className="p-3 border-b border-white/5 bg-white/[0.02] shrink-0">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{t('terminal.agentsPanel.title')}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 relative z-10 pr-1">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="bg-black/40 border border-white/5 rounded-lg p-3 group hover:border-white/20 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-2 relative z-10">
              <div className="flex items-center gap-2">
                <AgentAvatar seed={agent.name} size={24} className="rounded shadow-lg" />
                <span className="text-xs font-bold text-white group-hover:text-accent-blue transition-colors">
                  {agent.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-mono text-white/50">{agent.status}</span>
                <div className={cn('w-1.5 h-1.5 rounded-full', agent.colorClass, agent.status !== idleStatus && 'animate-pulse')} />
              </div>
            </div>
            <div className="flex justify-between items-end mt-2 relative z-10">
              <div className="space-y-1">
                <div className="text-[9px] text-text-secondary font-mono uppercase">{agent.role}</div>
                <div className="text-[9px] text-accent-blue font-mono bg-accent-blue/10 px-1 py-0.5 rounded border border-accent-blue/20 inline-block uppercase">
                  {t('terminal.agentsPanel.focusLabel')}: {agent.focus}
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-[9px] font-mono text-white/50">{t('terminal.agentsPanel.confidenceLabel')}</span>
                <span className="text-xs font-mono text-white">{agent.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
