import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type StatusTone = 'blue' | 'emerald' | 'violet' | 'neutral' | 'red' | 'amber';

const toneClasses: Record<StatusTone, string> = {
  blue: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
  emerald: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20',
  violet: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20',
  neutral: 'text-text-secondary bg-white/5 border-white/10',
  red: 'text-red-300 bg-red-500/10 border-red-500/20',
  amber: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
};

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
}

export function StatusBadge({ tone = 'neutral', className, ...props }: StatusBadgeProps) {
  return <span className={cn('inline-flex items-center rounded border px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest', toneClasses[tone], className)} {...props} />;
}

