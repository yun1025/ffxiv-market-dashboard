import {
  WorldMarketData,
  SaleHistoryEntry,
  UniversalisCurrentDataResponse,
  UniversalisHistoryResponse,
} from '@/types';

const UNIVERSALIS_BASE = 'https://universalis.app/api/v2';

// 특정 서버(world)의 현재 매물 + 평균가 가져오기
export async function getMarketData(
  world: string,
  itemId: number
): Promise<WorldMarketData> {
  const res = await fetch(`${UNIVERSALIS_BASE}/${world}/${itemId}`);

  if (!res.ok) {
    throw new Error(`Universalis 시세 조회 실패: ${res.status}`);
  }

  const data: UniversalisCurrentDataResponse = await res.json();

  return {
    itemId: data.itemID,
    worldName: data.worldName ?? world,
    listings: data.listings.map((l) => ({
      listingId: l.listingID,
      pricePerUnit: l.pricePerUnit,
      quantity: l.quantity,
      total: l.total,
      hq: l.hq,
      worldName: l.worldName,
      retainerName: l.retainerName,
    })),
    currentAveragePrice: data.currentAveragePrice,
    lastUploadTime: data.lastUploadTime,
  };
}

// 여러 서버 가격을 한 번에 비교하고 싶을 때 쓰는 함수
export async function getMultiWorldPrices(
  worlds: string[],
  itemId: number
): Promise<WorldMarketData[]> {
  const results = await Promise.allSettled(
    worlds.map((world) => getMarketData(world, itemId))
  );

  // 한 서버가 실패해도 나머지는 살리기 위해 성공한 것만 걸러냄
  return results
    .filter((r): r is PromiseFulfilledResult<WorldMarketData> => r.status === 'fulfilled')
    .map((r) => r.value);
}

// 거래 히스토리 가져오기
export async function getHistory(
  world: string,
  itemId: number
): Promise<SaleHistoryEntry[]> {
  const res = await fetch(`${UNIVERSALIS_BASE}/history/${world}/${itemId}`);

  if (!res.ok) {
    throw new Error(`Universalis 히스토리 조회 실패: ${res.status}`);
  }

  const data: UniversalisHistoryResponse = await res.json();

  return data.entries.map((e) => ({
    hq: e.hq,
    pricePerUnit: e.pricePerUnit,
    quantity: e.quantity,
    total: e.total,
    timestamp: e.timestamp,
    worldName: e.worldName,
  }));
}