import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Shell() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-bg-base text-text-primary overflow-hidden relative">
      {/* Living Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-breathe" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-breathe" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[5px] bg-accent-emerald/10 blur-[10px] pointer-events-none animate-scanline" />

      <Header />
      <main className="flex flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
        <div className="hidden md:flex relative z-10">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-hidden relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="h-full overflow-auto scroll-smooth p-4 md:p-6 pb-24 md:pb-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <div className="md:hidden absolute bottom-0 inset-x-0 w-full z-50">
        <BottomNav />
      </div>
      
      {/* Bottom Global Status */}
      <footer className="hidden md:flex h-8 border-t border-border bg-black items-center px-6 justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest relative z-50">
        <div className="flex gap-6">
          <span className="text-accent-emerald/60">Network: BASE_MAINNET</span>
          <span>Latency: 12ms</span>
          <span>Agents_Sync: 4/4</span>
        </div>
        <div className="flex gap-6">
          <span>X402_Billing: Enabled</span>
          <span className="text-text-secondary">System Time: {new Date().toISOString().substring(11, 19)} UTC</span>
        </div>
      </footer>
    </div>
  );
}
