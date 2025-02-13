"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = Array.from({ length: 25 }, (_, i) => {
  const baseWPM = 120 - i * (Math.random() * 3 + 1); // Реалистичное снижение WPM
  const fatigueFactor = Math.sin(i / 5) * 5 + Math.random() * 3; // Имитируем усталость
  return {
    time: `${i + 1}s`,
    wpm: Math.max(baseWPM - fatigueFactor, 60),
    rawWpm: Math.max(baseWPM + Math.random() * 8, 65), // Немного шума
  };
});

const chartConfig = {
  wpm: {
    label: "WPM",
    color: "hsl(var(--chart-5))",
  },
  rawWpm: {
    label: "Raw WPM",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const SpeedChart = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillWPM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-wpm)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-wpm)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillRawWPM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-rawWpm)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-rawWpm)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={16}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="rawWpm"
          type="natural"
          fill="url(#fillRawWPM)"
          stroke="var(--color-rawWpm)"
          stackId="a"
        />
        <Area
          dataKey="wpm"
          type="natural"
          fill="url(#fillWPM)"
          stroke="var(--color-wpm)"
          stackId="b"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
