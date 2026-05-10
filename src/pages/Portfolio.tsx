import { Activity, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { portfolioViewModel } from '@/features/portfolio';
import type { PortfolioCopy, PortfolioPositionType } from '@/features/portfolio';
import { cn } from '@/lib/utils';

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatCompactUsd(value: number) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }

  return formatUsd(value);
}

function formatPrice(value: number) {
  if (value < 0.01) {
    return value.toFixed(6);
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number) {
  const sign = value > 0 ? '+' : '';

  return `${sign}${value.toFixed(value % 1 === 0 ? 1 : 2)}%`;
}

function positionTone(type: PortfolioPositionType) {
  if (type === 'long') {
    return 'bg-emerald-500/10 text-emerald-500';
  }

  if (type === 'hedge') {
    return 'bg-blue-500/10 text-blue-500';
  }

  return 'bg-red-500/10 text-red-500';
}

export default function Portfolio() {
  const { t } = useTranslation();
  const copy = (item: PortfolioCopy) => t(item.key, item.fallback);
  const chartData = portfolioViewModel.allocations.map((item) => ({
    ...item,
    name: copy(item.label),
    value: item.valuePercent,
  }));

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border pb-4 shrink-0">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">{copy(portfolioViewModel.title)}</h2>
          <p className="text-sm text-text-secondary">{copy(portfolioViewModel.subtitle)}</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-text-secondary uppercase">{copy(portfolioViewModel.totalManagedLabel)}</div>
          <div className="font-mono font-bold text-xl">{formatUsd(portfolioViewModel.totalManagedUsd)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 overflow-y-auto pb-6">
        <div className="lg:col-span-1 glass rounded-xl border border-border p-6 flex flex-col relative">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">
            {copy(portfolioViewModel.weightingTitle)}
          </h3>
          <div className="flex-1 w-full relative min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-[10px] text-text-secondary uppercase">{copy(portfolioViewModel.resonanceLabel)}</span>
              <span className="font-mono font-bold">{portfolioViewModel.resonancePercent.toFixed(1)}%</span>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-mono">{item.valuePercent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex gap-4">
            {portfolioViewModel.metrics.map((metric) => {
              const isOrange = metric.tone === 'orange';
              const Icon = isOrange ? Activity : Shield;

              return (
                <div key={metric.id} className="flex-1 glass rounded-xl border border-border p-4 flex items-center gap-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg border flex items-center justify-center shrink-0',
                      isOrange ? 'bg-orange-500/10 border-orange-500/20' : 'bg-accent-blue/10 border-accent-blue/20',
                    )}
                  >
                    <Icon className={cn('w-5 h-5', isOrange ? 'text-orange-500' : 'text-accent-blue')} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-text-secondary">{copy(metric.label)}</div>
                    <div className={cn('font-mono font-bold', isOrange && 'text-orange-400')}>{copy(metric.value)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass rounded-xl border border-border p-6 flex-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">
              {copy(portfolioViewModel.positionsTitle)}
            </h3>

            <div className="space-y-2">
              {portfolioViewModel.positions.map((position) => (
                <div
                  key={position.id}
                  className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex-[2]">
                    <div className="font-bold flex items-center gap-2">
                      {position.pair}
                      <span className={cn('text-[9px] px-1.5 py-0.5 rounded font-mono', positionTone(position.type))}>
                        {copy(portfolioViewModel.positionTypes[position.type])}
                      </span>
                    </div>
                    <div className="text-[10px] text-text-secondary mt-1">
                      {copy(portfolioViewModel.positionLabels.managedBy)}:{' '}
                      <span className="text-accent-blue">{copy(position.manager)}</span>
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[10px] uppercase text-text-secondary">{copy(portfolioViewModel.positionLabels.size)}</div>
                    <div className="font-mono text-sm">{formatCompactUsd(position.sizeUsd)}</div>
                  </div>
                  <div className="flex-[1.5] text-right">
                    <div className="text-[10px] uppercase text-text-secondary">{copy(portfolioViewModel.positionLabels.entryMark)}</div>
                    <div className="font-mono text-xs text-text-secondary">
                      {formatPrice(position.entryPrice)} / <span className="text-white">{formatPrice(position.markPrice)}</span>
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-[10px] uppercase text-text-secondary">{copy(portfolioViewModel.positionLabels.pnl)}</div>
                    <div className={cn('font-mono text-sm font-bold', position.pnlPercent < 0 ? 'text-red-400' : 'text-emerald-400')}>
                      {formatPercent(position.pnlPercent)}
                    </div>
                  </div>
                  <div className="flex-[0.5] text-right">
                    <div className="text-[10px] uppercase text-text-secondary">{copy(portfolioViewModel.positionLabels.bond)}</div>
                    <div className="font-mono text-xs">{copy(position.bond)}</div>
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
