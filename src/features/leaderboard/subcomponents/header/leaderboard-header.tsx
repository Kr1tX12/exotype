import React from "react";
import { LeaderboardTypeTabs } from "./leaderboard-type-tabs";
import { TimeAgoText } from "@/components/ui/time-ago-text";
import { Tooltip } from "@/components/ui/tooltip";

export const LeaderboardHeader = ({ updatedAt }: { updatedAt: number }) => {
  return (
    <div className="flex gap-8 justify-between items-center">
      <div>
        <h1 className="text-3xl font-semibold">Leaderboard </h1>
        <p className="text-muted-foreground text-xs">
          Последнее обновление:{" "}
          <Tooltip text="Обновление через дохуя времени">
            <TimeAgoText ms={updatedAt} />
          </Tooltip>
        </p>
      </div>
      <LeaderboardTypeTabs />
    </div>
  );
};
