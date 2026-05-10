import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  titleId?: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, titleId, eyebrow, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex min-h-[220px] items-center justify-center p-6', className)} {...props}>
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-black/40 p-5 text-center shadow-[0_0_40px_rgba(59,130,246,0.08)]">
        {eyebrow && <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.3em] text-accent-emerald">{eyebrow}</div>}
        <h1 id={titleId} className="text-2xl font-light tracking-tight text-white">{title}</h1>
        {description && <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>}
        {action && <div className="mt-4 flex justify-center">{action}</div>}
      </div>
    </div>
  );
}
