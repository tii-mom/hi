import { cn } from '@/lib/utils';
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
          <div key={stat.label} className="glass p-3 rounded-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase relative z-10">
              {stat.label}
            </span>
            <div className="flex items-end justify-between mt-2 relative z-10">
              <span className="text-xl font-light data-value tracking-tighter text-white">{stat.value}</span>
              <span
                className={cn(
                  'text-[9px] font-mono',
                  isPositive
                    ? 'text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-1 py-0.5 rounded'
                    : 'text-text-secondary',
                )}
              >
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
