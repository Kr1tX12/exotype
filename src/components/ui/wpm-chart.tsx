import ReactECharts from "echarts-for-react";
import { useTheme } from "../theme-provider";
import { getThemeByName } from "@/lib/utils/getThemeByName";
import * as echarts from "echarts/core";

const hslToHex = (hsl: string, opacity: number = 1): string => {
  let h: number, s: number, l: number;

  // Если формат "hsl(0, 0%, 10%)"
  const hslMatch = hsl.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
  if (hslMatch) {
    [h, s, l] = hslMatch.slice(1).map(Number);
  } else {
    // Если формат "0 0% 10%"
    [h, s, l] = hsl.split(" ").map((v) => parseFloat(v));
  }

  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  // Формируем цвет в формате rgba с учетом opacity
  const hexColor = `#${f(0)}${f(8)}${f(4)}`;

  if (opacity < 1) {
    return `${hexColor}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
  }

  return hexColor;
};

const chartConfig = {
  wpm: {
    label: "WPM",
    color: "colorful",
  },
  rawWpm: {
    label: "Raw WPM",
    color: "colorful2",
  },
} as const;

type ChartData = {
  time: number;
  wpm: number;
  rawWpm: number;
};

type WpmChartProps = {
  wpmHistory: number[];
  rawWpmHistory?: number[];
  label?: string;
};

export const WpmChart: React.FC<WpmChartProps> = ({
  wpmHistory,
  rawWpmHistory,
  label = "сек.",
}) => {
  const { theme: themeName } = useTheme();
  const theme = getThemeByName(themeName);
  const chartData: ChartData[] = wpmHistory.map((wpm, index) => ({
    time: index + 1,
    wpm: Math.round(wpm),
    rawWpm: Math.round(rawWpmHistory ? rawWpmHistory[index] ?? 0 : 0),
  }));

  const aggregateData = (data: ChartData[]): ChartData[] => {
    const maxDataPoints = 100;
    if (data.length <= maxDataPoints) return data;
    const step = Math.floor(data.length / maxDataPoints);
    return Array.from({ length: maxDataPoints }, (_, i) => {
      const subset = data.slice(i * step, (i + 1) * step);
      return {
        time: subset[0].time,
        wpm: subset.reduce((sum, p) => sum + p.wpm, 0) / subset.length,
        rawWpm: subset.reduce((sum, p) => sum + p.rawWpm, 0) / subset.length,
      };
    });
  };

  const displayedData = aggregateData(chartData);

  console.log(chartConfig);

  const options = {
    tooltip: {
      trigger: "axis",
      backgroundColor: theme ? hslToHex(theme.colors.tooltip) : "#fff",
      borderWidth: 0,
      axisPointer: {
        lineStyle: {
          color: theme
            ? hslToHex(theme?.colors["muted-foreground"], 0.3)
            : "#fff",
          shadowColor: theme
            ? hslToHex(theme?.colors["muted-foreground"], 0.3)
            : "#fff",
          shadowBlur: 10,
        },
        label: {
          formatter: (params: { value: number }) => {
            return `${params.value} ${label}`;
          },
        },
      },
      textStyle: {
        color: theme ? hslToHex(theme?.colors.foreground) : "#fff",
      },
      extraCssText:
        "box-shadow: none; border: 1px solid hsl(var(--primary)); border-radius: 10px",
    },
    legend: { show: false },
    min: 1,
    xAxis: {
      boundaryGap: false,
      type: "category",
      axisLabel: {
        color: theme ? hslToHex(theme?.colors["muted-foreground"]) : "#fff",
        formatter: (value: number) => {
          return `${value} ${label}`;
        },
      },
      data: displayedData.map((d) => d.time),
      axisLine: {
        show: false,
        color: theme ? hslToHex(theme?.colors["muted-foreground"]) : "#fff",
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      minInterval: Math.max(...(rawWpmHistory ?? wpmHistory)) > 80 ? 40 : 20,
      splitLine: {
        lineStyle: {
          color: theme ? hslToHex(theme?.colors.muted) : "#fff",
        },
      },
      axisLabel: {
        color: theme ? hslToHex(theme?.colors["muted-foreground"]) : "#fff",
      },
      axisLine: {
        color: theme ? hslToHex(theme?.colors["muted-foreground"]) : "#fff",
        symbol: "arrow",
      },
    },
    axisPointer: {
      lineStyle: {
        color: theme
          ? hslToHex(theme?.colors["muted-foreground"], 0.3)
          : "#fff",
        type: "solid",
      },
    },
    color: [chartConfig.wpm.color, chartConfig.rawWpm.color].map((color) =>
      theme ? hslToHex(theme.colors[color]) : "#fff"
    ),
    grid: {
      left: 70,
      right: 40,
      top: 25,
      bottom: 25,
      shadowColor: theme ? hslToHex(theme?.colors["primary"], 0.3) : "#fff",
    },
    series: [
      {
        name: "WPM",
        type: "line",
        data: displayedData.map((d) => d.wpm),
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        z: 100,
        itemStyle: {
          borderColor:
            theme && !theme.isDark
              ? hslToHex(theme?.colors.background)
              : undefined,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: theme
                ? hslToHex(theme.colors[chartConfig.wpm.color], 0.08)
                : "#fff",
            },
            {
              offset: 0.4,
              color: theme
                ? hslToHex(theme.colors[chartConfig.wpm.color], 0)
                : "#fff",
            },
          ]),
        },
      },
      rawWpmHistory && {
        name: "Raw WPM",
        type: "line",
        data: displayedData.map((d) => d.rawWpm),
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        z: 50,
        itemStyle: {
          borderColor: theme ? hslToHex(theme?.colors.background) : "#fff",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: theme
                ? hslToHex(theme.colors[chartConfig.rawWpm.color], 0.08)
                : "#fff",
            },
            {
              offset: 0.4,
              color: theme
                ? hslToHex(theme.colors[chartConfig.rawWpm.color], 0)
                : "#fff",
            },
          ]),
        },
      },
    ].filter(Boolean),
  };

  return (
    <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />
  );
};
