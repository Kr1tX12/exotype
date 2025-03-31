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

  console.log(leaderboardEntries);
  return (
    <div className="bg-muted/30 rounded-xl size-full flex flex-col">
      <div className="flex flex-col gap-2">
        {leaderboardEntries?.data.map((entry) => (
          <LeaderboardEntry leaderboardEntry={entry} key={entry.testId} />
        ))}
      </div>
    </div>
  );
};
