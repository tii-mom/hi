import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface FaultPanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message: ReactNode;
  details?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

export function FaultPanel({ title, message, details, action, children, className, ...props }: FaultPanelProps) {
  return (
    <section className={cn('w-full max-w-xl rounded-2xl border border-red-500/20 bg-black/60 p-6 shadow-[0_0_60px_rgba(239,68,68,0.08)]', className)} {...props}>
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-3">{title}</div>
      <div className="text-2xl font-light tracking-tight text-white">{message}</div>
      {details && <div className="mt-3 text-sm leading-relaxed text-text-secondary">{details}</div>}
      {children}
      {action && <div className="mt-5">{action}</div>}
    </section>
  );
}
