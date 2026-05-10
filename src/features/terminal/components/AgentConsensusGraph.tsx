import { motion } from 'motion/react';
import { Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AgentConsensusGraph() {
  const { t } = useTranslation();

  return (
    <div className="glass rounded-xl p-4 flex flex-col relative overflow-hidden h-full min-h-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-violet/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <Network className="w-3.5 h-3.5 text-accent-violet" />
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{t('terminal.consensus.title')}</h3>
        </div>
        <span className="text-[9px] font-mono text-accent-emerald bg-accent-emerald/10 px-2 py-0.5 rounded border border-accent-emerald/20">
          {t('terminal.consensus.aligned')}
        </span>
      </div>

      <div className="flex-1 relative min-h-0 flex items-center justify-center">
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(192,132,252,0.4)',
              '0 0 0 20px rgba(192,132,252,0)',
              '0 0 0 0 rgba(192,132,252,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-black border border-accent-violet flex flex-col items-center justify-center z-20 relative shadow-[0_0_15px_rgba(192,132,252,0.3)]"
        >
          <span className="text-[10px] font-bold text-accent-violet">{t('terminal.consensus.executeNode')}</span>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="w-48 h-48 rounded-full border border-white/5 absolute"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-black border border-accent-blue flex items-center justify-center mb-1">
                <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              </div>
              <span className="text-[8px] font-mono text-text-secondary">{t('terminal.consensus.nodes.macro')}</span>
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center rotate-180">
              <div className="w-6 h-6 rounded-full bg-black border border-orange-500 flex items-center justify-center mb-1 rotate-180">
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              </div>
              <span className="text-[8px] font-mono text-text-secondary rotate-180">{t('terminal.consensus.nodes.whale')}</span>
            </div>

            <div className="absolute top-1/2 -left-3 -translate-y-1/2 flex flex-col items-center -rotate-90">
              <div className="w-6 h-6 rounded-full bg-black border border-accent-emerald flex items-center justify-center mb-1 rotate-90">
                <span className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <span className="text-[8px] font-mono text-text-secondary rotate-90 mt-1">{t('terminal.consensus.nodes.risk')}</span>
            </div>
          </motion.div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0 0 4px rgba(192,132,252,0.5))' }}>
          <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="var(--color-accent-violet)" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 animate-pulse" />
          <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="var(--color-accent-violet)" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 animate-pulse" />
          <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="var(--color-accent-violet)" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 animate-pulse" />
        </svg>
      </div>
    </div>
  );
}
