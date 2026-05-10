import { useEffect, useMemo, useState } from 'react';
import { createFrontendServiceContext } from './config';
import { wrapMockReadModel } from './contracts';
import type { AsyncResource, FrontendServiceContext } from './types';

interface UseReadModelResourceOptions<T> {
  fallback: T;
  load: (context: FrontendServiceContext) => Promise<AsyncResource<T>>;
  dependencyKey: string;
}

export function useReadModelResource<T>({ fallback, load, dependencyKey }: UseReadModelResourceOptions<T>) {
  const context = useMemo(() => createFrontendServiceContext(), []);
  const [resource, setResource] = useState<AsyncResource<T>>(() => wrapMockReadModel(fallback, context));

  useEffect(() => {
    let active = true;

    void load(context).then((nextResource) => {
      if (active) {
        setResource(nextResource);
      }
    });

    return () => {
      active = false;
    };
  }, [context, load, dependencyKey]);

  return {
    resource,
    data: resource.data ?? fallback,
    isLive: resource.meta.source === 'live',
    isDegraded: ['error', 'offline', 'stale', 'unauthorized', 'rate-limited'].includes(resource.status),
  };
}
