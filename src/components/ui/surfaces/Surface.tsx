import { cn } from '@/lib/utils';
import type { ElementType, HTMLAttributes } from 'react';

type SurfaceVariant = 'glass' | 'solid' | 'danger' | 'inset';

const variantClasses: Record<SurfaceVariant, string> = {
  glass: 'glass border border-border bg-black/25',
  solid: 'border border-border bg-black/40',
  danger: 'border border-red-500/20 bg-black/60 shadow-[0_0_60px_rgba(239,68,68,0.08)]',
  inset: 'border border-white/5 bg-black/40',
};

interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: SurfaceVariant;
  [key: string]: unknown;
}

export function Surface({ as: Component = 'div', variant = 'glass', className, ...props }: SurfaceProps) {
  return <Component className={cn('rounded-xl', variantClasses[variant], className)} {...props} />;
}
