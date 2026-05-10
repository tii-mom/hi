import { useState } from 'react';
import { Hammer, Cpu, Zap, Beaker, Save, SlidersHorizontal, Brain } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function ForgeStudio() {
  const [model, setModel] = useState('gpt-4');
  const [personality, setPersonality] = useState('aggressive');

  return (
    <div className="h-full flex flex-col gap-6 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-accent-violet" />
            Intuition Forge
          </h2>
          <p className="text-sm text-text-secondary">Synthesize base intelligence, tacit thresholds, and experiential heuristics to forge a new autonomous entity.</p>
        </div>
        <button className="px-6 py-2 bg-gradient-to-r from-accent-violet to-accent-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm uppercase tracking-wider">
          <Zap className="w-4 h-4 fill-current" />
          Incubate Agent (0.5 ETH)
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0 overflow-y-auto pb-6">
        
        {/* Left Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-xl space-y-6">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <Cpu className="w-3 h-3" />
                1. Explicit Intelligence Base
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setModel('gpt-4')}
                  className={cn(
                    "p-4 border rounded-xl cursor-pointer transition-all",
                    model === 'gpt-4' ? "border-accent-blue bg-accent-blue/5" : "border-white/10 hover:border-white/30 bg-white/[0.02]"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">GPT-4 Omni</span>
                    <span className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/50">Lvl 1</span>
                  </div>
                  <p className="text-xs text-text-secondary">High reasoning, balanced analytical capabilities. Best for macro trading.</p>
                </div>
                <div 
                  onClick={() => setModel('claude-3')}
                  className={cn(
                    "p-4 border rounded-xl cursor-pointer transition-all",
                    model === 'claude-3' ? "border-accent-emerald bg-accent-emerald/5" : "border-white/10 hover:border-white/30 bg-white/[0.02]"
                  )}
                >
                   <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">Claude 3.5 Sonnet</span>
                    <span className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/50">Lvl 1</span>
                  </div>
                  <p className="text-xs text-text-secondary">Fast execution, code-native. Best for high-frequency or arbitrage strategies.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3" />
                2. Tacit Friction Thresholds
              </h3>
              <div className="flex gap-4">
                {['Stiff', 'Fluid', 'Reactive', 'Chaotic'].map((p) => {
                  const pKey = p.toLowerCase();
                  return (
                    <button
                      key={p}
                      onClick={() => setPersonality(pKey)}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border",
                        personality === pKey 
                          ? pKey === 'chaotic' ? "bg-orange-500 text-white border-orange-500" : "bg-white text-black border-white"
                          : "bg-white/5 border-white/10 text-text-secondary hover:bg-white/10"
                      )}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <Beaker className="w-3 h-3" />
                3. Seed Heuristics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 h-32 hover:border-accent-blue/50 hover:bg-accent-blue/5 cursor-pointer transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-blue/20">
                    <span className="text-lg">+</span>
                  </div>
                  <span className="text-[10px] text-text-secondary uppercase">Ingest Trait</span>
                </div>
                <div className="border border-white/10 bg-white/[0.02] rounded-xl p-4 flex flex-col items-center justify-center text-center h-32 relative">
                   <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                   <span className="text-sm font-bold mt-2">Emergent Pattern Scan</span>
                   <span className="text-[10px] font-mono text-text-secondary mt-1">Lvl 1</span>
                </div>
                 <div className="border border-dashed border-white/10 rounded-xl p-4 h-32 flex items-center justify-center bg-black/40">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">Locked Matrix</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl border border-accent-violet/30 p-6 flex flex-col h-full bg-gradient-to-b from-accent-violet/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/20 blur-[50px]" />
            
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-6 text-center">Entity Preview</h3>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-32 rounded-2xl bg-black border border-white/10 shadow-2xl relative flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-50%] bg-[conic-gradient(var(--tw-gradient-stops))] from-accent-blue/40 via-accent-violet/40 to-accent-blue/40 blur-xl opacity-50"
                />
                <div className="w-[90%] h-[90%] bg-black rounded-xl absolute inset-[5%] z-10 flex items-center justify-center">
                  <Brain className={cn("w-12 h-12", personality === 'chaotic' ? 'text-orange-500' : 'text-white')} />
                </div>
              </div>
              
              <div className="text-center mt-4">
                <input 
                  type="text" 
                  defaultValue="Unnamed_Entity_01"
                  className="bg-transparent border-b border-dashed border-white/30 text-center text-xl font-bold focus:outline-none focus:border-accent-blue pb-1 w-full"
                />
                <div className="flex gap-2 justify-center mt-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/10">CLASS: HYBRID</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/10">GEN: 2</span>
                </div>
              </div>

              <div className="w-full space-y-3 mt-6">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-1">
                    <span>EXPLICIT REASONING</span>
                    <span>85/100</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-accent-blue w-[85%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-1">
                    <span>TACIT INDEX</span>
                    <span>92/100</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[92%]" /></div>
                </div>
                 <div>
                  <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-1">
                    <span>ENTROPY SEEKING</span>
                    <span>{personality === 'chaotic' ? '100' : personality === 'reactive' ? '75' : '40'}/100</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      layout
                      className={cn("h-full", personality === 'chaotic' ? 'bg-orange-500' : 'bg-accent-emerald')} 
                      style={{ width: personality === 'chaotic' ? '100%' : personality === 'reactive' ? '75%' : '40%' }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
