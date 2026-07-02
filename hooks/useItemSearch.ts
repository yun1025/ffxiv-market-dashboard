import { useState, useEffect } from 'react';
import { searchItems } from '@/lib/xivapi';
import { XivItem } from '@/types';

export function useItemSearch(query: string) {
  const [items, setItems] = useState<XivItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 검색어가 비어있으면 아무것도 안 하고 결과 비우기
    if (!query.trim()) {
      setItems([]);
      return;
    }

    // 타이핑 멈추고 400ms 후에 실제 검색 실행 (디바운스)
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchItems(query);
        setItems(results);
      } catch (err) {
        setError('검색 중 문제가 생겼어요. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    }, 400);

    // 다음 글자가 입력되면 이전 타이머는 취소
    return () => clearTimeout(timer);
  }, [query]);

  return { items, isLoading, error };
}