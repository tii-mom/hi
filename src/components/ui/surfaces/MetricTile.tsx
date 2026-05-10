import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface MetricTileProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  meta?: ReactNode;
}

export function MetricTile({ label, value, meta, className, ...props }: MetricTileProps) {
  return (
    <div className={cn('glass rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group min-h-[84px]', className)} {...props}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase relative z-10">{label}</span>
      <div className="flex items-end justify-between gap-3 mt-2 relative z-10">
        <span className="text-xl font-light data-value tracking-tighter text-white truncate">{value}</span>
        {meta && <div className="shrink-0">{meta}</div>}
      </div>
    </div>
  );
}

