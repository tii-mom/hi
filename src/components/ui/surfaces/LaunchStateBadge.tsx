import { StatusBadge } from './StatusBadge';

export type LaunchState = 'live' | 'preview' | 'disabled';

const launchStateConfig: Record<LaunchState, { label: string; tone: 'emerald' | 'amber' | 'red' }> = {
  live: { label: 'Live', tone: 'emerald' },
  preview: { label: 'Preview', tone: 'amber' },
  disabled: { label: 'Disabled', tone: 'red' },
};

interface LaunchStateBadgeProps {
  state: LaunchState;
  className?: string;
}

export function LaunchStateBadge({ state, className }: LaunchStateBadgeProps) {
  const config = launchStateConfig[state];

  return (
    <StatusBadge tone={config.tone} className={className}>
      {config.label}
    </StatusBadge>
  );
}
