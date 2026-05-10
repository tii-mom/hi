import type { FrontendServiceContext, ServiceReadiness } from './types';

function readEnvValue(key: keyof ImportMetaEnv): string | undefined {
  const value = import.meta.env[key];

  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export function createFrontendServiceContext(): FrontendServiceContext {
  return {
    apiBaseUrl: readEnvValue('VITE_HI_PROTOCOL_API_URL'),
    telegramBotUsername: readEnvValue('VITE_TELEGRAM_BOT_USERNAME'),
    walletConnectProjectId: readEnvValue('VITE_WALLETCONNECT_PROJECT_ID'),
    now: () => new Date(),
    online: typeof navigator === 'undefined' ? true : navigator.onLine,
  };
}

export function getServiceReadiness(context = createFrontendServiceContext()): ServiceReadiness {
  if (!context.apiBaseUrl) {
    return {
      mode: 'mock',
      health: 'unconfigured',
      reason: 'VITE_HI_PROTOCOL_API_URL is not configured; frontend services use local mock adapters.',
    };
  }

  return {
    mode: 'live',
    health: context.online ? 'ready' : 'degraded',
    reason: context.online ? 'Frontend services can reach the configured API boundary.' : 'Browser is offline.',
  };
}
