import { SimplifiedTest } from "@/types/types";
import React from "react";
import { TestStatItem } from "./test-stat-item";
import { generateDbTestStats } from "@/lib/utils/db-test-stats-generator";

export const TestStatsGroup = ({ test }: { test: SimplifiedTest }) => {
  const { wpm, accuracy, consistency, mistakes } = generateDbTestStats(test);

  return (
    <div className="flex gap-4 items-center">
      <TestStatItem label="WPM" value={Math.round(wpm)} />
      <TestStatItem label="Acc" value={accuracy} />
      <TestStatItem label="Consistency" value={consistency} />
      <TestStatItem label="Mistakes" value={mistakes} />
    </div>
  );
};
