import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EmptyState } from '@/components/ui/surfaces/EmptyState';

interface NotFoundProps {
  terminalScope?: boolean;
}

export default function NotFound({ terminalScope = false }: NotFoundProps) {
  useEffect(() => {
    document.title = 'Route Unknown | HI Protocol';
  }, []);

  return (
    <main aria-labelledby="not-found-title" className="min-h-full text-text-primary">
      <EmptyState
        titleId="not-found-title"
        eyebrow="Route Unknown"
        title="No active interface node."
        description="This path is not mapped to an operating surface in the HI frontend shell."
        action={
          <div className="flex flex-wrap gap-3">
            <Link
              to="/terminal"
              className="h-10 inline-flex items-center rounded-lg bg-white px-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white/90 outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Open Terminal
            </Link>
            {terminalScope && (
              <Link
                to="/"
                className="h-10 inline-flex items-center rounded-lg border border-white/10 px-4 text-xs font-bold uppercase tracking-widest text-text-secondary transition-colors hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Exit Shell
              </Link>
            )}
          </div>
        }
      />
    </main>
  );
}
