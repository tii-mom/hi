import { motion } from 'motion/react';
import { Database, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { aiMemoryItems } from '../data';

export default function AIMemoryModule() {
  const { t } = useTranslation();

  return (
    <div className="glass rounded-xl p-4 flex flex-col relative overflow-hidden h-full min-h-0">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-text-secondary" />
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
            {t('terminal.memory.title')}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
          <span className="text-[9px] font-mono text-text-secondary uppercase">{t('terminal.memory.scanning')}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 relative z-10 min-h-0 pr-1">
        {aiMemoryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-black/30 border border-white/5 p-3 rounded-lg relative overflow-hidden group hover:bg-black/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 text-[10px] text-text-secondary font-mono">
                <Clock className="w-3 h-3" />
                <span>{t('terminal.memory.retrieval')}</span>
              </div>
              <span className="text-[9px] font-mono text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded border border-accent-blue/20">
                {item.similarity} {t('terminal.memory.matchSuffix')}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-[11px] mb-2">
              <span className="text-white/60">
                {t('terminal.memory.queryLabel')}: <span className="text-white font-mono">{t(`terminal.memory.items.${item.id}.query`, item.query)}</span>
              </span>
              <span className="text-white/60">
                {t('terminal.memory.matchLabel')}: <span className="text-accent-blue font-mono">{t(`terminal.memory.items.${item.id}.match`, item.match)}</span>
              </span>
            </div>

            <p className="text-[10px] text-white/50 leading-relaxed border-l-2 border-white/10 pl-2 mt-2">
              {t(`terminal.memory.items.${item.id}.insight`, item.insight)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
