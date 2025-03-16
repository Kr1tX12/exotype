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
import { useStore } from "@/store/store";

const chartConfig = {
  wpm: {
    label: "WPM",
    color: "hsl(var(--chart-2))",
  },
  rawWpm: {
    label: "Raw WPM",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export const SpeedChart = () => {
  const { wpmHistory, rawWpmHistory } = useStore((state) => state.stats);

  const chartData = wpmHistory.map((wpm, index) => {
    return {
      wpm: wpm,
      rawWpm: rawWpmHistory[index],
      time: index + 1,
    };
  });
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={chartData}>
        <CartesianGrid />
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
          type="monotone"
          fill="var(--color-rawWpm)"
          fillOpacity={0.04}
          stroke="var(--color-rawWpm)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="wpm"
          type="monotone"
          fill="var(--color-wpm)"
          fillOpacity={0.04}
          stroke="var(--color-wpm)"
          strokeWidth={2}
          stackId="b"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
