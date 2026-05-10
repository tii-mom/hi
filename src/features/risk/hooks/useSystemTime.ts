import { useEffect, useState } from 'react';

function formatSystemTime(date: Date) {
  return date.toISOString().substring(11, 19);
}

export function useSystemTime(intervalMs = 1000) {
  const [systemTime, setSystemTime] = useState(() => formatSystemTime(new Date()));

  useEffect(() => {
    const updateSystemTime = () => setSystemTime(formatSystemTime(new Date()));
    updateSystemTime();

    const interval = window.setInterval(updateSystemTime, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs]);

  return systemTime;
}
