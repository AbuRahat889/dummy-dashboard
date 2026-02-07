"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "../ui/chart";

interface ChartProps {
  chartData: Array<{ month: string; revenue: number; users: number }>;
}

const Chart = ({ chartData }: ChartProps) => {
  const chartConfig = {
    value: { label: "Revenue", color: "#7b61ff" },
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <ChartTooltipContent
          active={active}
          payload={payload}
          label={label}
          labelFormatter={() => label}
          formatter={(value) => [value.toLocaleString(), "Revenue"]}
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6">
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 8,
                stroke: "var(--color-value)",
                strokeWidth: 2,
                fill: "white",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default Chart;
