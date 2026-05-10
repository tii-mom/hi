import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Activity, Mic, MoveUp, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AgentAvatar from '../components/ui/AgentAvatar';
import { cn } from '@/lib/utils';
import { useTelegramShell } from '@/features/telegram';
import { createTelegramCompanionViewModel, selectTelegramCompanionResponse } from '@/app/services/telegram';
import { loadTelegramCompanionReadModel } from '@/app/services/readModels';
import { useReadModelResource } from '@/app/services/useReadModelResource';
import { ResourceStatus } from '@/components/ui/surfaces/ResourceStatus';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  type?: 'text' | 'widget';
  timestamp: string;
  agentRole?: string;
  widgetData?: {
    values: {
      btc: string;
      eth: string;
      risk: string;
    };
  };
}

export default function NeuralLinkInterface() {
  const { t, i18n } = useTranslation();
  const telegram = useTelegramShell();
  const fallback = createTelegramCompanionViewModel(t);
  const load = useCallback((context: Parameters<typeof loadTelegramCompanionReadModel>[1]['context']) => loadTelegramCompanionReadModel(t, { context }), [t]);
  const { data: telegramCompanionViewModel, resource } = useReadModelResource({
    fallback,
    load,
    dependencyKey: i18n.language,
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: telegramCompanionViewModel.welcome.text,
      timestamp: '09:41',
      agentRole: telegramCompanionViewModel.welcome.role,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const shellStyle = telegram.isTelegram && telegram.stableViewportHeight
    ? {
        minHeight: `${telegram.stableViewportHeight}px`,
        paddingBottom: telegram.safeAreaInsetBottom > 0 ? `${telegram.safeAreaInsetBottom}px` : 'env(safe-area-inset-bottom, 0px)',
      }
    : undefined;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) {
      return;
    }

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    window.setTimeout(() => {
      setIsTyping(false);
      const response = selectTelegramCompanionResponse(t, newMsg.text);
      const reply: Message = {
        id: Date.now().toString(),
        sender: 'agent',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentRole: response.role,
        ...(response.widgetData
          ? {
              type: 'widget',
              widgetData: {
                values: {
                  btc: `${response.widgetData.btcChangePercent > 0 ? '+' : ''}${response.widgetData.btcChangePercent.toFixed(1)}%`,
                  eth: `${response.widgetData.ethChangePercent > 0 ? '+' : ''}${response.widgetData.ethChangePercent.toFixed(1)}%`,
                  risk: response.widgetData.risk,
                },
              },
            }
          : {}),
      };

      setMessages((prev) => [...prev, reply]);
    }, 1800);
  };

  return (
    <div
      className="h-full min-h-0 flex items-stretch justify-center p-0 md:p-6 bg-transparent overflow-hidden"
      style={shellStyle}
    >
      <div className="w-full h-full min-h-0 md:max-w-3xl md:max-h-[85vh] bg-black/40 backdrop-blur-3xl md:rounded-3xl md:border border-white/10 overflow-hidden flex flex-col relative shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-accent-blue/10 blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-500/10 blur-[100px] pointer-events-none mix-blend-screen" />
        <ResourceStatus resource={resource} label="Telegram companion" className="m-3 relative z-10" />

        <div className="pt-6 md:pt-8 pb-4 md:pb-6 px-4 md:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 relative z-10">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] relative shrink-0">
              <div className="absolute inset-0 rounded-full animate-pulse-ring-blue opacity-50" />
              <Activity className="w-5 h-5 text-accent-blue" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-light text-white tracking-wide truncate">{telegramCompanionViewModel.header.title}</h2>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                {telegramCompanionViewModel.header.status}
              </p>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 md:gap-8 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const roleLabel = msg.agentRole ?? 'Agent';
              const messageText = msg.text;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                  className={cn('flex flex-col max-w-[85%] min-w-0', msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start')}
                >
                  {msg.sender === 'agent' && (
                    <div className="flex items-center gap-2 mb-2">
                      <AgentAvatar seed={roleLabel} size={20} className="rounded-full blur-[0.5px]" />
                      <span className="text-[10px] text-text-secondary font-mono tracking-widest uppercase">{roleLabel}</span>
                    </div>
                  )}

                  <div className={cn('relative', msg.sender === 'user' ? 'text-right' : 'text-left')}>
                    <p
                      className={cn(
                        'text-base md:text-xl font-light leading-relaxed tracking-wide break-words',
                        msg.sender === 'user' ? 'text-white' : 'text-white/80',
                      )}
                    >
                      {messageText}
                    </p>

                    {msg.type === 'widget' && msg.widgetData && (
                        <div className="mt-6 p-4 md:p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-full min-w-0 space-y-4">
                          <div className="flex justify-between items-center gap-4 text-sm font-mono tracking-wide">
                          <span className="text-text-secondary">{telegramCompanionViewModel.widgetLabels.btcAlignment}</span>
                          <span className="text-accent-emerald">{msg.widgetData.values.btc}</span>
                        </div>
                        <div className="flex justify-between items-center gap-4 text-sm font-mono tracking-wide">
                          <span className="text-text-secondary">{telegramCompanionViewModel.widgetLabels.ethAlignment}</span>
                          <span className="text-red-400">{msg.widgetData.values.eth}</span>
                        </div>
                        <div className="pt-3 border-t border-white/5 flex justify-between items-center gap-4 text-sm font-mono tracking-wide">
                          <span className="text-text-secondary">{telegramCompanionViewModel.widgetLabels.entropyRisk}</span>
                          <span className="text-orange-400 font-bold">{msg.widgetData.values.risk}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

            {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start">
              <div className="flex gap-2 items-center text-white/40 mb-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-mono">{telegramCompanionViewModel.typingIndicator}</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="px-4 md:px-6 pb-4 md:pb-6 relative z-10 w-full max-w-2xl mx-auto min-w-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-accent-blue/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/60 border border-white/10 rounded-3xl flex items-end p-2 pl-4 md:pl-6 shadow-2xl backdrop-blur-xl gap-2 min-w-0">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={telegramCompanionViewModel.input.placeholder}
                className="bg-transparent flex-1 min-w-0 outline-none text-base text-white placeholder-text-secondary w-full resize-none py-3 font-light"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="flex items-center gap-1 md:gap-2 mb-1 ml-1 md:ml-2 shrink-0">
                <button
                  type="button"
                  aria-label={telegramCompanionViewModel.input.micLabel}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-white shrink-0 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button
                  type="button"
                  aria-label={telegramCompanionViewModel.input.sendLabel}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-black shrink-0 transition-all',
                    inputValue.trim() ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-100' : 'bg-white/10 text-white/30 scale-95',
                  )}
                >
                  <MoveUp className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-[10px] text-text-secondary font-mono tracking-widest uppercase break-words">{telegramCompanionViewModel.footerContext}</div>
        </div>
      </div>
    </div>
  );
}
