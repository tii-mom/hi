import { cn } from '@/lib/utils';
import AgentAvatar from '@/components/ui/AgentAvatar';
import { TerminalPanel } from '@/components/ui/surfaces/TerminalPanel';
import { StatusBadge } from '@/components/ui/surfaces/StatusBadge';
import { Surface } from '@/components/ui/surfaces/Surface';
import { useTranslation } from 'react-i18next';
import type { TerminalAgentState } from '../types';

interface TerminalAgentStatesProps {
  agents: TerminalAgentState[];
}

export default function TerminalAgentStates({ agents }: TerminalAgentStatesProps) {
  const { t } = useTranslation();
  const idleStatus = t('terminal.agentStates.status.idle');

  return (
    <TerminalPanel className="flex-1" title={t('terminal.agentsPanel.title')}>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 relative z-10 pr-1">
        {agents.map((agent) => (
          <Surface
            key={agent.name}
            variant="inset"
            className="rounded-lg p-3 group hover:border-white/20 transition-all relative overflow-hidden"
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
                <StatusBadge tone="neutral" variant="ghost" className="text-[8px] text-white/50">
                  {agent.status}
                </StatusBadge>
                <div className={cn('w-1.5 h-1.5 rounded-full', agent.colorClass, agent.status !== idleStatus && 'animate-pulse')} />
              </div>
            </div>
            <div className="flex justify-between items-end mt-2 relative z-10">
              <div className="space-y-1">
                <div className="text-[9px] text-text-secondary font-mono uppercase">{agent.role}</div>
                <StatusBadge tone="blue" className="px-1">
                  {t('terminal.agentsPanel.focusLabel')}: {agent.focus}
                </StatusBadge>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-[9px] font-mono text-white/50">{t('terminal.agentsPanel.confidenceLabel')}</span>
                <span className="text-xs font-mono text-white">{agent.confidence}%</span>
              </div>
            </div>
          </Surface>
        ))}
      </div>
    </TerminalPanel>
  );
}
