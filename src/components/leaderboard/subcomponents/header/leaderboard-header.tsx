import React from "react";
import { LeaderboardTypeTabs } from "./leaderboard-type-tabs";

export const LeaderboardHeader = () => {
  return (
    <div className="flex gap-8 justify-between items-center">
      <h1 className="text-3xl font-semibold">Leaderboard</h1>
      <LeaderboardTypeTabs />
    </div>
  );
};
