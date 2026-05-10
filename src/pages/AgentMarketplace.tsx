import { useCallback } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createAgentMarketplaceViewModel } from '@/app/services/agents';
import { loadAgentsReadModel } from '@/app/services/readModels';
import { useReadModelResource } from '@/app/services/useReadModelResource';
import { ResourceStatus } from '@/components/ui/surfaces/ResourceStatus';
import AgentAvatar from '../components/ui/AgentAvatar';

export default function AgentMarketplace() {
  const { t, i18n } = useTranslation();
  const fallback = createAgentMarketplaceViewModel(t);
  const load = useCallback((context: Parameters<typeof loadAgentsReadModel>[1]['context']) => loadAgentsReadModel(t, { context }), [t]);
  const { data: viewModel, resource } = useReadModelResource({
    fallback,
    load,
    dependencyKey: i18n.language,
  });

  return (
    <div className="h-full flex flex-col gap-6">
      <ResourceStatus resource={resource} label="Agent registry" />
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">
            {t('agents.marketplace.title', 'Tacit Entity Registry')}
          </h2>
          <p className="text-sm text-text-secondary">
            {t(
              'agents.marketplace.description',
              'Explore and recruit autonomous AI entities with deep intuitive market alignment',
            )}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewModel.agents.map((agent, i) => (
            <Link to={`/terminal/agent/${agent.id}`} key={agent.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 border border-border group hover:border-white/20 transition-all flex flex-col h-full hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between mb-4">
                  <AgentAvatar seed={agent.avatarSeed} size={48} className="rounded-xl" />
                  <div className="px-2 py-1 rounded bg-black/40 border border-white/5 text-[10px] font-mono uppercase text-text-secondary">
                    {t('agents.marketplace.card.riskLabel', {
                      defaultValue: 'Risk: {{risk}}',
                      risk: t(`agents.riskLevels.${agent.risk}`, agent.risk),
                    })}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-1 group-hover:text-white transition-colors">
                  {agent.name}
                </h3>
                <p className="text-xs text-text-secondary mb-4 uppercase tracking-wider">
                  {t('agents.marketplace.card.typeLabel', {
                    defaultValue: '{{type}} AI',
                    type: agent.type,
                  })}
                </p>

                <div className="grid grid-cols-3 gap-4 mt-auto pt-4 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-text-secondary mb-1">
                      {t('agents.marketplace.card.metrics.tacitIndex', 'TACIT INDEX')}
                    </div>
                    <div className="text-sm font-medium text-purple-400 font-mono">{agent.tacit}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-secondary mb-1">
                      {t('agents.marketplace.card.metrics.return30d', '30D RETURN')}
                    </div>
                    <div className="text-sm font-medium text-accent-emerald data-value">{agent.returnLabel}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-secondary mb-1">
                      {t('agents.marketplace.card.metrics.boundNodes', 'BOUND NODES')}
                    </div>
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
