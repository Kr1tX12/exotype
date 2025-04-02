"use client";

import React, { useEffect } from "react";
import { useLeaderboardEntries } from "../../hooks/useLeaderboardEntries";
import { TestType } from "@prisma/client";
import { LeaderboardEntry } from "./leaderboard-entry";
import { cn } from "@/lib/utils";

export const LeaderboardContent = ({
  testType,
  testValue,
  onChangeUpdatedAt,
}: {
  testType: TestType;
  testValue: number;
  onChangeUpdatedAt: (newUpdatedAt: number) => void;
}) => {
  const {
    data: leaderboardEntries,
    isLoading,
    error,
  } = useLeaderboardEntries({ testType, testValue });

  useEffect(() => {
    if (leaderboardEntries?.timestamp)
      onChangeUpdatedAt(leaderboardEntries.timestamp);
  }, [leaderboardEntries, onChangeUpdatedAt]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (!leaderboardEntries?.data || leaderboardEntries.data.length === 0) {
    console.log(leaderboardEntries);
    return <div>No data</div>;
  }

  return (
    <div className="size-full flex flex-col h-full">
      <div className="overflow-y-auto">
        {leaderboardEntries.data.concat(leaderboardEntries.data, leaderboardEntries.data, leaderboardEntries.data, leaderboardEntries.data, leaderboardEntries.data, leaderboardEntries.data, leaderboardEntries.data, leaderboardEntries.data).map((entry, index) => (
          <LeaderboardEntry
            className={cn(index % 2 === 0 ? "bg-muted/30 hover:bg-muted/40" : "hover:bg-muted/10")}
            place={index + 1}
            leaderboardEntry={entry}
            key={entry.test.id}
          />
        ))}
      </div>
    </div>
  );
};
