export interface XivItem {
  rowId: number;          // 아이템 고유 ID 
  name: string;            // 아이템 이름
  iconUrl: string;         // 아이콘 이미지 전체 URL 
  levelItem?: number;      // 아이템 레벨 (없는 아이템도 있어서 선택적)
  description?: string;    // 아이템 설명
}

export interface XivApiSearchResponse {
  results: XivApiSearchResult[];
}

export interface XivApiSearchResult {
  score: number;
  sheet: string;           // "Item" 같은 카테고리 이름
  row_id: number;
  fields: {
    Name: string;
    Icon: {
      id: number;
      path: string;        // 아이콘 이미지 경로
    };
    LevelItem?: number;
    Description?: string;
  };
}