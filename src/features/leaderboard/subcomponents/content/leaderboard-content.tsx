"use client";

import { useEffect, useState } from "react";
import { useLeaderboardEntries } from "../../hooks/useLeaderboardEntries";
import { LeaderboardEntry } from "./leaderboard-entry";
import { cn } from "@/lib/utils";
import { useLeaderboardData } from "../leaderboard-provider";
import { motion } from "framer-motion";
import { LEADERBOARD_ANIMATION_DURATION } from "../../constants/leaderboard.constants";
import { Skeleton } from "@/components/ui/skeleton";

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

  const [displayedLeaderboardData, setDisplayedLeaderboardData] =
    useState({leaderboardEntries, isLoading, error});
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(0);

    const timeout = setTimeout(() => {
      setDisplayedLeaderboardData({leaderboardEntries, isLoading, error});
      setOpacity(1);
    }, LEADERBOARD_ANIMATION_DURATION);
    return () => clearTimeout(timeout);
  }, [testValue, testType, leaderboardEntries, isLoading, error]);

  useEffect(() => {
    if (leaderboardEntries?.timestamp)
      dispatch({
        type: "SET_UPDATED_AT",
        payload: leaderboardEntries.timestamp,
      });
  }, [leaderboardEntries, dispatch]);

  if (displayedLeaderboardData.isLoading) {
    return (
      <motion.div
        animate={{ opacity }}
        transition={{ duration: LEADERBOARD_ANIMATION_DURATION / 1000 }}
        className="size-full overflow-y-auto"
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton className="w-full h-20 rounded-xl mb-20" key={index} />
        ))}
      </motion.div>
    );
  }
  if (displayedLeaderboardData.error) {
    return <div>Error</div>;
  }
  if (!displayedLeaderboardData.leaderboardEntries?.data || displayedLeaderboardData.leaderboardEntries.data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <motion.div
      animate={{ opacity }}
      transition={{ duration: LEADERBOARD_ANIMATION_DURATION / 1000 }}
      className={cn("size-full flex flex-col", className)}
    >
      <div className="overflow-y-auto">
        {displayedLeaderboardData?.leaderboardEntries?.data
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
    </motion.div>
  );
};
