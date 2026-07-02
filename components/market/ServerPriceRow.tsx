import { Badge } from '@/components/ui/Badge';
import { formatGil, formatRelativeTime } from '@/lib/utils';
import { WorldMarketData } from '@/types';

interface ServerPriceRowProps {
  data: WorldMarketData;
  isCheapest: boolean;
}

export function ServerPriceRow({ data, isCheapest }: ServerPriceRowProps) {
  const cheapestListing = data.listings[0];

  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">{data.worldName}</span>
        {isCheapest && <Badge variant="hq">최저가</Badge>}
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {cheapestListing ? formatGil(cheapestListing.pricePerUnit) : '매물 없음'}
        </p>
        <p className="text-xs text-gray-400">
          {formatRelativeTime(data.lastUploadTime / 1000)}
        </p>
      </div>
    </div>
  );
}