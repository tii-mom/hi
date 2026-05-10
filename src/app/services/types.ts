export type ServiceMode = 'mock' | 'live';

export type ServiceHealth = 'ready' | 'unconfigured' | 'degraded';

export type AsyncResourceStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error' | 'offline' | 'stale' | 'unauthorized' | 'rate-limited';

export interface ServiceError {
  code: 'network' | 'unauthorized' | 'rate-limited' | 'not-found' | 'invalid-response' | 'unconfigured' | 'unknown';
  message: string;
  recoverable: boolean;
}

export interface ResourceMeta {
  source: ServiceMode;
  updatedAt?: string;
  staleAfterMs?: number;
}

export interface AsyncResource<T> {
  status: AsyncResourceStatus;
  data?: T;
  error?: ServiceError;
  meta: ResourceMeta;
}

export interface ServiceReadiness {
  mode: ServiceMode;
  health: ServiceHealth;
  reason: string;
}

export interface FrontendServiceContext {
  apiBaseUrl?: string;
  telegramBotUsername?: string;
  walletConnectProjectId?: string;
  now: () => Date;
  online: boolean;
}

export function createSuccessResource<T>(
  data: T,
  meta: ResourceMeta,
): AsyncResource<T> {
  const isEmpty = Array.isArray(data) && data.length === 0;

  return {
    status: isEmpty ? 'empty' : 'success',
    data,
    meta,
  };
}

export function createErrorResource<T>(
  error: ServiceError,
  meta: ResourceMeta,
): AsyncResource<T> {
  return {
    status: error.code === 'unauthorized' ? 'unauthorized' : error.code === 'rate-limited' ? 'rate-limited' : 'error',
    error,
    meta,
  };
}
