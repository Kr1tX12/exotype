import React from "react";
import { TestStatItem } from "./test-stat-item";
import { generateDbTestStats } from "@/shared/lib/utils/db-test-stats-generator";
import { SimplifiedTest } from "@/entities/test/test.model";

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
