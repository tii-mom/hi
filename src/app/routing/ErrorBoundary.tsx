import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('HI frontend boundary captured a render fault.', error, info);
    document.title = 'System Fault | HI Protocol';
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="min-h-[100dvh] w-full bg-bg-base text-text-primary flex items-center justify-center p-6">
        <section
          aria-labelledby="error-boundary-title"
          className="w-full max-w-xl border border-red-500/20 bg-black/60 rounded-2xl p-6 shadow-[0_0_60px_rgba(239,68,68,0.08)]"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-3">
            System Fault
          </div>
          <h1 id="error-boundary-title" className="text-2xl font-light tracking-tight mb-3">The interface layer lost coherence.</h1>
          <p className="text-sm leading-relaxed text-text-secondary mb-5">
            The protocol view is still isolated from this client error. Return to the terminal shell to rehydrate the operating surface.
          </p>
          {this.state.errorMessage && (
            <pre
              aria-label="Captured error message"
              tabIndex={0}
              className="mb-5 max-h-28 overflow-auto rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[10px] text-red-200/70 outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              {this.state.errorMessage}
            </pre>
          )}
          <button
            type="button"
            onClick={() => window.location.assign('/terminal')}
            className="h-10 rounded-lg bg-white px-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white/90 outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Return to Terminal
          </button>
        </section>
      </main>
    );
  }
}
