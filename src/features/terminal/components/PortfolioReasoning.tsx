import { motion } from 'motion/react';
import { Briefcase, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioReasoningItems } from '../data';

export default function PortfolioReasoning() {
  const { t } = useTranslation();

  return (
    <div className="glass rounded-xl p-4 flex flex-col relative overflow-hidden h-full min-h-0">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5 text-accent-blue" />
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{t('terminal.portfolio.title')}</h3>
        </div>
        <span className="text-[9px] font-mono text-accent-blue">{t('terminal.portfolio.aum')}: $2.65M</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 relative z-10 min-h-0 pr-1">
        {portfolioReasoningItems.map((item, index) => (
          <motion.div
            key={item.asset}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 border border-white/5 p-3 rounded-lg hover:border-white/20 transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-white">{item.asset}</span>
                <span className="text-[10px] font-mono text-text-secondary">{item.allocation}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono text-white">{item.value}</span>
              </div>
            </div>
            <div className="bg-accent-blue/5 border border-accent-blue/10 p-2 rounded flex gap-2 items-start mt-2 relative z-10">
              <Brain className="w-3 h-3 text-accent-blue mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] text-white/70 leading-relaxed">
                  {t(`terminal.portfolio.items.${index + 1}.reason`, item.reason)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-mono text-accent-blue uppercase">{t('terminal.portfolio.confidence')}</span>
                  <div className="flex-1 h-1 bg-black rounded-full overflow-hidden">
                    <div className="h-full bg-accent-blue" style={{ width: `${item.confidence}%` }} />
                  </div>
                  <span className="text-[9px] font-mono text-accent-blue">{item.confidence}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
