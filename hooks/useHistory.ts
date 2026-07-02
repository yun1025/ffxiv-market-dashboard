import { useState, useEffect } from 'react';
import { getHistory } from '@/lib/universalis';
import { SaleHistoryEntry } from '@/types';

export function useHistory(world: string | null, itemId: number | null) {
  const [history, setHistory] = useState<SaleHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!world || !itemId) {
      setHistory([]);
      return;
    }

    let isCancelled = false;

    async function fetchHistory() {
      setIsLoading(true);
      setError(null);

      try {
        const entries = await getHistory(world, itemId);
        if (!isCancelled) setHistory(entries);
      } catch (err) {
        if (!isCancelled) setError('거래 기록을 가져오지 못했어요.');
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchHistory();
    return () => { isCancelled = true; };
  }, [world, itemId]);

  return { history, isLoading, error };
}