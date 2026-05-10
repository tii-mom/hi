import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Zap, Shield, Search, TrendingDown, Layers, SearchCode, Sparkles, X, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { createPortal } from 'react-dom';

type Skill = { id: string; name: string; rarity: string; power: number; users: string; icon: any; bg: string; color: string; border: string };

const initialSkills: Skill[] = [
  { id: '1', name: 'Meme Resonance Radar', rarity: 'Legendary', power: 94, users: '1.2k', icon: Zap, bg: 'bg-orange-500/10', color: 'text-orange-500', border: 'border-orange-500/30' },
  { id: '2', name: 'Smart Money Intuition', rarity: 'Epic', power: 88, users: '3.4k', icon: SearchCode, bg: 'bg-purple-500/10', color: 'text-purple-500', border: 'border-purple-500/30' },
  { id: '3', name: 'Black Swan Premonition', rarity: 'Legendary', power: 99, users: '800', icon: Shield, bg: 'bg-rose-500/10', color: 'text-rose-500', border: 'border-rose-500/30' },
  { id: '4', name: 'Volatility Whisperer', rarity: 'Rare', power: 76, users: '8.9k', icon: Target, bg: 'bg-blue-500/10', color: 'text-blue-500', border: 'border-blue-500/30' },
  { id: '5', name: 'Friction Shield', rarity: 'Common', power: 45, users: '12.4k', icon: Shield, bg: 'bg-slate-500/10', color: 'text-slate-400', border: 'border-slate-500/30' },
  { id: '6', name: 'Capitulation Sniper', rarity: 'Epic', power: 82, users: '2.1k', icon: TrendingDown, bg: 'bg-emerald-500/10', color: 'text-emerald-500', border: 'border-emerald-500/30' },
];

const rarityColors: Record<string, string> = {
  Mythic: 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]',
  Legendary: 'text-orange-500 border-orange-500/20 bg-orange-500/10',
  Epic: 'text-purple-500 border-purple-500/20 bg-purple-500/10',
  Rare: 'text-blue-500 border-blue-500/20 bg-blue-500/10',
  Common: 'text-slate-400 border-slate-500/20 bg-slate-500/10',
};

const generatedNames = ['Oracle Heuristic', 'Quantum Intuition', 'Tacit Node', 'Singularity Resonance', 'Omni-Synthesis'];

export default function SkillMarketplace() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isFusibleMode, setIsFusibleMode] = useState(false);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [isFusing, setIsFusing] = useState(false);
  const [fusedSkill, setFusedSkill] = useState<Skill | null>(null);

  const toggleFusibleMode = () => {
    setIsFusibleMode(!isFusibleMode);
    setSelectedSkillIds([]);
    setFusedSkill(null);
  };

  const handleSelectSkill = (id: string) => {
    if (!isFusibleMode) return;
    if (selectedSkillIds.includes(id)) {
      setSelectedSkillIds(prev => prev.filter(sId => sId !== id));
    } else if (selectedSkillIds.length < 3) {
      setSelectedSkillIds(prev => [...prev, id]);
    }
  };

  const initiateFusion = () => {
    if (selectedSkillIds.length < 2) return;
    setIsFusing(true);
    
    setTimeout(() => {
      // Create new skill
      const powerBase = selectedSkillIds.reduce((acc, id) => acc + (skills.find(s => s.id === id)?.power || 0), 0);
      const newPower = Math.min(120, Math.floor((powerBase / selectedSkillIds.length) * 1.3)); // Boost stats
      const rarityLevels = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
      
      const highestRarityIndex = Math.max(...selectedSkillIds.map(id => {
        const r = skills.find(s => s.id === id)?.rarity || 'Common';
        return rarityLevels.indexOf(r);
      }));
      
      const newRarity = rarityLevels[Math.min(rarityLevels.length - 1, highestRarityIndex + 1)];
      const randomName = generatedNames[Math.floor(Math.random() * generatedNames.length)];
      
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: randomName,
        rarity: newRarity,
        power: newPower,
        users: '0',
        icon: Sparkles,
        bg: 'bg-yellow-400/10',
        color: 'text-yellow-400',
        border: 'border-yellow-400/30'
      };

      setSkills(prev => [...prev.filter(s => !selectedSkillIds.includes(s.id)), newSkill]);
      setFusedSkill(newSkill);
      setIsFusing(false);
      setSelectedSkillIds([]);
    }, 2000); // 2 second fake processing time
  };

  return (
    <div className="h-full flex flex-col gap-6 relative">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1">Heuristics Marketplace</h2>
          <p className="text-sm text-text-secondary">Trade and synthesize evolved tacit capabilities forged from experiential market history</p>
        </div>
        <div className="flex items-center gap-3">
          {isFusibleMode && selectedSkillIds.length > 0 && (
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={initiateFusion}
              disabled={selectedSkillIds.length < 2}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-sm flex items-center gap-2 hover:from-purple-500 hover:to-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              <Sparkles className="w-4 h-4" />
              Synthesize Selected ({selectedSkillIds.length}/3)
            </motion.button>
          )}
          <button 
            onClick={toggleFusibleMode}
            className={cn(
              "px-4 py-2 font-semibold rounded-lg text-sm flex items-center gap-2 transition-colors",
              isFusibleMode ? "bg-white/10 text-white border border-white/20" : "bg-white text-black hover:bg-gray-200"
            )}
          >
            {isFusibleMode ? <X className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            {isFusibleMode ? "Cancel Synthesis" : "Synthesize Heuristics"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {skills.map((skill, i) => {
              const isSelected = selectedSkillIds.includes(skill.id);
              return (
                <motion.div 
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: isSelected ? 0.95 : 1 }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleSelectSkill(skill.id)}
                  className={cn(
                    "glass rounded-xl p-6 border group relative overflow-hidden transition-all duration-300",
                    isFusibleMode ? "cursor-pointer hover:border-white/40" : "",
                    isSelected ? "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]" : "border-border"
                  )}
                >
                  {isFusibleMode && (
                    <div className={cn("absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-20", isSelected ? "bg-purple-500 border-purple-500" : "border-white/20")}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  )}

                  <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity", skill.bg)} />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border", skill.bg, skill.border)}>
                      <skill.icon className={cn("w-7 h-7", skill.color)} />
                    </div>
                    <div className={cn("px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border", rarityColors[skill.rarity])}>
                      {skill.rarity}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors">{skill.name}</h3>
                  
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-[10px] text-text-secondary mb-1">TACIT WEIGHT</div>
                      <div className="text-lg font-mono text-white">{skill.power} <span className="text-[10px] text-text-secondary">EPOCHS</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] text-text-secondary mb-1">ACTIVE BONDS</div>
                      <div className="text-lg font-mono text-white">{skill.users}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Fusion Modal Component */}
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
                className="relative bg-[#0f172a] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center overflow-hidden shadow-2xl"
              >
                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10" />

                {isFusing ? (
                  <div className="py-10 relative z-10 flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-6">
                       <motion.div 
                         animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500 opacity-80" 
                        />
                       <motion.div 
                         animate={{ rotate: -360, scale: [1, 0.8, 1] }} 
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-4 rounded-full border-b-2 border-l-2 border-blue-500 opacity-80" 
                        />
                       <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Synthesizing Intuition...</h3>
                    <p className="text-sm text-text-secondary">Forging non-verbal neural associations</p>
                  </div>
                ) : fusedSkill && (
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                      className={cn("w-20 h-20 rounded-2xl flex items-center justify-center border mx-auto mb-6 relative", fusedSkill.bg, fusedSkill.border)}
                    >
                      <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full" />
                      <fusedSkill.icon className={cn("w-10 h-10 relative z-10", fusedSkill.color)} />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className={cn("inline-block px-3 py-1 rounded text-xs font-mono uppercase tracking-widest border mb-4", rarityColors[fusedSkill.rarity])}>
                        {fusedSkill.rarity}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{fusedSkill.name}</h3>
                      <p className="text-sm text-text-secondary mb-6 text-balance">
                        Synthesis successful! A deeper, unquantifiable experiential capability has emerged.
                      </p>
                      
                      <div className="bg-black/30 rounded-lg p-4 mb-6 flex justify-around">
                        <div>
                          <div className="text-[10px] text-text-secondary mb-1">TACIT WEIGHT</div>
                          <div className="text-lg font-mono text-white">{fusedSkill.power} <span className="text-[10px]">EPOCHS</span></div>
                        </div>
                      </div>

                      <button 
                        onClick={() => { setFusedSkill(null); setIsFusibleMode(false); }}
                        className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Internalize Heuristic
                      </button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

