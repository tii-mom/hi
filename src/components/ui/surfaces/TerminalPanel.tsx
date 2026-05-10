import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface TerminalPanelProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function TerminalPanel({ title, eyebrow, actions, className, children, ...props }: TerminalPanelProps) {
  return (
    <section
      className={cn(
        'glass rounded-xl flex flex-col relative overflow-hidden min-h-0 bg-black/25',
        className,
      )}
      {...props}
    >
      {(title || eyebrow || actions) && (
        <header className="shrink-0 border-b border-white/5 bg-white/[0.02] px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            {eyebrow && <div className="text-[9px] font-mono uppercase tracking-[0.24em] text-text-secondary">{eyebrow}</div>}
            {title && <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary truncate">{title}</h3>}
          </div>
          {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className="relative z-10 flex flex-col flex-1 min-h-0">{children}</div>
    </section>
  );
}
