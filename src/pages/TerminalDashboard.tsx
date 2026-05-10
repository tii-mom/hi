import {
  AIMemoryModule,
  AITimelineFeed,
  AgentConsensusGraph,
  PortfolioReasoning,
  TerminalAgentStates,
  TerminalMarketPanel,
  TerminalStatsRow,
  useTerminalViewModel,
} from '../features/terminal';

export default function TerminalDashboard() {
  const { stats, market, agentStates } = useTerminalViewModel();

  return (
    <div className="h-full min-h-0 min-w-0 flex flex-col gap-4 overflow-hidden">
      <TerminalStatsRow stats={stats} />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 min-h-0 min-w-0">
          <AITimelineFeed />
        </div>

        <div className="col-span-1 lg:col-span-6 flex flex-col gap-4 min-h-0 min-w-0">
          <TerminalMarketPanel market={market} />

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <PortfolioReasoning />
            <AgentConsensusGraph />
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 min-h-0 min-w-0">
          <div className="h-[320px] lg:h-[40%] shrink-0">
            <AIMemoryModule />
          </div>

          <TerminalAgentStates agents={agentStates} />
        </div>
      </div>
    </div>
  );
}
