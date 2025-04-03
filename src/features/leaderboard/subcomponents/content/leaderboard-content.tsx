"use client";

import { useLeaderboardEntries } from "../../hooks/useLeaderboardEntries";
import { LeaderboardEntry } from "./leaderboard-entry";
import { cn } from "@/lib/utils";
import { useLeaderboardData } from "../leaderboard-provider";
import { motion } from "framer-motion";
import { LEADERBOARD_ANIMATION_DURATION } from "../../constants/leaderboard.constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeaderboardContentAnimation } from "../../hooks/useLeaderboardContentAnimation";
import { useUpdateAt } from "../../hooks/useUpdateAt";

const getMotionProps = (opacity: number) => ({
  animate: { opacity },
  transition: { duration: LEADERBOARD_ANIMATION_DURATION / 1000 },
});

export const LeaderboardContent = ({ className }: { className?: string }) => {
  const {
    state: { testValue, testType },
  } = useLeaderboardData();
  const {
    data: leaderboardEntries,
    isLoading,
    error,
  } = useLeaderboardEntries({ testType, testValue });

  const { displayedLeaderboardData, opacity } = useLeaderboardContentAnimation({
    leaderboardEntries,
    isLoading,
    error,
  });

  useUpdateAt({ leaderboardEntries });

  if (displayedLeaderboardData.isLoading) {
    return (
      <motion.div
        {...getMotionProps(opacity)}
        className="size-full overflow-y-auto"
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton className="w-full h-20 rounded-xl mb-20" key={index} />
        ))}
      </motion.div>
    );
  }
  if (displayedLeaderboardData.error) {
    return (
      <motion.h1 {...getMotionProps(opacity)} className="text-wrong text-3xl">
        Error - {error?.message ?? "Unkown"}
      </motion.h1>
    );
  }
  if (
    !displayedLeaderboardData.leaderboardEntries?.data ||
    displayedLeaderboardData.leaderboardEntries.data.length === 0
  ) {
    return (
      <motion.h1
        {...getMotionProps(opacity)}
        className="text-3xl text-muted-foreground"
      >
        Рекорды не поставлены. Вы можете стать первым
      </motion.h1>
    );
  }

  return (
    <motion.div
      {...getMotionProps(opacity)}
      className={cn("size-full flex flex-col", className)}
    >
      <div className="overflow-y-auto">
        {displayedLeaderboardData?.leaderboardEntries?.data.map(
          (entry, index) => (
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
          )
        )}
      </div>
    </motion.div>
  );
};
