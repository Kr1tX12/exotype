"use client";

import { useEffect } from "react";
import { useLeaderboardEntries } from "../../hooks/useLeaderboardEntries";
import { LeaderboardEntry } from "./leaderboard-entry";
import { cn } from "@/lib/utils";
import { useLeaderboardData } from "../leaderboard-provider";

export const LeaderboardContent = ({ className }: { className?: string }) => {
  const {
    state: { testValue, testType },
    dispatch,
  } = useLeaderboardData();

  const {
    data: leaderboardEntries,
    isLoading,
    error,
  } = useLeaderboardEntries({ testType, testValue });

  useEffect(() => {
    if (leaderboardEntries?.timestamp)
      dispatch({
        type: "SET_UPDATED_AT",
        payload: leaderboardEntries.timestamp,
      });
  }, [leaderboardEntries, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (!leaderboardEntries?.data || leaderboardEntries.data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className={cn("size-full flex flex-col", className)}>
      <div className="overflow-y-auto">
        {leaderboardEntries.data
          .concat(
            leaderboardEntries.data,
            leaderboardEntries.data,
            leaderboardEntries.data,
            leaderboardEntries.data,
            leaderboardEntries.data,
            leaderboardEntries.data
          )
          .map((entry, index) => (
            <LeaderboardEntry
              className={cn(
                index % 2 === 0
                  ? "bg-muted/30 hover:bg-muted/40"
                  : "hover:bg-muted/10"
              )}
              place={index + 1}
              leaderboardEntry={entry}
              key={`${entry.test.id}-${index}`}
            />
          ))}
      </div>
    </div>
  );
};
