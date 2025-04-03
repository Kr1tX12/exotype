import { LEADERBOARD_TEST_VALUES } from "@/features/leaderboard/constants/leaderboard.constants";
import React from "react";
import { useLeaderboardData } from "../../leaderboard-provider";
import { LeaderboardTestValueItem } from "./leaderboard-test-value-item";

export const LeaderboardTestValueSettings = () => {
  const { state } = useLeaderboardData();

  const testType = state.testType;

  const testValues = LEADERBOARD_TEST_VALUES[testType];

  return (
    <div className="flex flex-col gap-1">
      {testValues.map((testValue, index) => (
        <LeaderboardTestValueItem
          testValue={testValue.testValue}
          key={`${testValue.label}-${index}`}
        >
          {testValue.label}
        </LeaderboardTestValueItem>
      ))}
    </div>
  );
};
