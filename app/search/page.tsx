'use client';

import { useState } from 'react';
import { useItemSearch } from '@/hooks/useItemSearch';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { ItemCard } from '@/components/market/ItemCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { items, isLoading, error } = useItemSearch(query);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-1 text-xl font-semibold text-gray-900">아이템 검색</h1>
      <p className="mb-6 text-sm text-gray-500">
        아이템 이름을 입력하면 서버별 시세를 확인할 수 있어요.
      </p>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="예: Dragon Leather"
        autoFocus
      />

      <div className="mt-6 space-y-2">
        {/* 1. 아직 아무것도 검색 안 한 상태 */}
        {!query.trim() && (
          <p className="py-10 text-center text-sm text-gray-400">
            검색어를 입력해주세요
          </p>
        )}

        {/* 2. 로딩 중 — 스켈레톤 3개 보여주기 */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}

        {/* 3. 에러 발생 */}
        {error && (
          <p className="py-10 text-center text-sm text-red-500">{error}</p>
        )}

        {/* 4. 검색은 했는데 결과 없음 */}
        {!isLoading && !error && query.trim() && items.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">
            검색 결과가 없어요
          </p>
        )}

        {/* 5. 결과 목록 */}
        {!isLoading &&
          items.map((item) => <ItemCard key={item.rowId} item={item} />)}
      </div>
    </div>
  );
}