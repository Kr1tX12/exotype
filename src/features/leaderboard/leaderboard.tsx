"use client";

import { LeaderboardHeader } from "./subcomponents/header/leaderboard-header";
import { LeaderboardLanguagePicker } from "./subcomponents/leaderboard-language-picker/leaderboard-language-picker";
import { LeaderboardContent } from "./subcomponents/content/leaderboard-content";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Leaderboard = ({ isModal = false }: { isModal?: boolean }) => {
  const [updatedAt, setUpdatedAt] = useState(-1);
  const onChangeUpdatedAt = (newUpdatedAt: number) => {
    setUpdatedAt(newUpdatedAt);
  };
  return (
    <div className={cn(isModal || "sm:container")}>
      <div
        className={cn(
          "sm:rounded-xl px-8 py-4",
          isModal || "bg-muted/20 border border-border"
        )}
      >
        <div className="flex flex-col gap-8">
          <LeaderboardHeader updatedAt={updatedAt} />
          <div className="flex gap-8">
            <LeaderboardLanguagePicker />
            <LeaderboardContent
              onChangeUpdatedAt={onChangeUpdatedAt}
              testType={"WORDS"}
              testValue={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
