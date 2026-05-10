import { useAppState } from '@/app/state';
import { cn } from '@/lib/utils';

export default function RouteFallback() {
  const { motionPreference } = useAppState();
  const reducedMotion = motionPreference === 'reduced';

  return (
    <div
      className="min-h-[240px] h-full w-full flex items-center justify-center bg-bg-base text-text-primary"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-sm border border-border bg-black/40 rounded-xl p-5 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
        <div className="flex items-center gap-3 mb-4">
          <div aria-hidden="true" className="relative h-8 w-8 rounded-lg border border-accent-blue/30 bg-accent-blue/10">
            <div className={cn("absolute inset-2 rounded-full bg-accent-blue", !reducedMotion && "animate-pulse")} />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white">Hydrating Interface</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">Terminal route stream</div>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className={cn("h-full w-1/2 rounded-full bg-accent-blue/80", !reducedMotion && "animate-pulse")} />
        </div>
      </div>
    </div>
  );
}
