import { useState, useEffect } from 'react';
import { getMultiWorldPrices } from '@/lib/universalis';
import { WorldMarketData } from '@/types';

export function useMarketData(worlds: string[], itemId: number | null) {
  const [data, setData] = useState<WorldMarketData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) {
      setData([]);
      return;
    }

    const validItemId = itemId;

    let isCancelled = false;

    async function fetchPrices() {
      setIsLoading(true);
      setError(null);

      try {
        const results = await getMultiWorldPrices(worlds, validItemId);
        if (!isCancelled) {
          setData(results);
        }
      } catch (err) {
        if (!isCancelled) {
          setError('가격 정보를 가져오지 못했어요.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchPrices();

    return () => {
      isCancelled = true;
    };
  }, [worlds, itemId]);

  return { data, isLoading, error };
}