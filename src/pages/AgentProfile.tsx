import { useCallback, useState } from 'react';
import { Activity, History, Network, ShieldCheck, Sliders, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { EmptyState } from '@/components/ui/surfaces/EmptyState';
import { createAgentProfileViewModel } from '@/app/services/agents';
import { loadAgentProfileReadModel } from '@/app/services/readModels';
import { useReadModelResource } from '@/app/services/useReadModelResource';
import { ResourceStatus } from '@/components/ui/surfaces/ResourceStatus';
import { cn } from '@/lib/utils';
import AgentAvatar from '../components/ui/AgentAvatar';

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-black/80 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
      <p className="text-[10px] text-text-secondary font-mono mb-1">{label}</p>
      <p className="text-sm font-bold text-accent-blue">{Number(payload[0].value).toFixed(2)}%</p>
    </div>
  );
}

function AgentProfileNotFound({ id }: { id?: string }) {
  const { t } = useTranslation();

  return (
    <EmptyState
      title={t('agents.profile.notFound.title', 'Agent profile not found')}
      description={t('agents.profile.notFound.description', {
        defaultValue: 'No registered frontend agent profile matches {{id}}. Return to the registry to select an active entity.',
        id: id ?? 'unknown-id',
      })}
      action={
        <Link
          to="/terminal/agents"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-white/90"
        >
          {t('agents.profile.notFound.cta', 'Return to Registry')}
        </Link>
      }
    />
  );
}

export default function AgentProfile() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const fallback = createAgentProfileViewModel(t, id);
  const load = useCallback(
    (context: Parameters<typeof loadAgentProfileReadModel>[2]['context']) =>
      loadAgentProfileReadModel(id ?? 'unknown-id', t, { context }),
    [id, t],
  );
  const { data: viewModel, resource } = useReadModelResource({
    fallback,
    load,
    dependencyKey: `${id ?? 'unknown-id'}:${i18n.language}`,
  });
  const agent = viewModel.agent;
  const [activeTab, setActiveTab] = useState(viewModel.tabs[0]?.id ?? 'overview');
  const [isCopyPanelOpen, setIsCopyPanelOpen] = useState(false);
  const [allocation, setAllocation] = useState(1000);
  const [maxDrawdown, setMaxDrawdown] = useState(15);
  const [aggression, setAggression] = useState(50);

  if (!agent) {
    return <AgentProfileNotFound id={id} />;
  }

  const copy = (key: string, fallback: string) => t(key, fallback);
  const translateAgent = (suffix: string, fallback: string) => copy(`${agent.contentKeyPrefix}.${suffix}`, fallback);

  const translatedSkills = agent.skills.map((skill, index) => ({
    ...skill,
    name: translateAgent(`skills.${index}.name`, skill.name),
    description: translateAgent(`skills.${index}.description`, skill.description),
    mastery: translateAgent(`skills.${index}.mastery`, skill.mastery),
    tacitWeight: translateAgent(`skills.${index}.tacitWeight`, skill.tacitWeight),
  }));

  const translatedMemory = agent.memoryNodes.map((node, index) => ({
    ...node,
    epoch: translateAgent(`memoryNodes.${index}.epoch`, node.epoch),
    title: translateAgent(`memoryNodes.${index}.title`, node.title),
    summary: translateAgent(`memoryNodes.${index}.summary`, node.summary),
    insight: translateAgent(`memoryNodes.${index}.insight`, node.insight),
  }));

  const translatedIndustries = agent.industryResonance.map((industry, index) => ({
    ...industry,
    label: translateAgent(`industryResonance.${index}.label`, industry.label),
    description: translateAgent(`industryResonance.${index}.description`, industry.description),
  }));

  const translatedMemoryStream = agent.liveMemory.map((event, index) => ({
    ...event,
    time: translateAgent(`liveMemory.${index}.time`, event.time),
    text: translateAgent(`liveMemory.${index}.text`, event.text),
  }));

  const translatedHeuristics = agent.heuristics.map((heuristic, index) => ({
    ...heuristic,
    label: translateAgent(`heuristics.${index}.label`, heuristic.label),
    status: translateAgent(`heuristics.${index}.status`, heuristic.status),
  }));

  return (
    <div className="h-full flex flex-col gap-6 relative">
      <ResourceStatus resource={resource} label="Agent profile" />
      <div className="glass rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="flex justify-between items-start relative z-10">
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 shrink-0">
              <AgentAvatar seed={agent.avatarSeed} size={96} className="rounded-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-light tracking-tight">{translateAgent('name', agent.name)}</h1>
                <div className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-accent-emerald rounded-full animate-pulse" />
                  {translateAgent('statusLabel', agent.statusLabel)}
                </div>
              </div>
              <p className="text-sm text-text-secondary w-2/3 leading-relaxed mb-4">
                {translateAgent('description', agent.description)}
              </p>
              <div className="flex gap-4 text-xs font-mono">
                <div className="flex gap-1 items-center">
                  <span className="text-text-secondary">{copy('agents.profile.labels.domain', 'DOMAIN')}:</span>
                  <span className="text-accent-blue">{translateAgent('domain', agent.domain)}</span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="text-text-secondary">{copy('agents.profile.labels.cognitiveAge', 'COGNITIVE_AGE')}:</span>
                  <span className="text-white">{translateAgent('cognitiveAge', agent.cognitiveAge)}</span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="text-text-secondary">{copy('agents.profile.labels.tacitIndex', 'TACIT_INDEX')}:</span>
                  <span className="text-purple-400">{translateAgent('expertiseLabel', agent.expertiseLabel)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <button
              onClick={() => setIsCopyPanelOpen(true)}
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              {copy('agents.profile.actions.copyStrategy', 'Copy Strategy')}
            </button>
            <div className="text-right">
              <div className="text-sm text-text-secondary mb-1">{copy('agents.profile.labels.totalAum', 'Total AUM Configured')}</div>
              <div className="text-2xl font-light tracking-tighter data-value">{translateAgent('aumLabel', agent.aumLabel)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-border pb-2">
        {viewModel.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'text-xs font-bold uppercase tracking-widest pb-2 relative transition-colors',
              activeTab === tab.id ? 'text-accent-blue' : 'text-text-secondary hover:text-white',
            )}
          >
            {tab.label}
            {activeTab === tab.id && <motion.div layoutId="agent-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue" />}
          </button>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 overflow-y-auto pb-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="glass p-4 rounded-xl">
              <div className="text-[10px] text-text-secondary mb-1 uppercase tracking-widest">
                {copy('agents.profile.stats.return30d', '30D Return')}
              </div>
              <div className="text-xl text-accent-emerald data-value font-light">{agent.stats.return30d}</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-[10px] text-text-secondary mb-1 uppercase tracking-widest">
                {copy('agents.profile.stats.winRate', 'Win Rate')}
              </div>
              <div className="text-xl text-white data-value font-light">{agent.stats.winRate}</div>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="text-[10px] text-text-secondary mb-1 uppercase tracking-widest">
                {copy('agents.profile.stats.tacitIndex', 'Tacit Index')}
              </div>
              <div className="text-xl text-purple-400 data-value font-light">{agent.stats.tacitIndex}</div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px]">
              <div className="p-4 border-b border-white/5 flex justify-between items-center z-10 relative bg-white/[0.03]">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                  {copy('agents.profile.overview.title', 'Historical Edge')}
                </h3>
                <div className="flex gap-2 text-[10px] font-mono">
                  {viewModel.ranges.map((range) => (
                    <span
                      key={range.key}
                      className={cn(
                        'cursor-pointer px-2 rounded',
                        range.key.endsWith('.3m') ? 'text-accent-blue bg-accent-blue/10' : 'text-text-secondary hover:text-white',
                      )}
                    >
                      {copy(range.key, range.fallback)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 pt-6 relative min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={agent.performanceData}>
                    <defs>
                      <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="date" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-accent-blue)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPerf)"
                      isAnimationActive={true}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px] p-6">
              <h3 className="text-xl font-light mb-4 text-white">{copy('agents.profile.skills.title', 'Tacit Skill Manifestation')}</h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                {copy(
                  'agents.profile.skills.description',
                  'Capabilities extracted from non-verbal heuristics and deep experiential associations. These skills govern the agent\'s emergent actions.',
                )}
              </p>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {translatedSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className={cn(
                      'bg-black/30 border border-white/5 p-4 rounded-lg relative overflow-hidden',
                      skill.muted && 'border-dashed opacity-70',
                    )}
                  >
                    <div className={cn('absolute top-0 right-0 w-2 h-full', skill.railClass)} />
                    <h4 className={cn('text-xs font-bold mb-2 uppercase tracking-wide', skill.colorClass)}>{skill.name}</h4>
                    <p className="text-xs text-text-secondary mb-3">{skill.description}</p>
                    <div className="flex gap-2">
                      <span className={cn('text-[10px] px-2 py-0.5 rounded font-mono', skill.badgeClass)}>
                        {copy('agents.profile.skills.masteryLabel', 'Mastery')}: {skill.mastery}
                      </span>
                      <span className="text-[10px] bg-white/5 text-text-secondary px-2 py-0.5 rounded font-mono">
                        {copy('agents.profile.skills.tacitWeightLabel', 'Tacit Weight')}: {skill.tacitWeight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px] p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-light text-white mb-2">{copy('agents.profile.memory.title', 'Memory & Experiential Nodes')}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                    {copy(
                      'agents.profile.memory.description',
                      'The agent remembers outcomes but internalizes the "feel" of localized paradoxes. Below are core episodic fragments forming its intuition baseline.',
                    )}
                  </p>
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-text-secondary">
                  {copy('agents.profile.memory.capacityLabel', 'Capacity')}: <span className="text-white">{translateAgent('memoryCapacity', agent.memoryCapacity)}</span>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                {translatedMemory.map((node, index) => (
                  <div
                    key={`${node.epoch}-${node.title}`}
                    className={cn('flex gap-4 items-start relative pb-4', index < translatedMemory.length - 1 && 'border-b border-white/5')}
                  >
                    {index < translatedMemory.length - 1 && <div className="absolute left-[11px] top-8 bottom-0 w-px bg-white/10" />}
                    <div className={cn('w-6 h-6 rounded-full border flex items-center justify-center shrink-0 z-10', node.bgClass, node.borderClass)}>
                      <div className={cn('w-2 h-2 rounded-full', node.dotClass, node.live && 'animate-pulse')} />
                    </div>
                    <div>
                      <p className={cn('text-xs font-mono mb-1', node.colorClass)}>
                        {node.epoch} // "{node.title}"
                      </p>
                      <p className="text-sm text-white/90 mb-2">{node.summary}</p>
                      <p className={cn('text-xs text-text-secondary italic', node.live && 'animate-pulse')}>{node.insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'industry' && (
            <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden min-h-[300px] p-6">
              <h3 className="text-xl font-light text-white mb-2">{copy('agents.profile.industry.title', 'Industry & Domain Resonance')}</h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed max-w-md">
                {copy(
                  'agents.profile.industry.description',
                  'Quantified tacit intuition mapped across global industry sectors. Higher resonance indicates deeply ingrained "gut feelings" about the sector\'s flow state.',
                )}
              </p>

              <div className="space-y-5 flex-1 overflow-y-auto pr-2">
                {translatedIndustries.map((industry) => (
                  <div key={industry.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={cn('font-bold uppercase tracking-wide', industry.colorClass)}>{industry.label}</span>
                      <span className={cn('font-mono', industry.colorClass)}>
                        {industry.resonance}% {copy('agents.profile.industry.resonanceLabel', 'Resonance')}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                      <div className={cn('h-full', industry.barClass)} style={{ width: `${industry.resonance}%` }} />
                    </div>
                    <p className="text-[10px] text-text-secondary mt-1">{industry.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex-1 glass rounded-xl flex flex-col border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-violet/50 to-transparent animate-pulse" />

            <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-white/[0.03]">
              <History className="w-3 h-3 text-accent-violet" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                {copy('agents.profile.liveMemory.title', 'Live Memory Stream')}
              </h3>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto font-mono text-[10px]">
              {translatedMemoryStream.map((event, index) => (
                <motion.div
                  key={`${event.time}-${event.text}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={cn('border-l pl-3', event.borderClass, event.muted && 'opacity-50')}
                >
                  <span className={cn('mb-1 block', event.timeClass)}>{event.time}</span>
                  <p className="text-white/80 leading-relaxed">{event.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-4 border-border">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
              <Network className="w-3 h-3 text-text-secondary" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                {copy('agents.profile.heuristics.title', 'Emergent Tacit Heuristics')}
              </h3>
            </div>
            <div className="space-y-3">
              {translatedHeuristics.map((heuristic) => (
                <div key={heuristic.label} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-2 h-2 rounded-full', heuristic.dotClass)} />
                    <span>{heuristic.label}</span>
                  </div>
                  <span className={cn('font-mono text-[10px] px-2 rounded', heuristic.statusClass)}>{heuristic.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCopyPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCopyPanelOpen(false)}
              className="absolute inset-x-0 h-full bg-black/60 backdrop-blur-sm z-40 rounded-xl"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) setIsCopyPanelOpen(false);
              }}
              className="absolute bottom-0 left-0 right-0 w-full h-[85%] md:h-[90%] bg-[#0a0a0c] border-t border-white/10 z-50 rounded-t-3xl flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>

              <div className="px-6 pb-4 pt-2 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent-blue" />
                    {copy('agents.profile.copy.title', 'Configure Auto-Copy')}
                  </h3>
                  <p className="text-[10px] text-text-secondary mt-1">{translateAgent('name', agent.name)}</p>
                </div>
                <button onClick={() => setIsCopyPanelOpen(false)} className="text-text-secondary hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                      {copy('agents.profile.copy.allocation', 'Principal Allocation')}
                    </label>
                    <span className="font-mono text-accent-blue">${allocation.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={allocation}
                    onChange={(e) => setAllocation(Number(e.target.value))}
                    className="w-full accent-accent-blue"
                  />
                  <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                    <span>$100</span>
                    <span>$10k</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {copy('agents.profile.copy.maxDrawdown', 'Max Drawdown Stop')}
                    </label>
                    <span className="font-mono text-orange-400">-{maxDrawdown}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={maxDrawdown}
                    onChange={(e) => setMaxDrawdown(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    {t('agents.profile.copy.drawdownDescription', {
                      defaultValue:
                        'If portfolio falls below ${{threshold}} ({{percent}}%), the system will auto-exit all positions.',
                      threshold: ((1 - maxDrawdown / 100) * allocation).toLocaleString(),
                      percent: (100 - maxDrawdown).toFixed(0),
                    })}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1">
                      <Sliders className="w-3 h-3" />
                      {copy('agents.profile.copy.strategyMultiplier', 'AI Strategy Multiplier')}
                    </label>
                    <span className="font-mono text-white">{aggression < 30 ? '0.5x' : aggression > 70 ? '2.0x' : '1.0x'}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={aggression}
                    onChange={(e) => setAggression(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-text-secondary uppercase">
                    <span>{copy('agents.profile.copy.conservative', 'Conservative')}</span>
                    <span>{copy('agents.profile.copy.aggressive', 'Aggressive')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="flex justify-between text-xs mb-4">
                  <span className="text-text-secondary">{copy('agents.profile.copy.estimatedYield', 'Est. Monthly Yield')}</span>
                  <span className="text-accent-emerald font-mono">~${(allocation * agent.copyYieldRate).toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCopyPanelOpen(false);
                  }}
                  className="w-full py-3 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-white/90 transition-colors"
                >
                  {copy('agents.profile.copy.confirm', 'Confirm & Deploy Contract')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
