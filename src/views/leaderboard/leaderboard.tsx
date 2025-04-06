"use client";

import { LeaderboardHeader } from "./subcomponents/header/leaderboard-header";
import { cn } from "@/shared/lib/utils";
import { LeaderboardProvider } from "./subcomponents/leaderboard-provider";
import { LeaderboardContentLayout } from "./subcomponents/content/leaderboard-content-layout";

export const Leaderboard = ({ isModal = false }: { isModal?: boolean }) => {
  return (
    <LeaderboardProvider>
      <div className={cn(isModal || "sm:container", "size-full")}>
        <div
          className={cn(
            "sm:rounded-xl px-8 py-4",
            isModal || "bg-muted/20 size-full"
          )}
        >
          <div className="flex flex-col gap-8 h-full">
            <LeaderboardHeader />
            <LeaderboardContentLayout isModal={isModal} />
          </div>
        </div>
      </div>
    </LeaderboardProvider>
  );
};
