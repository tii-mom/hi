import { useTranslation } from 'react-i18next';
import { createTerminalViewModel } from '@/app/services/terminal';
import { useLiveData } from '../../../hooks/useLiveData';

export function useTerminalViewModel() {
  const { t } = useTranslation();
  const { value: btcPrice, history: btcHistory } = useLiveData(64250.0, 0.005, 1500);
  return createTerminalViewModel({ btcPrice, btcHistory, t });
}
