import { cn } from "@/shared/lib/utils";
import React from "react";
import { LeaderboardTestSettings } from "../leaderboard-test-settings/leaderboard-test-settings";
import { LeaderboardContent } from "./leaderboard-content";

export const LeaderboardContentLayout = ({ isModal }: { isModal: boolean }) => {
  return (
    <div className="flex gap-8 items-stretch h-full">
      <LeaderboardTestSettings />
      <LeaderboardContent
        className={cn(
          isModal
            ? "max-h-[calc(100vh_-_410px)]"
            : "max-h-[calc(100vh_-_350px)]"
        )}
      />
    </div>
  );
};
