import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { XivItem } from '@/types';

interface ItemCardProps {
  item: XivItem;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/item/${item.rowId}`}>
      <Card className="flex items-center gap-3 transition hover:border-blue-300 hover:shadow-sm">
        <Image
          src={item.iconUrl}
          alt={item.name}
          width={40}
          height={40}
          className="rounded"
        />
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          {item.levelItem !== undefined && (
            <p className="text-xs text-gray-500">아이템 레벨 {item.levelItem}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}