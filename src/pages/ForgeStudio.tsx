import { useState } from 'react';
import { motion } from 'motion/react';
import { Beaker, Brain, Cpu, Hammer, SlidersHorizontal, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  forgeViewModel,
  metricToneClasses,
  modelToneClasses,
  type ForgeCopy,
  type ForgeModelId,
  type ForgePersonalityId,
  type ForgePreviewMetric,
} from '@/features/forge';
import { cn } from '@/lib/utils';

function getMetricValue(metric: ForgePreviewMetric, personality: ForgePersonalityId) {
  return metric.valuePercentByPersonality?.[personality] ?? metric.valuePercent;
}

export default function ForgeStudio() {
  const [model, setModel] = useState<ForgeModelId>(forgeViewModel.modelOptions[0].id);
  const [personality, setPersonality] = useState<ForgePersonalityId>(forgeViewModel.personalityThresholds[0].id);
  const { t } = useTranslation();
  const copy = (item: ForgeCopy) => t(item.key, item.fallback);

  return (
    <div className="h-full flex flex-col gap-6 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-accent-violet" />
            {copy(forgeViewModel.title)}
          </h2>
          <p className="text-sm text-text-secondary">{copy(forgeViewModel.subtitle)}</p>
        </div>
        <button
          type="button"
          className="px-6 py-2 bg-gradient-to-r from-accent-violet to-accent-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          <Zap className="w-4 h-4 fill-current" />
          {copy(forgeViewModel.incubateAction)}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0 overflow-y-auto pb-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-xl space-y-6">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <Cpu className="w-3 h-3" />
                {copy(forgeViewModel.modelSectionTitle)}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {forgeViewModel.modelOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setModel(option.id)}
                    className={cn(
                      'p-4 border rounded-xl cursor-pointer transition-all text-left',
                      model === option.id ? modelToneClasses[option.tone].selected : modelToneClasses[option.tone].unselected,
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm">{copy(option.name)}</span>
                      <span className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/50">
                        {copy(option.level)}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{copy(option.description)}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3" />
                {copy(forgeViewModel.personalitySectionTitle)}
              </h3>
              <div className="flex gap-4">
                {forgeViewModel.personalityThresholds.map((threshold) => {
                  const isActive = personality === threshold.id;
                  const isChaotic = threshold.id === 'chaotic';

                  return (
                    <button
                      key={threshold.id}
                      type="button"
                      onClick={() => setPersonality(threshold.id)}
                      className={cn(
                        'flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border',
                        isActive
                          ? isChaotic
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-black border-white'
                          : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10',
                      )}
                    >
                      {copy(threshold.label)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <Beaker className="w-3 h-3" />
                {copy(forgeViewModel.seedSectionTitle)}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {forgeViewModel.seedHeuristicSlots.map((slot) => {
                  if (slot.kind === 'action') {
                    return (
                      <div
                        key={slot.id}
                        className="border border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 h-32 hover:border-accent-blue/50 hover:bg-accent-blue/5 cursor-pointer transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-blue/20">
                          <span className="text-lg">+</span>
                        </div>
                        <span className="text-[10px] text-text-secondary uppercase">{copy(slot.label)}</span>
                      </div>
                    );
                  }

                  if (slot.kind === 'active') {
                    return (
                      <div
                        key={slot.id}
                        className="border border-white/10 bg-white/[0.02] rounded-xl p-4 flex flex-col items-center justify-center text-center h-32 relative"
                      >
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-sm font-bold mt-2">{copy(slot.label)}</span>
                        {slot.badge && (
                          <span className="text-[10px] font-mono text-text-secondary mt-1">{copy(slot.badge)}</span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={slot.id}
                      className="border border-dashed border-white/10 rounded-xl p-4 h-32 flex items-center justify-center bg-black/40"
                    >
                      <span className="text-[10px] text-white/20 uppercase tracking-widest">{copy(slot.label)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass rounded-xl border border-accent-violet/30 p-6 flex flex-col h-full bg-gradient-to-b from-accent-violet/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/20 blur-[50px]" />

            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-6 text-center">
              {copy(forgeViewModel.previewTitle)}
            </h3>

            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-32 rounded-2xl bg-black border border-white/10 shadow-2xl relative flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-50%] bg-[conic-gradient(var(--tw-gradient-stops))] from-accent-blue/40 via-accent-violet/40 to-accent-blue/40 blur-xl opacity-50"
                />
                <div className="w-[90%] h-[90%] bg-black rounded-xl absolute inset-[5%] z-10 flex items-center justify-center">
                  <Brain className={cn('w-12 h-12', personality === 'chaotic' ? 'text-orange-500' : 'text-white')} />
                </div>
              </div>

              <div className="text-center mt-4">
                <input
                  type="text"
                  defaultValue={copy(forgeViewModel.previewIdentity.name)}
                  className="bg-transparent border-b border-dashed border-white/30 text-center text-xl font-bold focus:outline-none focus:border-accent-blue pb-1 w-full"
                />
                <div className="flex gap-2 justify-center mt-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/10">
                    {copy(forgeViewModel.previewIdentity.classification)}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/10">
                    {copy(forgeViewModel.previewIdentity.generation)}
                  </span>
                </div>
              </div>

              <div className="w-full space-y-3 mt-6">
                {forgeViewModel.previewMetrics.map((metric) => {
                  const valuePercent = getMetricValue(metric, personality);

                  return (
                    <div key={metric.id}>
                      <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-1">
                        <span>{copy(metric.label)}</span>
                        <span>{valuePercent}/100</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        {metric.id === 'entropy-seeking' ? (
                          <motion.div
                            layout
                            className={cn('h-full', personality === 'chaotic' ? 'bg-orange-500' : 'bg-accent-emerald')}
                            style={{ width: `${valuePercent}%` }}
                          />
                        ) : (
                          <div className={cn('h-full', metricToneClasses[metric.tone])} style={{ width: `${valuePercent}%` }} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
