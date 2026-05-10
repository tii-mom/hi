import { useCallback, useMemo, useState } from 'react';
import { Activity, AlertTriangle, Power, ShieldAlert, Target, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { createRiskViewModel, createSystemStressData } from '@/app/services/risk';
import { loadRiskReadModel } from '@/app/services/readModels';
import { useReadModelResource } from '@/app/services/useReadModelResource';
import { ResourceStatus } from '@/components/ui/surfaces/ResourceStatus';
import { riskLevels, useSystemTime, type RiskLevel } from '@/features/risk';
import { cn } from '@/lib/utils';
import { useLiveData } from '../hooks/useLiveData';

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function riskTone(risk: RiskLevel) {
  if (risk === 'high') {
    return {
      tile: 'bg-red-500/10 hover:bg-red-500/20',
      glow: 'bg-red-500/30',
      dot: 'bg-red-500/50',
    };
  }

  if (risk === 'medium') {
    return {
      tile: 'bg-orange-500/10 hover:bg-orange-500/20',
      glow: 'bg-orange-500/30',
      dot: 'bg-orange-500/50',
    };
  }

  return {
    tile: 'bg-blue-500/10 hover:bg-blue-500/20',
    glow: 'bg-blue-500/30',
    dot: 'bg-blue-500/50',
  };
}

export default function RiskCenter() {
  const [isArmed, setIsArmed] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const { value: leverage } = useLiveData(2.4, 0.05, 2000);
  const { value: var95 } = useLiveData(1.24, 0.02, 3000);
  const { t, i18n } = useTranslation();
  const systemTime = useSystemTime();
  const systemStressData = useMemo(() => createSystemStressData(), []);
  const fallback = createRiskViewModel(t);
  const load = useCallback((context: Parameters<typeof loadRiskReadModel>[1]['context']) => loadRiskReadModel(t, { context }), [t]);
  const { data: riskViewModel, resource } = useReadModelResource({
    fallback,
    load,
    dependencyKey: i18n.language,
  });

  const handleKillSwitch = () => {
    if (isArmed && !isTriggered) {
      setIsTriggered(true);
      window.setTimeout(() => setIsTriggered(false), 5000);
      window.setTimeout(() => setIsArmed(false), 5000);
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col gap-4 md:gap-6 p-2 bg-[#050505] overflow-hidden">
      <ResourceStatus resource={resource} label="Risk data" />
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-red-900/30 pb-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-red-500 flex items-center gap-2 break-words">
            <ShieldAlert className="w-5 h-5" />
            {riskViewModel.title}
          </h2>
          <p className="text-[10px] text-red-500/60 font-mono mt-1">
            {riskViewModel.statusLabel}:{' '}
            {isTriggered ? riskViewModel.statusSevering : riskViewModel.statusResonant} // {riskViewModel.defconLabel}
          </p>
        </div>
        <div className="flex items-center gap-4 sm:justify-end flex-wrap">
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] text-text-secondary font-mono tracking-widest">
              {riskViewModel.serverTimeLabel}
            </span>
            <span className="text-sm font-mono text-white">{systemTime}Z</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] text-text-secondary font-mono tracking-widest">
              {riskViewModel.totalExposureLabel}
            </span>
            <span className="text-sm font-mono text-orange-500">{formatUsd(riskViewModel.totalExposureUsd)}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 min-h-0 overflow-hidden">
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-4 md:gap-6 min-h-0 min-w-0">
          <div
            className={cn(
              'rounded-xl border p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 setup-kill-switch min-w-0',
              isTriggered
                ? 'bg-red-950/40 border-red-500'
                : isArmed
                  ? 'bg-orange-950/20 border-orange-500/50'
                  : 'bg-black/50 border-red-900/30',
            )}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />

            <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6 md:mb-8 text-center">
              {riskViewModel.protocolTitle}
            </h3>

            <div className="relative">
              <button
                onClick={() => !isTriggered && setIsArmed(!isArmed)}
                className={cn(
                  'absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-t-lg transition-colors border border-b-0 cursor-pointer z-20 whitespace-nowrap',
                  isArmed
                    ? 'bg-orange-500/20 text-orange-500 border-orange-500/50'
                    : 'bg-white/5 text-text-secondary border-white/10 hover:text-white hover:bg-white/10',
                )}
              >
                {isArmed ? riskViewModel.protocolArmedText : riskViewModel.protocolDisarmedText}
              </button>

              <button
                onClick={handleKillSwitch}
                disabled={!isArmed || isTriggered}
                className={cn(
                  'w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full border-4 flex items-center justify-center flex-col transition-all duration-300 relative z-10 shadow-2xl overflow-hidden group',
                  !isArmed && !isTriggered
                    ? 'bg-red-950/20 border-red-900/30 cursor-not-allowed opacity-50'
                    : isTriggered
                      ? 'bg-red-600 border-red-400 scale-95'
                      : 'bg-red-500/10 border-red-500 hover:bg-red-500/20 hover:scale-105 cursor-pointer shadow-[0_0_50px_rgba(239,68,68,0.3)]',
                )}
              >
                {isTriggered && <div className="absolute inset-0 bg-red-500 animate-ping opacity-20" />}
                <Power className={cn('w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-2', isArmed ? 'text-red-500 group-hover:text-red-400' : 'text-red-900')} />
                <span
                  className={cn(
                    'font-black tracking-tighter text-lg sm:text-xl lg:text-2xl uppercase text-center leading-none',
                    isArmed ? 'text-red-500 group-hover:text-red-400' : 'text-red-900',
                  )}
                >
                  {isTriggered ? riskViewModel.statusSevering : riskViewModel.protocolActionText}
                </span>
                <span
                  className={cn(
                    'text-[9px] font-bold uppercase tracking-widest mt-1',
                    isArmed ? 'text-red-400' : 'text-red-900',
                  )}
                >
                  {riskViewModel.protocolSubtext}
                </span>
              </button>
            </div>

            {isArmed && !isTriggered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center text-[10px] font-mono text-orange-400 animate-pulse flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded border border-orange-500/20"
              >
                <AlertTriangle className="w-3 h-3" />
                {riskViewModel.protocolArmingNotice}
              </motion.div>
            )}
          </div>

          <div className="glass rounded-xl border-border p-4 md:p-5 flex flex-col relative overflow-hidden flex-1 min-h-0 min-w-0">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
              <Activity className="w-3 h-3" /> {riskViewModel.metricsTitle}
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-text-secondary uppercase font-mono">{riskViewModel.leverageLabel}</span>
                  <span
                    className={cn(
                      'text-2xl font-light font-mono',
                      leverage > 4 ? 'text-red-500' : leverage > 2.5 ? 'text-orange-500' : 'text-accent-emerald',
                    )}
                  >
                    {leverage.toFixed(2)}x
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      leverage > 4 ? 'bg-red-500' : leverage > 2.5 ? 'bg-orange-500' : 'bg-accent-emerald',
                    )}
                    style={{ width: `${Math.min(100, (leverage / 5) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono mt-1 text-text-secondary">
                  <span>{riskViewModel.leverageScaleMin}</span>
                  <span>{riskViewModel.leverageScaleMax}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-text-secondary uppercase font-mono">{riskViewModel.varLabel}</span>
                  <span className="text-xl font-light font-mono text-orange-400">-{var95.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${(var95 / 3) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 md:gap-6 min-h-0 min-w-0">
          <div className="flex-[0.6] glass rounded-xl border border-border p-4 md:p-5 flex flex-col relative min-h-0 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                <Target className="w-3 h-3" /> {riskViewModel.heatmapTitle}
              </h3>
              <div className="flex gap-2 flex-wrap sm:justify-end">
                {riskLevels.map((risk) => {
                  const tone = riskTone(risk);

                  return (
                    <span key={risk} className="text-[9px] uppercase font-mono text-text-secondary flex items-center gap-1">
                      <div className={cn('w-2 h-2 rounded-full blur-[2px]', tone.dot)} />
                      {riskViewModel.heatmapLegend[risk]}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3 min-h-0">
              {riskViewModel.heatmapAgents.map((agent) => {
                const tone = riskTone(agent.risk);

                return (
                  <div
                    key={agent.id}
                    className={cn(
                      'rounded-lg p-3 relative overflow-hidden group flex flex-col justify-between border border-white/5',
                      agent.colSpanClass,
                      tone.tile,
                    )}
                  >
                    <div
                      className={cn(
                        'absolute -right-4 -top-4 w-16 h-16 rounded-full blur-[20px] transition-all group-hover:blur-[30px]',
                        tone.glow,
                      )}
                    />
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="text-xs font-bold">{agent.name}</span>
                      <span className="text-[10px] font-mono text-white/50">
                        {agent.exposurePercent}% {riskViewModel.heatmapAllocationLabel}
                      </span>
                    </div>
                    <div className="relative z-10 text-[9px] uppercase tracking-widest text-text-secondary mt-4">
                      {agent.strategy}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-[0.4] glass rounded-xl border border-border p-4 md:p-5 flex flex-col relative overflow-hidden min-h-0 min-w-0">
            <div className="flex justify-between items-center mb-4 z-10 relative">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                <TrendingDown className="w-3 h-3" /> {riskViewModel.stressTitle}
              </h3>
              <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-mono uppercase animate-pulse">
                {riskViewModel.stressBadge}
              </span>
            </div>

            <div className="flex-1 relative z-10 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={systemStressData}>
                  <defs>
                    <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="liquidityRisk"
                    name={riskViewModel.stressAreas.liquidity}
                    stroke="#f97316"
                    strokeWidth={1}
                    fillOpacity={1}
                    fill="url(#colorLiquidity)"
                    isAnimationActive={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="overall"
                    name={riskViewModel.stressAreas.overall}
                    stroke="#ef4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOverall)"
                    isAnimationActive={true}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
