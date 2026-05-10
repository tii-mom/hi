import type { TFunction } from 'i18next';
import { agentOverviewRanges, agentProfileTabs, agentRegistry, getAgentById as getAgentByIdData } from './data';
import type { AgentCopy, AgentEntity, AgentProfileTab } from './types';

const copy = (t: TFunction, item: AgentCopy) => t(item.key, item.fallback);

export interface AgentMarketplaceViewModel {
  agents: AgentEntity[];
}

export interface AgentProfileViewModel {
  tabs: Array<{ id: AgentProfileTab; label: string }>;
  ranges: AgentCopy[];
  agent?: AgentEntity;
}

export function createAgentMarketplaceViewModel(t: TFunction): AgentMarketplaceViewModel {
  return {
    agents: agentRegistry.map((agent) => ({
      ...agent,
      name: copy(t, { key: `${agent.contentKeyPrefix}.name`, fallback: agent.name }),
      type: copy(t, { key: `${agent.contentKeyPrefix}.type`, fallback: agent.type }),
    })),
  };
}

export function createAgentProfileViewModel(t: TFunction, id?: string): AgentProfileViewModel {
  const agent = getAgentByIdData(id);

  return {
    tabs: agentProfileTabs.map((tab) => ({
      id: tab,
      label: t(`agents.profile.tabs.${tab}`, tab),
    })),
    ranges: agentOverviewRanges,
    agent: agent
      ? {
          ...agent,
          name: copy(t, { key: `${agent.contentKeyPrefix}.name`, fallback: agent.name }),
          statusLabel: copy(t, { key: `${agent.contentKeyPrefix}.statusLabel`, fallback: agent.statusLabel }),
          description: copy(t, { key: `${agent.contentKeyPrefix}.description`, fallback: agent.description }),
          domain: copy(t, { key: `${agent.contentKeyPrefix}.domain`, fallback: agent.domain }),
          cognitiveAge: copy(t, { key: `${agent.contentKeyPrefix}.cognitiveAge`, fallback: agent.cognitiveAge }),
          expertiseLabel: copy(t, { key: `${agent.contentKeyPrefix}.expertiseLabel`, fallback: agent.expertiseLabel }),
          aumLabel: copy(t, { key: `${agent.contentKeyPrefix}.aumLabel`, fallback: agent.aumLabel }),
        }
      : undefined,
  };
}
