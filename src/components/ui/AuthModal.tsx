import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, X, Smartphone, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppState } from '@/app/state';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<'select' | 'connecting' | 'success'>('select');
  const connectTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();
  const { confirmWalletConnection, disconnectWallet, motionPreference, setWalletConnecting, walletStatus } = useAppState();
  const reducedMotion = motionPreference === 'reduced';

  const clearTimers = () => {
    if (connectTimerRef.current) {
      window.clearTimeout(connectTimerRef.current);
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    connectTimerRef.current = null;
    closeTimerRef.current = null;
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    clearTimers();
    if (walletStatus === 'connecting') {
      disconnectWallet();
    }
    setStep('select');
    onClose();
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      handleClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      modalRef.current?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleConnect = (identityLabel: string) => {
    setStep('connecting');
    setWalletConnecting();
    connectTimerRef.current = window.setTimeout(() => {
      confirmWalletConnection(identityLabel);
      setStep('success');
      closeTimerRef.current = window.setTimeout(() => {
        onClose();
        setStep('select');
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4">
        <motion.div 
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
          aria-hidden="true"
        />
        
        <motion.div 
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          aria-describedby={step === 'select' ? 'auth-modal-description' : undefined}
          tabIndex={-1}
          onKeyDown={handleDialogKeyDown}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={reducedMotion ? { duration: 0 } : undefined}
          className="w-full max-w-md max-h-[calc(100dvh-2rem)] bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden outline-none"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
            <h2 id="auth-modal-title" className="font-bold text-sm uppercase tracking-widest text-white">{t('auth.title')}</h2>
            <button
              type="button"
              onClick={handleClose}
              aria-label={t('auth.close')}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            >
              <X aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 relative overflow-y-auto max-h-[calc(100dvh-6rem)]">
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div
                  key="select"
                  initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                  transition={reducedMotion ? { duration: 0 } : undefined}
                  className="space-y-4"
                >
                  <p id="auth-modal-description" className="text-xs text-white/50 mb-6 text-center leading-relaxed">
                    {t('auth.description')}
                  </p>
                  
                  <button 
                    type="button"
                    onClick={() => handleConnect(t('auth.identities.telegram'))}
                    className="w-full p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-all flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center">
                        <Smartphone aria-hidden="true" className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm text-white">{t('auth.telegram.title')}</div>
                        <div className="text-[10px] uppercase font-mono text-white/40">{t('auth.telegram.subtitle')}</div>
                      </div>
                    </div>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 text-white/30 group-hover:text-blue-500 transition-colors" />
                  </button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                    <div className="relative flex justify-center"><span className="bg-[#0a0a0c] px-2 text-[10px] uppercase tracking-widest text-white/30">{t('auth.divider')}</span></div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => handleConnect(t('auth.identities.baseWallet'))}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  >
                     <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <Wallet aria-hidden="true" className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm text-white">{t('auth.baseWallet.title')}</div>
                        <div className="text-[10px] uppercase font-mono text-white/40">{t('auth.baseWallet.subtitle')}</div>
                      </div>
                    </div>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                  </button>
                </motion.div>
              )}

              {step === 'connecting' && (
                <motion.div
                  key="connecting"
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={reducedMotion ? { duration: 0 } : undefined}
                  className="flex flex-col items-center justify-center py-12"
                  role="status"
                  aria-live="polite"
                >
                  <div aria-hidden="true" className={cn("w-16 h-16 rounded-full border-2 border-white/10 border-t-accent-blue mb-6", !reducedMotion && "animate-spin")} />
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">{t('auth.connecting.title')}</h4>
                  <p className={cn("text-[10px] font-mono text-white/50", !reducedMotion && "animate-pulse")}>{t('auth.connecting.description')}</p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={reducedMotion ? { duration: 0 } : undefined}
                  className="flex flex-col items-center justify-center py-12"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-emerald/20 flex items-center justify-center mb-6 border border-accent-emerald/50">
                    <svg aria-hidden="true" className="w-8 h-8 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">{t('auth.success.title')}</h4>
                  <p className="text-[10px] font-mono text-accent-emerald">{t('auth.success.description')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
