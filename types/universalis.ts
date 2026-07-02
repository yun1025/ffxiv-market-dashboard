// 거래 게시판에 올라온 매물 하나
export interface MarketListing {
  listingId: string;
  pricePerUnit: number;
  quantity: number;
  total: number;
  hq: boolean;              // High Quality(고품질) 여부
  worldName: string;
  retainerName: string;     // 판매자(리테이너) 이름
}

// 과거에 실제로 팔린 거래 기록 하나
export interface SaleHistoryEntry {
  hq: boolean;
  pricePerUnit: number;
  quantity: number;
  total: number;
  timestamp: number;        // 유닉스 타임스탬프(초 단위)
  worldName?: string;
}

// 특정 아이템의 서버별 시세 데이터 (getMarketData 함수가 반환할 최종 모양)
export interface WorldMarketData {
  itemId: number;
  worldName: string;
  listings: MarketListing[];
  currentAveragePrice: number;
  lastUploadTime: number;    // 이 데이터가 언제 마지막으로 갱신됐는지
}


// ─────────────────────────────────────────────
// Universalis API가 실제로 돌려주는 원본 응답 모양
// ─────────────────────────────────────────────

// GET /api/v2/{world}/{itemId}
export interface UniversalisCurrentDataResponse {
  itemID: number;
  worldName?: string;
  listings: {
    pricePerUnit: number;
    quantity: number;
    total: number;
    hq: boolean;
    worldName: string;
    retainerName: string;
    listingID: string;
  }[];
  currentAveragePrice: number;
  lastUploadTime: number;
}

// GET /api/v2/history/{world}/{itemId}
export interface UniversalisHistoryResponse {
  itemID: number;
  worldName?: string;
  entries: {
    hq: boolean;
    pricePerUnit: number;
    quantity: number;
    total: number;
    timestamp: number;
    worldName?: string;
  }[];
}