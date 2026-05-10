import { useState, useEffect } from 'react';

function createInitialHistory(initialValue: number, volatility: number, intervalMs: number) {
  const now = new Date();

  return Array.from({ length: 20 }).map((_, i) => {
    const t = new Date(now.getTime() - (20 - i) * intervalMs);
    return {
      time: t.toTimeString().split(' ')[0],
      value: initialValue * (1 + (Math.random() - 0.5) * volatility * 5),
    };
  });
}

export function useLiveData(initialValue: number, volatility: number = 0.02, intervalMs: number = 1000) {
  const [value, setValue] = useState(initialValue);
  const [history, setHistory] = useState<{ time: string; value: number }[]>(() =>
    createInitialHistory(initialValue, volatility, intervalMs),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => {
        const change = current * (Math.random() - 0.5) * volatility;
        const next = current + change;
        
        setHistory((prev) => {
          const newHistory = [...prev.slice(1), { 
            time: new Date().toTimeString().split(' ')[0], 
            value: next 
          }];
          return newHistory;
        });

        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [initialValue, volatility, intervalMs]);

  return { value, history };
}
