'use client';

import { use, useState, useEffect } from 'react';
import { getItem } from '@/lib/xivapi';
import { useMarketData } from '@/hooks/useMarketData';
import { useHistory } from '@/hooks/useHistory';
import { DEFAULT_WORLDS } from '@/lib/constants';
import { ServerPriceRow } from '@/components/market/ServerPriceRow';
import { ServerCompareChart } from '@/components/charts/ServerCompareChart';
import { PriceHistoryChart } from '@/components/charts/PriceHistoryChart';
import { Skeleton } from '@/components/ui/Skeleton';
import { XivItem } from '@/types';
import Image from 'next/image';

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Next.js 15부터 params가 Promise로 옴
  const itemId = Number(id);

  const [item, setItem] = useState<XivItem | null>(null);

  // 아이템 기본 정보(이름, 아이콘)는 페이지 진입 시 한 번만 가져오면 됨
  useEffect(() => {
    getItem(itemId).then(setItem).catch(console.error);
  }, [itemId]);

  const { data: marketData, isLoading: isMarketLoading } = useMarketData(
    DEFAULT_WORLDS,
    itemId
  );

  // 히스토리는 "가장 싼 서버" 기준으로 보여주기로 결정
  const cheapestWorld = marketData[0]?.worldName ?? null;
  const { history, isLoading: isHistoryLoading } = useHistory(
    cheapestWorld,
    itemId
  );

  const sortedMarketData = [...marketData].sort((a, b) => {
    const aPrice = a.listings[0]?.pricePerUnit ?? Infinity;
    const bPrice = b.listings[0]?.pricePerUnit ?? Infinity;
    return aPrice - bPrice;
  });
  const cheapestPrice = sortedMarketData[0]?.listings[0]?.pricePerUnit;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* 아이템 헤더 */}
      {item ? (
        <div className="mb-8 flex items-center gap-4">
          <Image src={item.iconUrl} alt={item.name} width={56} height={56} className="rounded" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{item.name}</h1>
            {item.levelItem !== undefined && (
              <p className="text-sm text-gray-500">아이템 레벨 {item.levelItem}</p>
            )}
          </div>
        </div>
      ) : (
        <Skeleton className="mb-8 h-14 w-64" />
      )}

      {/* 서버별 비교 차트 */}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-medium text-gray-700">서버별 최저가 비교</h2>
        {isMarketLoading ? (
          <Skeleton className="h-60 w-full" />
        ) : (
          <ServerCompareChart data={sortedMarketData} />
        )}
      </section>

      {/* 서버별 목록 */}
      <section className="mb-8 rounded-lg border border-gray-200 p-4">
        <h2 className="mb-2 text-sm font-medium text-gray-700">서버별 상세</h2>
        {isMarketLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : sortedMarketData.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">매물 정보를 찾을 수 없어요.</p>
        ) : (
          sortedMarketData.map((data) => (
            <ServerPriceRow
              key={data.worldName}
              data={data}
              isCheapest={data.listings[0]?.pricePerUnit === cheapestPrice}
            />
          ))
        )}
      </section>

      {/* 가격 추이 히스토리 */}
      <section>
        <h2 className="mb-3 text-sm font-medium text-gray-700">
          가격 추이 {cheapestWorld && `(${cheapestWorld} 기준)`}
        </h2>
        {isHistoryLoading ? (
          <Skeleton className="h-60 w-full" />
        ) : (
          <PriceHistoryChart history={history} />
        )}
      </section>
    </div>
  );
}