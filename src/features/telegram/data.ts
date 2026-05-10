export interface FeatureCopy {
  key: string;
  fallback: string;
}

export interface TelegramMessageCopy {
  welcome: FeatureCopy;
  report: FeatureCopy;
  trade: FeatureCopy;
  default: FeatureCopy;
}

export interface TelegramWidgetCopy {
  labels: {
    btc: FeatureCopy;
    eth: FeatureCopy;
    risk: FeatureCopy;
  };
}

export interface TelegramCompanionCopy {
  header: {
    title: FeatureCopy;
    subtitle: FeatureCopy;
  };
  messages: TelegramMessageCopy;
  widget: TelegramWidgetCopy;
  input: {
    placeholder: FeatureCopy;
  };
  actions: {
    voice: FeatureCopy;
    send: FeatureCopy;
  };
  typing: FeatureCopy;
  footer: FeatureCopy;
  roles: {
    tacitOs: FeatureCopy;
    systemOrchestrator: FeatureCopy;
    riskGuard: FeatureCopy;
    tacitCore: FeatureCopy;
  };
}

export const telegramCompanionCopy: TelegramCompanionCopy = {
  header: {
    title: {
      key: 'telegram.companion.header.title',
      fallback: 'Neural Link',
    },
    subtitle: {
      key: 'telegram.companion.header.subtitle',
      fallback: 'Tacit Synchronization Active',
    },
  },
  messages: {
    welcome: {
      key: 'telegram.companion.messages.welcome',
      fallback: 'Neural Link established. I am currently resonating with your portfolio and interpreting global market entropy. What would you like to intuit?',
    },
    report: {
      key: 'telegram.companion.messages.report',
      fallback: 'Synthesizing global resonance...',
    },
    trade: {
      key: 'telegram.companion.messages.trade',
      fallback: 'Trade intent detected. I am cross-referencing with Friction Sentinel. My tacit heuristics suggest high implicit friction right now—please verify via the Resonance Chamber.',
    },
    default: {
      key: 'telegram.companion.messages.default',
      fallback: 'I have intuitively assimilated this context into my experiential matrix. Modulating my tacit response variables accordingly.',
    },
  },
  widget: {
    labels: {
      btc: {
        key: 'telegram.companion.widget.labels.btc',
        fallback: 'BTC Alignment',
      },
      eth: {
        key: 'telegram.companion.widget.labels.eth',
        fallback: 'ETH Alignment',
      },
      risk: {
        key: 'telegram.companion.widget.labels.risk',
        fallback: 'Entropy / Risk',
      },
    },
  },
  input: {
    placeholder: {
      key: 'telegram.companion.input.placeholder',
      fallback: 'Share your constraints, ask for resonance...',
    },
  },
  actions: {
    voice: {
      key: 'telegram.companion.actions.voice',
      fallback: 'Record voice prompt',
    },
    send: {
      key: 'telegram.companion.actions.send',
      fallback: 'Send prompt',
    },
  },
  typing: {
    key: 'telegram.companion.typing',
    fallback: 'Synthesizing...',
  },
  footer: {
    key: 'telegram.companion.footer',
    fallback: 'Tacit OS Context: Active Portfolio / Base Mainnet / Neutral Volatility',
  },
  roles: {
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
  },
};
