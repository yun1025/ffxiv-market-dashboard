'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SaleHistoryEntry } from '@/types';
import { formatGil } from '@/lib/utils';

interface PriceHistoryChartProps {
  history: SaleHistoryEntry[];
}

export function PriceHistoryChart({ history }: PriceHistoryChartProps) {
  // Recharts는 "정렬된 배열"을 원해서, 오래된 거래부터 최신순으로 정리
  const chartData = [...history]
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((entry) => ({
      date: new Date(entry.timestamp * 1000).toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
      }),
      price: entry.pricePerUnit,
    }));

  if (chartData.length === 0) {
    return <p className="text-sm text-gray-400">거래 기록이 없어요.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" fontSize={12} stroke="#9ca3af" />
        <YAxis
          fontSize={12}
          stroke="#9ca3af"
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip formatter={(value: number) => formatGil(value)} />
        <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}