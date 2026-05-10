import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Brain, Shield, Zap, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-base text-text-primary overflow-hidden selection:bg-accent-blue/30 relative">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay z-50" />
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-breathe" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-violet/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-breathe" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-accent-emerald/5 rounded-[100%] blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBMMDAgMEw0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white_30%,transparent_90%)] pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-10 z-40 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3 relative group">
           <div className="absolute inset-0 bg-accent-blue/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="w-10 h-10 rounded-xl shrink-0 bg-gradient-to-br from-black to-black border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] relative z-10 overflow-hidden">
             <div className="absolute inset-0 bg-accent-blue/10 animate-breathe" />
            <Activity className="w-5 h-5 text-white/90" />
          </div>
          <span className="font-bold tracking-[0.2em] font-mono text-xs text-white">HI PROTOCOL</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-mono uppercase tracking-widest text-text-secondary">
          <a href="#ecosystem" className="hover:text-white transition-colors relative group">
            <span className="relative z-10">{t('nav.ecosystem')}</span>
            <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all" />
          </a>
          <a href="#agents" className="hover:text-white transition-colors relative group">
            <span className="relative z-10">{t('nav.tacitAgents')}</span>
            <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all" />
          </a>
          <a href="#skills" className="hover:text-white transition-colors relative group">
            <span className="relative z-10">{t('nav.heuristics')}</span>
            <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all" />
          </a>
          <a href="#consensus" className="hover:text-white transition-colors relative group">
            <span className="relative z-10">{t('nav.resonanceChamber')}</span>
            <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all" />
          </a>
        </div>
        <div className="flex items-center gap-6">
          <LanguageSwitcher direction="down" />
          <Link 
            to="/terminal" 
            className="px-8 py-3 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2"
          >
            {t('nav.launchSystem')} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 pt-48 pb-24 px-6 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-sm border border-white/5 bg-white/[0.02] backdrop-blur-md mb-12 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-text-secondary">{t('landing.sync')}</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-6xl md:text-8xl lg:text-[100px] font-light tracking-tighter mb-10 leading-[1.05] max-w-6xl text-white mix-blend-plus-lighter"
        >
          {t('landing.title1')} <br/>
          <span className="text-text-secondary font-serif italic text-5xl md:text-7xl lg:text-[80px]">{t('landing.title2')}</span> <span className="relative">
            <span className="absolute inset-0 blur-[40px] bg-accent-blue/30 text-transparent">{t('landing.title3')}</span>
            {t('landing.title3')}
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl text-text-secondary max-w-3xl mb-16 font-light leading-relaxed"
        >
          {t('landing.subtitle')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link 
            to="/terminal" 
            className="h-16 px-10 rounded flex items-center justify-center bg-white text-black font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            {t('landing.enter')}
          </Link>
          <a href="#agents" className="h-16 px-10 rounded border border-white/10 bg-transparent hover:bg-white/5 text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center">
            {t('landing.observe')}
          </a>
        </motion.div>

        {/* Hero Visual Mock */}
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-32 w-full max-w-[1000px] aspect-[2/1] rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-3xl relative overflow-hidden flex shadow-2xl ring-1 ring-white/5"
        >
          {/* Faux Resonance Chamber */}
          <div className="absolute inset-0 bg-[#020617] mix-blend-multiply pointer-events-none" />
          
          {/* Animated Connecting Lines (Simulated SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-30 animate-breathe" viewBox="0 0 1000 500">
            <path d="M500 250 L200 150 M500 250 L800 150 M500 250 L200 400 M500 250 L800 400" stroke="white" strokeWidth="1" strokeDasharray="4 4" fill="none" className="opacity-50" />
            <circle cx="500" cy="250" r="100" stroke="var(--color-accent-blue)" strokeWidth="1" fill="none" className="opacity-20 animate-pulse-ring-blue" />
            <circle cx="500" cy="250" r="150" stroke="var(--color-accent-violet)" strokeWidth="1" fill="none" className="opacity-10 animate-pulse-ring-blue" style={{ animationDelay: '1s' }} />
          </svg>

          {/* Core Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             <div className="w-24 h-24 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center shadow-[0_0_50px_rgba(96,165,250,0.4)] relative">
                <div className="absolute inset-0 rounded-full animate-pulse-ring-blue" />
                <Brain className="w-10 h-10 text-accent-blue" />
             </div>
             <div className="mt-4 px-4 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
               <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white">{t('ui.osCore')}</span>
             </div>
          </div>

          {/* Surrounding Nodes */}
          {[
            { top: '20%', left: '20%', icon: Shield, name: t('nav.frictionNet') },
            { top: '20%', left: '80%', icon: Activity, name: t('ui.entropyScanner', 'Entropy Scanner') },
            { top: '75%', left: '25%', icon: Users, name: t('ui.memeHeuristic', 'Meme Heuristic') },
            { top: '75%', left: '75%', icon: Zap, name: t('ui.liquidityIntuition', 'Liquidity Intuition') }
          ].map((node, i) => (
            <div key={i} className="absolute flex flex-col items-center justify-center" style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}>
               <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg group hover:border-white/30 transition-colors">
                  <node.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
               </div>
               <div className="mt-3 px-3 py-1 bg-black/40 border border-white/5 rounded backdrop-blur-md whitespace-nowrap">
                 <span className="text-[9px] uppercase tracking-widest font-mono text-text-secondary">{node.name}</span>
               </div>
            </div>
          ))}

          {/* UI Overlays */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
            <div className="bg-black/50 border border-white/10 p-4 rounded-xl backdrop-blur-md w-64">
               <div className="text-[8px] uppercase tracking-widest text-accent-emerald mb-2 font-mono flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-accent-emerald rounded-full animate-pulse" /> {t('ui.consensusAchieved')}
               </div>
               <div className="text-white text-xs leading-relaxed font-light">
                 "{t('ui.executing')}"
               </div>
            </div>
            <div className="flex flex-col gap-2 pointer-events-none items-end">
               <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
                 <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">{t('ui.globalResonance')}: </span>
                 <span className="text-sm font-mono text-white">98.4%</span>
               </div>
               <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
                 <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">{t('ui.activeBonds')}: </span>
                 <span className="text-sm font-mono text-white">1,402</span>
               </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Value Props */}
      <section className="relative z-10 py-32 px-6 border-t border-border bg-black/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4">
             <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
               <Brain className="w-6 h-6 text-accent-blue" />
             </div>
             <h3 className="text-xl font-medium">Tacit Internalization</h3>
             <p className="text-text-secondary leading-relaxed">
               Agents that absorb unquantifiable market friction and sentiment dispersion, developing an implicit "gut feeling" for price action.
             </p>
           </div>
           <div className="space-y-4">
             <div className="w-12 h-12 rounded-xl bg-accent-violet/10 flex items-center justify-center border border-accent-violet/20">
               <Zap className="w-6 h-6 text-accent-violet" />
             </div>
             <h3 className="text-xl font-medium">Heuristic Resonance</h3>
             <p className="text-text-secondary leading-relaxed">
               Acquire fragments of tacit knowledge. Evolve your agents with rare, implicit capabilities forged from deep historic market traumas.
             </p>
           </div>
           <div className="space-y-4">
             <div className="w-12 h-12 rounded-xl bg-accent-emerald/10 flex items-center justify-center border border-accent-emerald/20">
               <Shield className="w-6 h-6 text-accent-emerald" />
             </div>
             <h3 className="text-xl font-medium">Emergent Consensus</h3>
             <p className="text-text-secondary leading-relaxed">
               A unique Resonance Chamber where models synthesize their non-verbal intuitions. Trades execute only when tacit alignment is achieved.
             </p>
           </div>
        </div>
      </section>
    </div>
  );
}
