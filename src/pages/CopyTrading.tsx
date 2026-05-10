import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { BarChart2, PlayCircle, Settings, StopCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import AgentAvatar from '../components/ui/AgentAvatar';
import { cn } from '@/lib/utils';
import { createCopyTradingViewModel } from '@/app/services/copy';
import { loadCopyTradingReadModel } from '@/app/services/readModels';
import { useReadModelResource } from '@/app/services/useReadModelResource';
import { ResourceStatus } from '@/components/ui/surfaces/ResourceStatus';

export default function CopyTrading() {
  const { t, i18n } = useTranslation();
  const fallback = createCopyTradingViewModel(t);
  const load = useCallback((context: Parameters<typeof loadCopyTradingReadModel>[1]['context']) => loadCopyTradingReadModel(t, { context }), [t]);
  const { data: copyTradingViewModel, resource } = useReadModelResource({
    fallback,
    load,
    dependencyKey: i18n.language,
  });

  return (
    <div className="h-full min-h-0 flex flex-col gap-4 md:gap-6 overflow-hidden">
      <ResourceStatus resource={resource} label="Copy data" />
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-4 shrink-0 min-w-0">
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-semibold uppercase tracking-wider mb-1 break-words">{copyTradingViewModel.header.title}</h2>
          <p className="text-sm text-text-secondary">{copyTradingViewModel.header.subtitle}</p>
        </div>
        <div className="flex gap-4 items-start sm:items-center flex-wrap sm:justify-end">
          <div className="text-left sm:text-right">
            <div className="text-[10px] text-text-secondary uppercase">{copyTradingViewModel.summary.totalAllocatedLabel}</div>
            <div className="font-mono font-bold break-words">{copyTradingViewModel.summary.totalAllocatedValue}</div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-[10px] text-text-secondary uppercase">{copyTradingViewModel.summary.totalPnlLabel}</div>
            <div className="font-mono font-bold text-accent-emerald break-words">{copyTradingViewModel.summary.totalPnlValue}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-0 sm:pr-2 pb-6 space-y-4 min-h-0">
        {copyTradingViewModel.rows.map((row, index) => {
          const isRunning = row.status === 'running';
          const chartData = row.history.map((value) => ({ val: value }));

          return (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 relative overflow-hidden group min-w-0"
            >
              <div
                className={cn(
                  'absolute -left-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity',
                  row.pnl.startsWith('-') ? 'bg-red-500' : 'bg-emerald-500',
                )}
              />

              <div className="flex items-center gap-4 min-w-0 relative z-10 w-full sm:w-auto mt-2 sm:mt-0">
                <AgentAvatar seed={row.agentName} size={48} styleType={row.style} className="shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-bold break-words">{row.agentName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded border',
                        isRunning
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                          : 'bg-orange-500/10 text-orange-500 border-orange-500/30',
                      )}
                    >
                      {copyTradingViewModel.status[row.status]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full h-[60px] relative z-10 hidden sm:block min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id={`gradient-${row.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={row.pnl.startsWith('-') ? '#ef4444' : '#10b981'} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={row.pnl.startsWith('-') ? '#ef4444' : '#10b981'} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <YAxis domain={['auto', 'auto']} hide />
                    <Area
                      type="monotone"
                      dataKey="val"
                      stroke={row.pnl.startsWith('-') ? '#ef4444' : '#10b981'}
                      fill={`url(#gradient-${row.id})`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 w-full sm:w-auto relative z-10 mt-4 sm:mt-0 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0 min-w-0">
                <div>
                  <div className="text-[10px] text-text-secondary mb-1">{copyTradingViewModel.labels.allocated}</div>
                  <div className="font-mono font-medium">{row.allocation}</div>
                </div>
                <div className="text-right sm:text-left">
                  <div className="text-[10px] text-text-secondary mb-1">{copyTradingViewModel.labels.pnl}</div>
                  <div className={cn('font-mono font-medium', row.pnl.startsWith('-') ? 'text-red-400' : 'text-accent-emerald')}>
                    {row.pnl} <span className="text-[10px] opacity-70 ml-1">({row.pnlPercent})</span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2 sm:ml-4 sm:border-l border-white/10 sm:pl-6">
                  <button
                    type="button"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                    title={copyTradingViewModel.actions.manageSettings}
                    aria-label={copyTradingViewModel.actions.manageSettings}
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  {isRunning ? (
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/20 transition-colors"
                      title={copyTradingViewModel.actions.severBond}
                      aria-label={copyTradingViewModel.actions.severBond}
                    >
                      <StopCircle className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 transition-colors"
                      title={copyTradingViewModel.actions.restoreResonance}
                      aria-label={copyTradingViewModel.actions.restoreResonance}
                    >
                      <PlayCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 transition-colors sm:hidden"
                    title={copyTradingViewModel.actions.viewChart}
                    aria-label={copyTradingViewModel.actions.viewChart}
                  >
                    <BarChart2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
