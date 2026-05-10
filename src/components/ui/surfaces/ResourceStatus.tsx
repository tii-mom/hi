import type { AsyncResource } from '@/app/services/types';
import { cn } from '@/lib/utils';

interface ResourceStatusProps {
  resource: AsyncResource<unknown>;
  label: string;
  className?: string;
}

export function ResourceStatus({ resource, label, className }: ResourceStatusProps) {
  const showStatus = resource.meta.source === 'live' || resource.status !== 'success';

  if (!showStatus) {
    return null;
  }

  const isProblem = ['error', 'offline', 'unauthorized', 'rate-limited'].includes(resource.status);

  return (
    <div
      role={isProblem ? 'alert' : 'status'}
      className={cn(
        'rounded-lg border px-3 py-2 text-[10px] font-mono uppercase tracking-widest',
        isProblem
          ? 'border-red-500/30 bg-red-500/10 text-red-200'
          : 'border-white/10 bg-white/[0.03] text-text-secondary',
        className,
      )}
    >
      {label}: {resource.meta.source} / {resource.status}
      {resource.error?.message ? ` // ${resource.error.message}` : ''}
    </div>
  );
}
