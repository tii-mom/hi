import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TerminalPanel } from '@/components/ui/surfaces/TerminalPanel';
import { StatusBadge } from '@/components/ui/surfaces/StatusBadge';
import type { TerminalMarketState } from '../types';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-[10px] text-text-secondary font-mono mb-1">{label}</p>
        <p className="text-sm font-bold text-accent-blue">
          ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    );
  }

  return null;
};

interface TerminalMarketPanelProps {
  market: TerminalMarketState;
}

export default function TerminalMarketPanel({ market }: TerminalMarketPanelProps) {
  const { t } = useTranslation();

  return (
    <TerminalPanel
      className="bg-gradient-to-b from-blue-900/10 to-transparent h-[45%] shrink-0"
      title={t('terminal.market.executionTitle', { symbol: market.symbol })}
      actions={
        <div className="flex items-center gap-2">
          {market.timeframes.map((timeframe) => {
            const isActive = timeframe === market.activeTimeframe;

            return (
              <span
                key={timeframe}
                className={
                  isActive
                    ? 'text-[10px] font-mono text-text-primary px-2 py-0.5 bg-white/10 rounded border border-white/20 cursor-pointer'
                    : 'text-[10px] font-mono text-text-secondary cursor-pointer hover:text-white transition-colors'
                }
              >
                {timeframe}
              </span>
            );
          })}
        </div>
      }
    >
      <div className="absolute inset-0 bg-noise opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-blue/10 blur-[100px] pointer-events-none" />

      <div className="flex-1 p-4 flex flex-col relative z-10 min-h-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <motion.h2 key={market.price} className="text-3xl font-light tracking-tighter text-white">
              ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.h2>
            <p className="text-[9px] text-text-secondary font-mono tracking-widest uppercase mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              {market.streamLabel}
            </p>
          </div>
          <div className="text-right">
            <StatusBadge tone="emerald" className="text-xl tracking-tighter px-2 py-1">
              {market.changeLabel}
            </StatusBadge>
          </div>
        </div>
        <div className="flex-1 relative mt-2 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={market.history}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-accent-blue)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </TerminalPanel>
  );
}
