import type { AsyncResource, FrontendServiceContext, ServiceError } from './types';
import { createErrorResource } from './types';

export interface HttpClient {
  getJson: <T>(path: string, init?: RequestInit) => Promise<AsyncResource<T>>;
}

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, '');
}

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

function toServiceError(response: Response): ServiceError {
  if (response.status === 401 || response.status === 403) {
    return {
      code: 'unauthorized',
      message: 'The service rejected the current frontend session.',
      recoverable: true,
    };
  }

  if (response.status === 429) {
    return {
      code: 'rate-limited',
      message: 'The service is rate limiting this client.',
      recoverable: true,
    };
  }

  if (response.status === 404) {
    return {
      code: 'not-found',
      message: 'The requested resource was not found.',
      recoverable: false,
    };
  }

  return {
    code: 'unknown',
    message: `The service returned HTTP ${response.status}.`,
    recoverable: response.status >= 500,
  };
}

export function createHttpClient(context: FrontendServiceContext): HttpClient {
  return {
    async getJson<T>(path, init) {
      if (!context.apiBaseUrl) {
        return createErrorResource<T>(
          {
            code: 'unconfigured',
            message: 'VITE_HI_PROTOCOL_API_URL is not configured.',
            recoverable: false,
          },
          { source: 'mock' },
        );
      }

      if (!context.online) {
        return createErrorResource<T>(
          {
            code: 'network',
            message: 'Browser is offline.',
            recoverable: true,
          },
          { source: 'live' },
        );
      }

      try {
        const response = await fetch(`${normalizeBaseUrl(context.apiBaseUrl)}${normalizePath(path)}`, {
          ...init,
          headers: {
            Accept: 'application/json',
            ...init?.headers,
          },
        });

        if (!response.ok) {
          return createErrorResource<T>(toServiceError(response), { source: 'live' });
        }

        return {
          status: 'success',
          data: (await response.json()) as T,
          meta: {
            source: 'live',
            updatedAt: context.now().toISOString(),
          },
        };
      } catch (_error) {
        return createErrorResource<T>(
          {
            code: 'network',
            message: 'The frontend could not reach the configured API boundary.',
            recoverable: true,
          },
          { source: 'live' },
        );
      }
    },
  };
}
