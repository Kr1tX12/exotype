"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

export const WpmChart = ({
  wpmHistory,
  rawWpmHistory,
}: {
  wpmHistory: number[];
  rawWpmHistory?: number[];
}) => {
  const chartData = wpmHistory.map((wpm, index) => {
    return {
      wpm: wpm,
      rawWpm: rawWpmHistory ? rawWpmHistory[index] : 0,
      time: index + 1,
    };
  });

  const aggregateData = (data: typeof chartData) => {
    const maxDataPoints = 25;
    const dataLength = data.length;

    if (dataLength <= maxDataPoints) {
      return data;
    }

    const step = Math.floor(dataLength / maxDataPoints);
    const aggregated = [];
    for (let i = 0; i < dataLength; i += step) {
      const subset = data.slice(i, i + step);

      const aggregatedPoint = {
        time: subset[0].time,
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
        
        {rawWpmHistory && (
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
        )}

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
