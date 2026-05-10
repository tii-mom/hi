import { motion } from 'motion/react';
import { Radio, Cpu, ShieldAlert, Zap, Layers, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TerminalPanel } from '@/components/ui/surfaces/TerminalPanel';
import { StatusBadge } from '@/components/ui/surfaces/StatusBadge';
import { terminalTimelineEvents } from '../data';
import type { TerminalTimelineIcon } from '../types';

const iconMap = {
  activity: Activity,
  shield: ShieldAlert,
  zap: Zap,
  layers: Layers,
  cpu: Cpu,
} satisfies Record<TerminalTimelineIcon, typeof Activity>;

export default function AITimelineFeed() {
  const { t } = useTranslation();

  return (
    <TerminalPanel
      className="h-full min-h-0 bg-black/40 backdrop-blur-md"
      title={t('terminal.timeline.title')}
      actions={
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-accent-violet" />
          <StatusBadge tone="violet" variant="ghost">
            {t('terminal.timeline.liveFeed')}
          </StatusBadge>
        </div>
      }
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent h-12 w-full animate-scanline pointer-events-none" />
      <div className="flex-1 overflow-y-auto p-4 font-mono relative">
        <div className="absolute left-6 top-4 bottom-4 w-px bg-white/5" />

        <div className="space-y-4">
          {terminalTimelineEvents.map((event, index) => {
            const EventIcon = iconMap[event.icon];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative flex gap-4 group"
              >
                <div className="flex flex-col items-center mt-1 z-10 shrink-0">
                  <div className="w-5 h-5 rounded-full bg-black border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors shadow-lg">
                    <EventIcon className={`w-2.5 h-2.5 ${event.colorClass}`} />
                  </div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${event.colorClass}`}>
                      {t(`terminal.timeline.events.${event.id}.agent`, event.agent)}
                    </span>
                    <span className="text-[9px] text-text-secondary">{event.time}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/70 leading-relaxed">
                    {t(`terminal.timeline.events.${event.id}.text`, event.text)}
                  </p>
                  {event.badge && (
                    <StatusBadge tone="violet" className="mt-2 inline-flex py-1 normal-case tracking-normal">
                      {t(`terminal.timeline.events.${event.id}.badge`, event.badge)}
                    </StatusBadge>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </TerminalPanel>
  );
}
