import { selectTelegramCompanionResponse as selectCompanionResponse, telegramCompanionViewModel as telegramData } from './companion';
import type { TelegramCompanionAgentResponse, TelegramCompanionCopy, TelegramCompanionReplyIntent } from './companion';
import { translate, type FrontendTranslator } from '@/features/copy/viewModel';

const copy = (t: FrontendTranslator, item: TelegramCompanionCopy) => translate(t, item.key, item.fallback);

export interface TelegramCompanionResolvedResponse {
  id: TelegramCompanionReplyIntent;
  text: string;
  role: string;
  widgetData?: {
    type: 'report';
    btcChangePercent: number;
    ethChangePercent: number;
    risk: string;
  };
}

export interface TelegramCompanionPageViewModel {
  header: {
    title: string;
    status: string;
  };
  input: {
    placeholder: string;
    micLabel: string;
    sendLabel: string;
  };
  typingIndicator: string;
  footerContext: string;
  widgetLabels: {
    btcAlignment: string;
    ethAlignment: string;
    entropyRisk: string;
  };
  welcome: {
    text: string;
    role: string;
  };
}

function resolveResponse(t: FrontendTranslator, response: TelegramCompanionAgentResponse): TelegramCompanionResolvedResponse {
  return {
    id: response.id,
    text: copy(t, response.text),
    role: copy(t, response.role),
    ...(response.widgetData
      ? {
          widgetData: {
            type: response.widgetData.type,
            btcChangePercent: response.widgetData.btcChangePercent,
            ethChangePercent: response.widgetData.ethChangePercent,
            risk: copy(t, response.widgetData.risk),
          },
        }
      : {}),
  };
}

export function createTelegramCompanionViewModel(t: FrontendTranslator): TelegramCompanionPageViewModel {
  return {
    header: {
      title: copy(t, telegramData.header.title),
      status: copy(t, telegramData.header.status),
    },
    input: {
      placeholder: copy(t, telegramData.input.placeholder),
      micLabel: copy(t, telegramData.input.micLabel),
      sendLabel: copy(t, telegramData.input.sendLabel),
    },
    typingIndicator: copy(t, telegramData.typingIndicator),
    footerContext: copy(t, telegramData.footerContext),
    widgetLabels: {
      btcAlignment: copy(t, telegramData.widgetLabels.btcAlignment),
      ethAlignment: copy(t, telegramData.widgetLabels.ethAlignment),
      entropyRisk: copy(t, telegramData.widgetLabels.entropyRisk),
    },
    welcome: {
      text: copy(t, telegramData.welcome.text),
      role: copy(t, telegramData.welcome.role),
    },
  };
}

export function selectTelegramCompanionResponse(t: FrontendTranslator, input: string): TelegramCompanionResolvedResponse {
  return resolveResponse(t, selectCompanionResponse(input));
}
