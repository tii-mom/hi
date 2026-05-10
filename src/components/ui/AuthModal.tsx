import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, X, Smartphone, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<'select' | 'connecting' | 'success'>('select');

  if (!isOpen) return null;

  const handleConnect = () => {
    setStep('connecting');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onClose();
        setStep('select');
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
            <h3 className="font-bold text-sm uppercase tracking-widest text-white">Connect Identity</h3>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 relative">
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <p className="text-xs text-white/50 mb-6 text-center leading-relaxed">
                    Authenticate to deploy agents, synchronize reputation across the network, and manage x402 billing parameters.
                  </p>
                  
                  <button 
                    onClick={handleConnect}
                    className="w-full p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm text-white">Telegram Account</div>
                        <div className="text-[10px] uppercase font-mono text-white/40">Powered by TON</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-blue-500 transition-colors" />
                  </button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                    <div className="relative flex justify-center"><span className="bg-[#0a0a0c] px-2 text-[10px] uppercase tracking-widest text-white/30">OR WEB3</span></div>
                  </div>

                  <button 
                    onClick={handleConnect}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all flex items-center justify-between group"
                  >
                     <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm text-white">Base Wallet</div>
                        <div className="text-[10px] uppercase font-mono text-white/40">Coinbase / Metamask</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                  </button>
                </motion.div>
              )}

              {step === 'connecting' && (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-accent-blue animate-spin mb-6" />
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">Establishing Secure Link</h4>
                  <p className="text-[10px] font-mono text-white/50 animate-pulse">Requesting cryptographic signature...</p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-emerald/20 flex items-center justify-center mb-6 border border-accent-emerald/50">
                    <svg className="w-8 h-8 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">Identity Confirmed</h4>
                  <p className="text-[10px] font-mono text-accent-emerald">System Access Granted</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
