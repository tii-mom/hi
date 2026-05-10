import { cn } from '@/lib/utils';
import { MetricTile } from '@/components/ui/surfaces/MetricTile';
import { StatusBadge } from '@/components/ui/surfaces/StatusBadge';
import type { TerminalStat } from '../types';

interface TerminalStatsRowProps {
  stats: TerminalStat[];
}

export default function TerminalStatsRow({ stats }: TerminalStatsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
      {stats.map((stat) => {
        const isPositive = stat.trend === 'up';

        return (
          <MetricTile
            key={stat.label}
            label={stat.label}
            value={stat.value}
            meta={
              <StatusBadge
                tone={isPositive ? 'emerald' : 'neutral'}
                className={cn(
                  !isPositive && 'text-text-secondary',
                )}
                variant={isPositive ? 'default' : 'ghost'}
              >
                {stat.change}
              </StatusBadge>
            }
          />
        );
      })}
    </div>
  );
}
