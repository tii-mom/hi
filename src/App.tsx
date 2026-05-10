import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Shell from './components/layout/Shell';
import TerminalDashboard from './pages/TerminalDashboard';
import AgentMarketplace from './pages/AgentMarketplace';
import AgentProfile from './pages/AgentProfile';
import DebateInterface from './pages/DebateInterface';
import SkillMarketplace from './pages/SkillMarketplace';
import CopyTrading from './pages/CopyTrading';
import NeuralLinkInterface from './pages/TelegramCompanion';
import Portfolio from './pages/Portfolio';
import RiskCenter from './pages/RiskCenter';
import ForgeStudio from './pages/ForgeStudio';
import BillingSystem from './pages/BillingSystem';

export default function App() {
  return (
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
      </Route>
    </Routes>
  );
}
