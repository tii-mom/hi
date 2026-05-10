export interface TelegramCompanionCopy {
  key: string;
  fallback: string;
}

export type TelegramCompanionReplyIntent = 'report' | 'trade' | 'default';

export interface TelegramCompanionReportWidget {
  type: 'report';
  btcChangePercent: number;
  ethChangePercent: number;
  risk: TelegramCompanionCopy;
}

export interface TelegramCompanionAgentResponse {
  id: TelegramCompanionReplyIntent;
  triggers: readonly string[];
  text: TelegramCompanionCopy;
  role: TelegramCompanionCopy;
  widgetData?: TelegramCompanionReportWidget;
}

export interface TelegramCompanionViewModel {
  header: {
    title: TelegramCompanionCopy;
    status: TelegramCompanionCopy;
  };
  input: {
    placeholder: TelegramCompanionCopy;
    micLabel: TelegramCompanionCopy;
    sendLabel: TelegramCompanionCopy;
  };
  typingIndicator: TelegramCompanionCopy;
  footerContext: TelegramCompanionCopy;
  widgetLabels: {
    btcAlignment: TelegramCompanionCopy;
    ethAlignment: TelegramCompanionCopy;
    entropyRisk: TelegramCompanionCopy;
  };
  welcome: {
    text: TelegramCompanionCopy;
    role: TelegramCompanionCopy;
  };
  responses: Record<TelegramCompanionReplyIntent, TelegramCompanionAgentResponse>;
}

const companionRoles = {
  tacitOs: {
    key: 'telegram.companion.roles.tacitOs',
    fallback: 'Tacit OS',
  },
  systemOrchestrator: {
    key: 'telegram.companion.roles.systemOrchestrator',
    fallback: 'System Orchestrator',
  },
  riskGuard: {
    key: 'telegram.companion.roles.riskGuard',
    fallback: 'RiskGuard',
  },
  tacitCore: {
    key: 'telegram.companion.roles.tacitCore',
    fallback: 'Tacit Core',
  },
} as const satisfies Record<string, TelegramCompanionCopy>;

export const telegramCompanionViewModel: TelegramCompanionViewModel = {
  header: {
    title: {
      key: 'nav.neuralLink',
      fallback: 'Neural Link',
    },
    status: {
      key: 'telegram.companion.header.status',
      fallback: 'Tacit Synchronization Active',
    },
  },
  input: {
    placeholder: {
      key: 'telegram.companion.input.placeholder',
      fallback: 'Share your constraints, ask for resonance...',
    },
    micLabel: {
      key: 'telegram.companion.input.micLabel',
      fallback: 'Record voice prompt',
    },
    sendLabel: {
      key: 'telegram.companion.input.sendLabel',
      fallback: 'Send prompt',
    },
  },
  typingIndicator: {
    key: 'telegram.companion.typingIndicator',
    fallback: 'Synthesizing...',
  },
  footerContext: {
    key: 'telegram.companion.footer.context',
    fallback: 'Tacit OS Context: Active Portfolio / Base Mainnet / Neutral Volatility',
  },
  widgetLabels: {
    btcAlignment: {
      key: 'telegram.companion.widgets.report.btcAlignment',
      fallback: 'BTC Alignment',
    },
    ethAlignment: {
      key: 'telegram.companion.widgets.report.ethAlignment',
      fallback: 'ETH Alignment',
    },
    entropyRisk: {
      key: 'telegram.companion.widgets.report.entropyRisk',
      fallback: 'Entropy / Risk',
    },
  },
  welcome: {
    text: {
      key: 'agents.companion.welcome',
      fallback:
        'Neural Link established. I am currently resonating with your portfolio and interpreting global market entropy. What would you like to intuit?',
    },
    role: companionRoles.tacitOs,
  },
  responses: {
    report: {
      id: 'report',
      triggers: ['report', 'status'],
      text: {
        key: 'agents.companion.report',
        fallback: 'Synthesizing global resonance...',
      },
      role: companionRoles.systemOrchestrator,
      widgetData: {
        type: 'report',
        btcChangePercent: 1.2,
        ethChangePercent: -0.4,
        risk: {
          key: 'telegram.companion.widgets.report.risk.medium',
          fallback: 'Medium',
        },
      },
    },
    trade: {
      id: 'trade',
      triggers: ['sell', 'buy'],
      text: {
        key: 'agents.companion.trade',
        fallback:
          'Trade intent detected. I am cross-referencing with Friction Sentinel. My tacit heuristics suggest high implicit friction right now; please verify via the Resonance Chamber.',
      },
      role: companionRoles.riskGuard,
    },
    default: {
      id: 'default',
      triggers: [],
      text: {
        key: 'agents.companion.default',
        fallback:
          'I have intuitively assimilated this context into my experiential matrix. Modulating my tacit response variables accordingly.',
      },
      role: companionRoles.tacitCore,
    },
  },
};

export function selectTelegramCompanionResponse(input: string) {
  const lowerInput = input.toLowerCase();
  const { report, trade, default: defaultResponse } = telegramCompanionViewModel.responses;

  if (report.triggers.some((trigger) => lowerInput.includes(trigger))) {
    return report;
  }

  if (trade.triggers.some((trigger) => lowerInput.includes(trigger))) {
    return trade;
  }

  return defaultResponse;
}
