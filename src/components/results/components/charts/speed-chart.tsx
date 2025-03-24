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
    color: "hsl(var(--chart1))",
  },
  rawWpm: {
    label: "Raw WPM",
    color: "hsl(var(--chart2))",
  },
} satisfies ChartConfig;

export const SpeedChart = () => {
  const { wpmHistory, rawWpmHistory } = useStore((state) => state.stats);

  const chartData = wpmHistory
    .map((wpm, index) => {
      return {
        wpm: wpm,
        rawWpm: rawWpmHistory[index],
        time: index + 1,
      };
    });

  const aggregateData = (data: typeof chartData) => {
    const maxDataPoints = 25; // Максимальное количество точек для отображения
    const dataLength = data.length;

    // Если данных меньше 100, то возвращаем их без изменений
    if (dataLength <= maxDataPoints) {
      return data;
    }

    // Если данных больше 100, то агрегируем
    const step = Math.floor(dataLength / maxDataPoints);
    const aggregated = [];
    for (let i = 0; i < dataLength; i += step) {
      const subset = data.slice(i, i + step);
      const aggregatedPoint = {
        time: subset[0].time, // Сохраняем первое время
        wpm: subset.reduce((sum, point) => sum + point.wpm, 0) / subset.length,
        rawWpm:
          subset.reduce((sum, point) => sum + point.rawWpm, 0) / subset.length,
      };
      aggregated.push(aggregatedPoint);
    }
    return aggregated;
  };

  const displayedData = aggregateData(chartData);
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={displayedData}>
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
          fillOpacity={0.01}
          stroke="var(--color-rawWpm)"
          strokeWidth={2}
          dot={{
            r: 3,
            stroke: "var(--color-rawWpm)",
            strokeWidth: 3,
          }}
          activeDot={{
            r: 6,
            stroke: "var(--color-rawWpm)",
            strokeWidth: 3,
          }}
          stackId="a"
          isAnimationActive={false}
        />
        <Area
          dataKey="wpm"
          type="monotone"
          dot={{
            r: 3,
            stroke: "var(--color-wpm)",
            strokeWidth: 3,
          }}
          activeDot={{
            r: 6,
            stroke: "var(--color-wpm)",
            strokeWidth: 3,
          }}
          fill="var(--color-wpm)"
          fillOpacity={0.01}
          stroke="var(--color-wpm)"
          strokeWidth={2}
          stackId="b"
          isAnimationActive={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
