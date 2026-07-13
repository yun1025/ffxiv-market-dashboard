'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { WorldMarketData } from '@/types';
import { formatGil } from '@/lib/utils';

interface ServerCompareChartProps {
  data: WorldMarketData[];
}

export function ServerCompareChart({ data }: ServerCompareChartProps) {
  const chartData = data
    .filter((d) => d.listings.length > 0)
    .map((d) => ({
      world: d.worldName,
      price: d.listings[0].pricePerUnit, // 이미 최저가순 정렬되어 있음
    }))
    .sort((a, b) => a.price - b.price);

  if (chartData.length === 0) {
    return <p className="text-sm text-gray-400">비교할 매물이 없어요.</p>;
  }

  const cheapestPrice = chartData[0].price;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="world" fontSize={12} stroke="#9ca3af" />
        <YAxis fontSize={12} stroke="#9ca3af" />
        <Tooltip formatter={(value: number) => formatGil(value)} />
        <Bar dataKey="price" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell
              key={entry.world}
              fill={entry.price === cheapestPrice ? '#3b82f6' : '#d1d5db'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}