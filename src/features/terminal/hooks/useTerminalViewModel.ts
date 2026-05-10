import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createTerminalViewModel } from '@/app/services/terminal';
import { loadTerminalReadModel } from '@/app/services/readModels';
import { useReadModelResource } from '@/app/services/useReadModelResource';
import { useLiveData } from '../../../hooks/useLiveData';

export function useTerminalViewModel() {
  const { t, i18n } = useTranslation();
  const { value: btcPrice, history: btcHistory } = useLiveData(64250.0, 0.005, 1500);
  const fallback = createTerminalViewModel({ btcPrice, btcHistory, t });
  const load = useCallback(
    (context: Parameters<typeof loadTerminalReadModel>[2]['context']) =>
      loadTerminalReadModel(t, { btcPrice, btcHistory }, { context }),
    [btcHistory, btcPrice, t],
  );

  return useReadModelResource({
    fallback,
    load,
    dependencyKey: `${i18n.language}:${btcPrice}`,
  });
}
