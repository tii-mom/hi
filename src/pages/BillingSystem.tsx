import { CreditCard, Copy, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppState, type WalletStatus } from '@/app/state';
import {
  bondStatusToneClasses,
  billingViewModel,
  summaryMetricToneClasses,
  type BillingCopy,
  yieldSegmentToneClasses,
} from '@/features/billing';
import { cn } from '@/lib/utils';
import { LaunchStateBadge } from '@/components/ui/surfaces/LaunchStateBadge';

function walletStatusDotClass(walletStatus: WalletStatus) {
  if (walletStatus === 'connected') {
    return 'bg-accent-emerald animate-pulse';
  }

  if (walletStatus === 'connecting') {
    return 'bg-accent-blue animate-pulse';
  }

  return 'bg-white/20';
}

export default function BillingSystem() {
  const { connectedIdentityLabel, openAuthModal, walletStatus } = useAppState();
  const { t } = useTranslation();
  const copy = (item: BillingCopy) => t(item.key, item.fallback);
  const walletIdentityLabel =
    walletStatus === 'connected' && connectedIdentityLabel
      ? connectedIdentityLabel
      : copy(billingViewModel.walletDisplay.identityFallback);

  return (
    <div className="h-full flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-accent-emerald" />
            {copy(billingViewModel.title)}
          </h2>
          <p className="text-sm text-text-secondary">{copy(billingViewModel.subtitle)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 border-accent-blue/30 relative overflow-hidden col-span-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 blur-[40px]" />
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">
            {copy(billingViewModel.walletDisplay.title)}
          </h3>

          <div className="space-y-4 relative z-10">
            <div className="bg-black/30 p-4 rounded-lg border border-white/5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-text-secondary">{copy(billingViewModel.walletDisplay.network)}</span>
                <span className={cn('w-2 h-2 rounded-full', walletStatusDotClass(walletStatus))} />
              </div>
              <div className="font-mono text-sm tracking-tight flex items-center justify-between">
                {walletIdentityLabel}
                <Copy className="w-3 h-3 text-text-secondary cursor-pointer hover:text-white" />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                {copy(billingViewModel.walletDisplay.liquidityLabel)}
              </span>
              <div className="text-3xl font-light data-value">
                {copy(billingViewModel.walletDisplay.usdAmount)}
                <span className="text-sm text-text-secondary ml-1">{copy(billingViewModel.walletDisplay.usdTicker)}</span>
              </div>
              <div className="text-sm data-value text-text-secondary mt-1">
                {copy(billingViewModel.walletDisplay.ethAmount)} {copy(billingViewModel.walletDisplay.ethTicker)}
              </div>
            </div>

            <button
              type="button"
              onClick={openAuthModal}
              title="Preview-only wallet management. No live wallet operations are connected."
              className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors mt-4"
            >
              {copy(billingViewModel.walletDisplay.manageAction)}
              <LaunchStateBadge state="preview" className="ml-2 align-middle" />
            </button>
          </div>
        </div>

        <div className="glass rounded-xl p-6 col-span-1 md:col-span-2">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">
            {copy(billingViewModel.yieldRatio.title)}
          </h3>

          <div className="flex h-12 rounded-lg overflow-hidden border border-white/10 mb-4 font-mono text-[10px] font-bold">
            {billingViewModel.yieldRatio.segments.map((segment, index) => (
              <div
                key={segment.id}
                className={cn(
                  'flex items-center justify-center group cursor-pointer transition-colors',
                  index < billingViewModel.yieldRatio.segments.length - 1 && 'border-r border-black/50',
                  yieldSegmentToneClasses[segment.tone],
                )}
                style={{ width: `${segment.valuePercent}%` }}
              >
                <span>{copy(segment.label)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {billingViewModel.summaryMetrics.map((metric) => (
              <div key={metric.id} className="p-4 bg-black/20 rounded-lg border border-white/5">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">{copy(metric.label)}</span>
                {metric.action ? (
                  <div className="flex items-center justify-between">
                    <span className={cn('text-lg font-mono', summaryMetricToneClasses[metric.tone])}>{copy(metric.value)}</span>
                    <button
                      type="button"
                      disabled
                      title="Disabled until production billing settlement exists."
                      className="text-[9px] bg-white text-black px-2 py-1 rounded font-bold uppercase hover:bg-white/90"
                    >
                      {copy(metric.action)}
                    </button>
                  </div>
                ) : (
                  <span className={cn('text-lg font-mono', summaryMetricToneClasses[metric.tone])}>{copy(metric.value)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-xl flex-1 border border-border p-6 min-h-0 overflow-y-auto">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary border-b border-white/5 pb-2 mb-4">
          {copy(billingViewModel.logicBonds.title)}
        </h3>

        <div className="space-y-3">
          {billingViewModel.logicBonds.items.map((bond) => (
            <div
              key={bond.id}
              className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Cpu className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{copy(bond.agent)}</h4>
                  <div className="flex gap-3 text-[10px] font-mono text-text-secondary mt-1">
                    <span className="text-accent-blue">{copy(bond.fee)}</span>
                    <span>
                      {copy(billingViewModel.logicBonds.limitPrefix)}: {copy(bond.limit)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn('text-[10px] font-bold uppercase px-2 py-1 rounded border', bondStatusToneClasses[bond.status])}>
                  {copy(billingViewModel.logicBonds.statusLabels[bond.status])}
                </span>
                <button
                  type="button"
                  disabled={bond.status !== 'active'}
                  title="Disabled until live logic-bond revocation is implemented."
                  className="text-[10px] font-bold text-white/50 hover:text-white uppercase tracking-wider underline underline-offset-2"
                >
                  {copy(billingViewModel.logicBonds.revokeAction)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
