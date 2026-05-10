import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface NotFoundProps {
  terminalScope?: boolean;
}

export default function NotFound({ terminalScope = false }: NotFoundProps) {
  useEffect(() => {
    document.title = 'Route Unknown | HI Protocol';
  }, []);

  return (
    <main aria-labelledby="not-found-title" className="min-h-full flex items-center justify-center p-6 text-text-primary">
      <section
        aria-labelledby="not-found-title"
        className="w-full max-w-lg border border-border bg-black/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(52,211,153,0.06)]"
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent-emerald mb-3">
          Route Unknown
        </div>
        <h1 id="not-found-title" className="text-3xl font-light tracking-tight mb-3">No active interface node.</h1>
        <p className="text-sm leading-relaxed text-text-secondary mb-5">
          This path is not mapped to an operating surface in the HI frontend shell.
        </p>
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
      </section>
    </main>
  );
}
