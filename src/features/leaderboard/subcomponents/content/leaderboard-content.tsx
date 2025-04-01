"use client";

import React from "react";
import { useLeaderboardEntries } from "../../hooks/useLeaderboardEntries";
import { TestType } from "@prisma/client";
import { LeaderboardEntry } from "./leaderboard-entry";

export const LeaderboardContent = ({
  testType,
  testValue,
}: {
  testType: TestType;
  testValue: number;
}) => {
  const {
    data: leaderboardEntries,
    isLoading,
    error,
  } = useLeaderboardEntries({ testType, testValue });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (!leaderboardEntries?.data || leaderboardEntries.data.length === 0) {
    console.log(leaderboardEntries);
    return <div>No data</div>
  }

  return (
    <div className="size-full flex flex-col">
      <div className="flex flex-col gap-2">
        {leaderboardEntries?.data.map((entry) => (
          <LeaderboardEntry leaderboardEntry={entry} key={entry.test.id} />
        ))}
      </div>
    </div>
  );
};
