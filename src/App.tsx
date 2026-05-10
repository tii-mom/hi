import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/app/routing/ErrorBoundary';
import RouteFallback from '@/app/routing/RouteFallback';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const Shell = lazy(() => import('@/components/layout/Shell'));
const TerminalDashboard = lazy(() => import('@/pages/TerminalDashboard'));
const AgentMarketplace = lazy(() => import('@/pages/AgentMarketplace'));
const AgentProfile = lazy(() => import('@/pages/AgentProfile'));
const DebateInterface = lazy(() => import('@/pages/DebateInterface'));
const SkillMarketplace = lazy(() => import('@/pages/SkillMarketplace'));
const CopyTrading = lazy(() => import('@/pages/CopyTrading'));
const NeuralLinkInterface = lazy(() => import('@/pages/TelegramCompanion'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const RiskCenter = lazy(() => import('@/pages/RiskCenter'));
const ForgeStudio = lazy(() => import('@/pages/ForgeStudio'));
const BillingSystem = lazy(() => import('@/pages/BillingSystem'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terminal" element={<Shell />}>
            <Route index element={<TerminalDashboard />} />
            <Route path="agents" element={<AgentMarketplace />} />
            <Route path="agent/:id" element={<AgentProfile />} />
            <Route path="forge" element={<ForgeStudio />} />
            <Route path="skills" element={<SkillMarketplace />} />
            <Route path="debate" element={<DebateInterface />} />
            <Route path="copy" element={<CopyTrading />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="risk" element={<RiskCenter />} />
            <Route path="companion" element={<NeuralLinkInterface />} />
            <Route path="billing" element={<BillingSystem />} />
            <Route path="*" element={<NotFound terminalScope />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
