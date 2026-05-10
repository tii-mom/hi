import { useAppState } from '@/app/state';
import { cn } from '@/lib/utils';
import { LoadingSurface } from '@/components/ui/surfaces/LoadingSurface';

export default function RouteFallback() {
  const { motionPreference } = useAppState();
  const reducedMotion = motionPreference === 'reduced';

  return (
    <LoadingSurface
      title="Hydrating Interface"
      subtitle="Terminal route stream"
      active={!reducedMotion}
      indicator={
        <div aria-hidden="true" className="relative h-8 w-8 rounded-lg border border-accent-blue/30 bg-accent-blue/10">
          <div className={cn('absolute inset-2 rounded-full bg-accent-blue', !reducedMotion && 'animate-pulse')} />
        </div>
      }
    />
  );
}
