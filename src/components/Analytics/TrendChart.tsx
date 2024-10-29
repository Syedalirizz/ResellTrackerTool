import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { MarketTrend } from '../../types';

interface TrendChartProps {
  data: MarketTrend[];
  platform: string;
}

export default function TrendChart({ data, platform }: TrendChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{platform} Price Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}