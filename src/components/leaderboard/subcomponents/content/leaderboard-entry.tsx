import {
  CacheLeaderboard,
  CacheLeaderboardEntry,
} from "@/app/api/leaderboard/leaderboard.types";
import React from "react";
import { useLeaderboardUser } from "../../hooks/useLeaderboardUser";
import { useLeaderboardTest } from "../../hooks/useLeaderboardTest";

export const LeaderboardEntry = ({
  leaderboardEntry,
}: {
  leaderboardEntry: CacheLeaderboardEntry;
}) => {
  const {
    data: user,
    isUserLoading,
    userError,
  } = useLeaderboardUser({ userId: leaderboardEntry.userId });
  const {
    data: test,
    isTestLoading,
    testError,
  } = useLeaderboardTest({ testId: leaderboardEntry.testId });
  
  if (isUserLoading || isTestLoading) {
    
  }
  return <div className="bg-muted/30 rounded-xl px-4 py-4"></div>;
};
