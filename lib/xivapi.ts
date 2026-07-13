import { XivItem, XivApiSearchResponse } from '@/types';

const XIVAPI_BASE = 'https://v2.xivapi.com/api';

// 아이콘 경로(ui/icon/...)를 실제 이미지 URL로 바꿔주는 함수
// 실제 코딩할 때 브라우저에서 한 번 호출해보고 재확인이 필요
function buildIconUrl(iconPath: string): string {
  return `${XIVAPI_BASE}/asset?path=${encodeURIComponent(iconPath)}&format=png`;
}

// 아이템 이름으로 검색
export async function searchItems(query: string): Promise<XivItem[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    sheets: 'Item',
    query: `Name~"${query}"`,
    fields: 'Name,Icon,LevelItem',
  });

  const res = await fetch(`${XIVAPI_BASE}/search?${params}`);

  if (!res.ok) {
    throw new Error(`XIVAPI 검색 실패: ${res.status}`);
  }

  const data: XivApiSearchResponse = await res.json();

  return data.results.map((result) => ({
    rowId: result.row_id,
    name: result.fields.Name,
    iconUrl: buildIconUrl(result.fields.Icon.path),
    levelItem: result.fields.LevelItem?.value,
  }));
}

// 아이템 ID로 상세 정보 하나 가져오기
export async function getItem(rowId: number): Promise<XivItem> {
  const params = new URLSearchParams({
    fields: 'Name,Icon,LevelItem,Description',
  });

  const res = await fetch(`${XIVAPI_BASE}/sheet/Item/${rowId}?${params}`);

  if (!res.ok) {
    throw new Error(`XIVAPI 아이템 조회 실패: ${res.status}`);
  }

  const data = await res.json();

  return {
    rowId: data.row_id,
    name: data.fields.Name,
    iconUrl: buildIconUrl(data.fields.Icon.path),
    levelItem: data.fields.LevelItem?.value,
    description: data.fields.Description,
  };
}