import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Layers, Sparkles, X, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  generatedSkillNames,
  initialSkillCatalog,
  rarityClassNames,
  rarityLevels,
  skillMarketplaceCopy,
  type FeatureCopy,
  type SkillMarketplaceCard,
} from '@/features/skills';
import { cn } from '@/lib/utils';

export default function SkillMarketplace() {
  const [skills, setSkills] = useState<SkillMarketplaceCard[]>(initialSkillCatalog);
  const [isFusibleMode, setIsFusibleMode] = useState(false);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [isFusing, setIsFusing] = useState(false);
  const [fusedSkill, setFusedSkill] = useState<SkillMarketplaceCard | null>(null);
  const { t } = useTranslation();

  const copy = (item: FeatureCopy) => t(item.key, item.fallback);
  const copyWithValues = (item: FeatureCopy, values?: Record<string, number | string>) =>
    t(item.key, { defaultValue: item.fallback, ...values });

  const toggleFusibleMode = () => {
    setIsFusibleMode(!isFusibleMode);
    setSelectedSkillIds([]);
    setFusedSkill(null);
  };

  const handleSelectSkill = (id: string) => {
    if (!isFusibleMode) {
      return;
    }

    if (selectedSkillIds.includes(id)) {
      setSelectedSkillIds((prev) => prev.filter((skillId) => skillId !== id));
    } else if (selectedSkillIds.length < 3) {
      setSelectedSkillIds((prev) => [...prev, id]);
    }
  };

  const initiateFusion = () => {
    if (selectedSkillIds.length < 2) {
      return;
    }

    setIsFusing(true);

    window.setTimeout(() => {
      const powerBase = selectedSkillIds.reduce(
        (acc, id) => acc + (skills.find((skill) => skill.id === id)?.power ?? 0),
        0,
      );
      const newPower = Math.min(120, Math.floor((powerBase / selectedSkillIds.length) * 1.3));
      const highestRarityIndex = Math.max(
        ...selectedSkillIds.map((id) => {
          const rarity = skills.find((skill) => skill.id === id)?.rarity ?? 'Common';
          return rarityLevels.indexOf(rarity);
        }),
      );
      const newRarity = rarityLevels[Math.min(rarityLevels.length - 1, highestRarityIndex + 1)];
      const randomName =
        generatedSkillNames[Math.floor(Math.random() * generatedSkillNames.length)] ?? generatedSkillNames[0]!;

      const newSkill: SkillMarketplaceCard = {
        id: Date.now().toString(),
        name: randomName,
        rarity: newRarity,
        power: newPower,
        users: '0',
        icon: Sparkles,
        bgClass: 'bg-yellow-400/10',
        colorClass: 'text-yellow-400',
        borderClass: 'border-yellow-400/30',
      };

      setSkills((prev) => [...prev.filter((skill) => !selectedSkillIds.includes(skill.id)), newSkill]);
      setFusedSkill(newSkill);
      setIsFusing(false);
      setSelectedSkillIds([]);
    }, 2000);
  };

  return (
    <div className="h-full min-h-0 flex flex-col gap-4 md:gap-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-semibold uppercase tracking-wider mb-1 break-words">
            {copy(skillMarketplaceCopy.header.title)}
          </h2>
          <p className="text-sm text-text-secondary">{copy(skillMarketplaceCopy.header.subtitle)}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap sm:justify-end">
          {isFusibleMode && selectedSkillIds.length > 0 && (
            <motion.button
              type="button"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={initiateFusion}
              disabled={selectedSkillIds.length < 2}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-sm flex items-center gap-2 hover:from-purple-500 hover:to-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(147,51,234,0.3)] whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              {copyWithValues(skillMarketplaceCopy.actions.synthesizeSelected, {
                selected: selectedSkillIds.length,
                limit: 3,
              })}
            </motion.button>
          )}
          <button
            type="button"
            onClick={toggleFusibleMode}
            className={cn(
              'px-4 py-2 font-semibold rounded-lg text-sm flex items-center gap-2 transition-colors whitespace-nowrap',
              isFusibleMode ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-black hover:bg-gray-200',
            )}
          >
            {isFusibleMode ? <X className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            {copy(isFusibleMode ? skillMarketplaceCopy.actions.cancel : skillMarketplaceCopy.actions.synthesize)}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence>
            {skills.map((skill) => {
              const isSelected = selectedSkillIds.includes(skill.id);
              const skillName = copy(skill.name);
              const SkillIcon = skill.icon;

              return (
                <motion.button
                  key={skill.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: isSelected ? 0.95 : 1 }}
                  exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleSelectSkill(skill.id)}
                  aria-label={skillName}
                  aria-pressed={isSelected}
                  aria-disabled={!isFusibleMode}
                  className={cn(
                    'glass rounded-xl p-4 md:p-6 border group relative overflow-hidden transition-all duration-300 text-left min-w-0',
                    isFusibleMode ? 'cursor-pointer hover:border-white/40' : '',
                    isSelected ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'border-border',
                  )}
                >
                  {isFusibleMode && (
                    <div
                      className={cn(
                        'absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-20',
                        isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/20',
                      )}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  )}

                  <div
                    className={cn(
                      'absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity',
                      skill.bgClass,
                    )}
                  />

                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center border',
                        skill.bgClass,
                        skill.borderClass,
                      )}
                    >
                      <SkillIcon className={cn('w-7 h-7', skill.colorClass)} />
                    </div>
                    <div
                      className={cn(
                        'px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border',
                        rarityClassNames[skill.rarity],
                      )}
                    >
                      {copy(skillMarketplaceCopy.rarities[skill.rarity])}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-medium mb-2 group-hover:text-white transition-colors break-words">{skillName}</h3>

                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5 min-w-0">
                    <div>
                      <div className="text-[10px] text-text-secondary mb-1">
                        {copy(skillMarketplaceCopy.metrics.tacitWeight)}
                      </div>
                      <div className="text-lg font-mono text-white">
                        {skill.power}{' '}
                        <span className="text-[10px] text-text-secondary">
                          {copy(skillMarketplaceCopy.metrics.epochs)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-text-secondary mb-1">
                        {copy(skillMarketplaceCopy.metrics.activeBonds)}
                      </div>
                      <div className="text-lg font-mono text-white">{skill.users}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {(isFusing || fusedSkill) && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-[#0f172a] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10" />

                {isFusing ? (
                  <div className="py-10 relative z-10 flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-6">
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500 opacity-80"
                      />
                      <motion.div
                        animate={{ rotate: -360, scale: [1, 0.8, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-4 rounded-full border-b-2 border-l-2 border-blue-500 opacity-80"
                      />
                      <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{copy(skillMarketplaceCopy.modal.loadingTitle)}</h3>
                    <p className="text-sm text-text-secondary">{copy(skillMarketplaceCopy.modal.loadingSubtitle)}</p>
                  </div>
                ) : (
                  fusedSkill && (
                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className={cn(
                          'w-20 h-20 rounded-2xl flex items-center justify-center border mx-auto mb-6 relative',
                          fusedSkill.bgClass,
                          fusedSkill.borderClass,
                        )}
                      >
                        <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full" />
                        <fusedSkill.icon className={cn('w-10 h-10 relative z-10', fusedSkill.colorClass)} />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div
                          className={cn(
                            'inline-block px-3 py-1 rounded text-xs font-mono uppercase tracking-widest border mb-4',
                            rarityClassNames[fusedSkill.rarity],
                          )}
                        >
                          {copy(skillMarketplaceCopy.rarities[fusedSkill.rarity])}
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-accent-emerald mb-2">
                          {copy(skillMarketplaceCopy.modal.successTitle)}
                        </p>
                        <h3 className="text-2xl font-bold mb-2">{copy(fusedSkill.name)}</h3>
                        <p className="text-sm text-text-secondary mb-6 text-balance">
                          {copy(skillMarketplaceCopy.modal.successBody)}
                        </p>

                        <div className="bg-black/30 rounded-lg p-4 mb-6 flex justify-around">
                          <div>
                            <div className="text-[10px] text-text-secondary mb-1">
                              {copy(skillMarketplaceCopy.metrics.tacitWeight)}
                            </div>
                            <div className="text-lg font-mono text-white">
                              {fusedSkill.power}{' '}
                              <span className="text-[10px]">{copy(skillMarketplaceCopy.metrics.epochs)}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setFusedSkill(null);
                            setIsFusibleMode(false);
                          }}
                          className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {copy(skillMarketplaceCopy.modal.successAction)}
                        </button>
                      </motion.div>
                    </div>
                  )
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
