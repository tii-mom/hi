import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';
import { Surface } from './Surface';

interface LoadingSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  indicator?: ReactNode;
  active?: boolean;
}

export function LoadingSurface({ title, subtitle, indicator, active = true, className, ...props }: LoadingSurfaceProps) {
  return (
    <div className={cn('flex min-h-[240px] w-full items-center justify-center bg-bg-base text-text-primary', className)} role="status" aria-live="polite" aria-busy="true" {...props}>
      <Surface variant="solid" className="w-full max-w-sm p-5 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
        <div className="flex items-center gap-3 mb-4">
          {indicator}
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-widest text-white">{title}</div>
            {subtitle && <div className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">{subtitle}</div>}
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className={cn('h-full w-1/2 rounded-full bg-accent-blue/80', active && 'animate-pulse')} />
        </div>
      </Surface>
    </div>
  );
}
