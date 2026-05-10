import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mic, MoveUp, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import AgentAvatar from '../components/ui/AgentAvatar';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  type?: 'text' | 'widget';
  timestamp: string;
  agentRole?: string;
  widgetData?: any;
}

export default function NeuralLinkInterface() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: t('agents.companion.welcome', 'Neural Link established. I am currently resonating with your portfolio and interpreting global market entropy. What would you like to intuit?'),
      timestamp: '09:41',
      agentRole: 'Tacit OS',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      let reply: Message;
      
      const lowerInput = newMsg.text.toLowerCase();
      if (lowerInput.includes('report') || lowerInput.includes('status')) {
        reply = {
          id: Date.now().toString(),
          sender: 'agent',
          text: t('agents.companion.report', 'Synthesizing global resonance...'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentRole: 'System Orchestrator',
          type: 'widget',
          widgetData: { type: 'report', btc: '+1.2%', eth: '-0.4%', risk: 'Medium' }
        };
      } else if (lowerInput.includes('sell') || lowerInput.includes('buy')) {
        reply = {
          id: Date.now().toString(),
          sender: 'agent',
          text: t('agents.companion.trade', 'Trade intent detected. I am cross-referencing with Friction Sentinel. My tacit heuristics suggest high implicit friction right now—please verify via the Resonance Chamber.'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentRole: 'RiskGuard',
        };
      } else {
        reply = {
          id: Date.now().toString(),
          sender: 'agent',
          text: t('agents.companion.default', 'I have intuitively assimilated this context into my experiential matrix. Modulating my tacit response variables accordingly.'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentRole: 'Tacit Core',
        };
      }
      setMessages(prev => [...prev, reply]);
    }, 1800);
  };

  return (
    <div className="h-full flex items-center justify-center p-0 md:p-6 bg-transparent overflow-hidden">
      
      {/* Container - Centered, Luxurious */}
      <div className="w-full h-full md:max-w-3xl md:max-h-[85vh] bg-black/40 backdrop-blur-3xl md:rounded-3xl md:border border-white/10 overflow-hidden flex flex-col relative shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-accent-blue/10 blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-500/10 blur-[100px] pointer-events-none mix-blend-screen" />

        {/* Header */}
        <div className="pt-8 pb-6 px-8 flex items-center justify-between border-b border-white/5 relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] relative">
               <div className="absolute inset-0 rounded-full animate-pulse-ring-blue opacity-50" />
               <Activity className="w-5 h-5 text-accent-blue" />
             </div>
             <div>
               <h2 className="text-lg font-light text-white tracking-wide">Neural Link</h2>
               <p className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">Tacit Synchronization Active</p>
             </div>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.sender === 'user' ? "self-end items-end" : "self-start items-start"
                )}
              >
                {msg.sender === 'agent' && (
                  <div className="flex items-center gap-2 mb-2">
                    <AgentAvatar seed={msg.agentRole || "Agent"} size={20} className="rounded-full blur-[0.5px]" />
                    <span className="text-[10px] text-text-secondary font-mono tracking-widest uppercase">
                      {msg.agentRole}
                    </span>
                  </div>
                )}
                
                <div 
                  className={cn(
                    "relative",
                    msg.sender === 'user' 
                      ? "text-right" 
                      : "text-left"
                  )}
                >
                  <p className={cn(
                    "text-lg md:text-xl font-light leading-relaxed tracking-wide",
                    msg.sender === 'user' ? "text-white" : "text-white/80"
                  )}>
                    {msg.text}
                  </p>
                  
                  {/* Widget Expansion */}
                  {msg.type === 'widget' && msg.widgetData && (
                    <div className="mt-6 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-full min-w-[280px] space-y-4">
                       <div className="flex justify-between items-center text-sm font-mono tracking-wide">
                          <span className="text-text-secondary">BTC Alignment</span>
                          <span className="text-accent-emerald">{msg.widgetData.btc}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm font-mono tracking-wide">
                          <span className="text-text-secondary">ETH Alignment</span>
                          <span className="text-red-400">{msg.widgetData.eth}</span>
                       </div>
                       <div className="pt-3 border-t border-white/5 flex justify-between items-center text-sm font-mono tracking-wide">
                          <span className="text-text-secondary">Entropy / Risk</span>
                          <span className="text-orange-400 font-bold">{msg.widgetData.risk}</span>
                       </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start">
               <div className="flex gap-2 items-center text-white/40 mb-2">
                 <Sparkles className="w-4 h-4 animate-pulse" />
                 <span className="text-[10px] uppercase tracking-widest font-mono">Synthesizing...</span>
               </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-6 pb-6 relative z-10 w-full max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-accent-blue/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/60 border border-white/10 rounded-3xl flex items-end p-2 pl-6 shadow-2xl backdrop-blur-xl">
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Share your constraints, ask for resonance..."
                className="bg-transparent flex-1 outline-none text-base text-white placeholder-text-secondary w-full resize-none py-3 font-light"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="flex items-center gap-2 mb-1 ml-2">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-white shrink-0 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-black shrink-0 transition-all",
                    inputValue.trim() ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-100" : "bg-white/10 text-white/30 scale-95"
                  )}
                >
                  <MoveUp className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-[10px] text-text-secondary font-mono tracking-widest uppercase">
            Tacit OS Context: Active Portfolio / Base Mainnet / Neutral Volatility
          </div>
        </div>
      </div>
    </div>
  );
}

