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
  sheet: string;
  row_id: number;
  fields: {
    Name: string;
    Icon: {
      id: number;
      path: string;
      path_hr1?: string;
    };
    LevelItem?: {
      value: number;
      sheet: string;
      row_id: number;
    };
    Description?: string;
  };
}