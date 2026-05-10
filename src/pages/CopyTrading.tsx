import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { BarChart2, PlayCircle, Settings, StopCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import AgentAvatar from '../components/ui/AgentAvatar';
import { cn } from '@/lib/utils';
import { copyTradingViewModel, type FeatureCopy } from '@/features/copy';

export default function CopyTrading() {
  const { t } = useTranslation();
  const copy = (item: FeatureCopy) => t(item.key, item.fallback);

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border pb-4 shrink-0">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">{copy(copyTradingViewModel.header.title)}</h2>
          <p className="text-sm text-text-secondary">{copy(copyTradingViewModel.header.subtitle)}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <div className="text-[10px] text-text-secondary uppercase">{copy(copyTradingViewModel.summary.totalAllocated)}</div>
            <div className="font-mono font-bold">$23,000.00</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-text-secondary uppercase">{copy(copyTradingViewModel.summary.totalPnl)}</div>
            <div className="font-mono font-bold text-accent-emerald">+$4,240.00</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6 space-y-4">
        {copyTradingViewModel.rows.map((row, index) => {
          const isRunning = row.status === 'running';
          const statusCopy = isRunning ? copyTradingViewModel.status.running : copyTradingViewModel.status.paused;
          const chartData = row.history.map((value) => ({ val: value }));

          return (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl border border-white/10 p-5 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group"
            >
              <div
                className={cn(
                  'absolute -left-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity',
                  row.pnl.startsWith('-') ? 'bg-red-500' : 'bg-emerald-500',
                )}
              />

              <div className="flex items-center gap-4 min-w-[240px] relative z-10 w-full sm:w-auto mt-2 sm:mt-0">
                <AgentAvatar seed={copy(row.agent)} size={48} styleType={row.style} className="shrink-0" />
                <div>
                  <h3 className="font-bold">{copy(row.agent)}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded border',
                        isRunning
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                          : 'bg-orange-500/10 text-orange-500 border-orange-500/30',
                      )}
                    >
                      {copy(statusCopy)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full h-[60px] relative z-10 hidden sm:block">
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

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-8 w-full sm:w-auto relative z-10 mt-4 sm:mt-0 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                <div>
                  <div className="text-[10px] text-text-secondary mb-1">{copy(copyTradingViewModel.labels.allocated)}</div>
                  <div className="font-mono font-medium">{row.allocation}</div>
                </div>
                <div className="text-right sm:text-left">
                  <div className="text-[10px] text-text-secondary mb-1">{copy(copyTradingViewModel.labels.pnl)}</div>
                  <div className={cn('font-mono font-medium', row.pnl.startsWith('-') ? 'text-red-400' : 'text-accent-emerald')}>
                    {row.pnl} <span className="text-[10px] opacity-70 ml-1">({row.pnlPercent})</span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2 sm:ml-4 sm:border-l border-white/10 sm:pl-6">
                  <button
                    type="button"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                    title={copy(copyTradingViewModel.actions.manageSettings)}
                    aria-label={copy(copyTradingViewModel.actions.manageSettings)}
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  {isRunning ? (
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/20 transition-colors"
                      title={copy(copyTradingViewModel.actions.severBond)}
                      aria-label={copy(copyTradingViewModel.actions.severBond)}
                    >
                      <StopCircle className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 transition-colors"
                      title={copy(copyTradingViewModel.actions.restoreResonance)}
                      aria-label={copy(copyTradingViewModel.actions.restoreResonance)}
                    >
                      <PlayCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 transition-colors sm:hidden"
                    title={copy(copyTradingViewModel.actions.viewChart)}
                    aria-label={copy(copyTradingViewModel.actions.viewChart)}
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
