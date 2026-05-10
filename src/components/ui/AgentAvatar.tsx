import { cn } from '@/lib/utils';
import { useMemo, type ReactNode } from 'react';

export type AgentAvatarStyle = 'cosmic-explorer' | 'cyberpunk-chrome' | 'minimalist-ai';

interface AgentAvatarProps {
  seed: string;
  className?: string;
  size?: number;
  styleType?: AgentAvatarStyle;
}

const fruits = ['🍏', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🥑', '🍋'];
const snacks = ['🍔', '🍕', '🍩', '🍪', '🍫', '🍿', '🍟', '🌭', '🍬', '🍭'];
const zenItems = ['🥤', '☕', '🍵', '🧉', '🧃', '🧊', '🥛', '🍄', '🌿', '🪴'];

function getStringHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function AgentAvatar({ seed, className, size = 40, styleType = 'cyberpunk-chrome' }: AgentAvatarProps) {
  const hash = useMemo(() => getStringHash(seed), [seed]);

  let emoji: string;
  let containerClasses: string;
  let imgClasses: string;
  let glowElement: ReactNode;

  if (styleType === 'cosmic-explorer') {
    emoji = fruits[hash % fruits.length];
    containerClasses = 'bg-gradient-to-tr from-[#020024] via-[#090979] to-[#8a2be2] shadow-[0_0_20px_rgba(138,43,226,0.3)] border-purple-500/30';
    imgClasses = 'drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] scale-110';
    glowElement = (
      <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
         <div className="absolute -top-4 -right-4 w-1/2 h-1/2 bg-pink-500/40 blur-[15px] rounded-full" />
         <div className="absolute -bottom-4 -left-4 w-1/2 h-1/2 bg-purple-500/40 blur-[15px] rounded-full" />
      </div>
    );
  } else if (styleType === 'minimalist-ai') {
    emoji = zenItems[hash % zenItems.length];
    containerClasses = 'bg-gradient-to-b from-[#e2e8f0] to-[#f8fafc] border-slate-200 shadow-sm';
    imgClasses = 'opacity-90 scale-95';
    glowElement = null;
  } else {
    // cyberpunk-chrome (Snacks)
    emoji = snacks[hash % snacks.length];
    containerClasses = 'bg-gradient-to-br from-[#0f172a] to-[#000000] border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]';
    imgClasses = 'drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] saturate-150 scale-105';
    glowElement = (
      <div className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-cyan-500/20 blur-[10px]" />
      </div>
    );
  }

  // Calculate emoji font size proportional to container size
  const fontSize = size * 0.55;

  return (
    <div 
      className={cn("rounded-xl overflow-hidden relative border flex items-center justify-center", containerClasses, className)}
      style={{ width: size, height: size }}
    >
      {glowElement}
      <span 
        className={cn("relative z-10 select-none block leading-none", imgClasses)}
        style={{ fontSize: `${fontSize}px` }}
      >
        {emoji}
      </span>
    </div>
  );
}
