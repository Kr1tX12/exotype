import { useState, useEffect } from "react";
import { LeaderboardTypeTabs } from "./leaderboard-type-tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { TimeText } from "@/components/ui/time-text";
import { Loader2 } from "lucide-react";
import { useLeaderboardData } from "../leaderboard-provider";
import { Skeleton } from "@/components/ui/skeleton";

export const LeaderboardHeader = () => {
  const {
    state: { updatedAt },
  } = useLeaderboardData();

  const nextUpdateAt = updatedAt + 360000;
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-8 justify-between items-center">
      <div>
        <h1 className="text-3xl font-semibold">Leaderboard </h1>
        <Tooltip
          text={
            <p>
              {currentTime > nextUpdateAt ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="animate-spin size-4" /> Обновляется сейчас...{" "}
                </span>
              ) : (
                <span>
                  Следующее обновление через{" "}
                  <TimeText type="future">{nextUpdateAt}</TimeText>{" "}
                </span>
              )}
            </p>
          }
        >
          <div className="text-muted-foreground text-xs">
            {updatedAt ? (
              <>
                Последнее обновление:{" "}
                <TimeText type="timeAgo">{updatedAt}</TimeText>
              </>
            ) : (
              <Skeleton className="w-64 h-4" />
            )}
          </div>
        </Tooltip>
      </div>
      <LeaderboardTypeTabs />
    </div>
  );
};
