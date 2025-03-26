import { cn } from "@/lib/utils";
import React from "react";

export const ProfileLeaderboardPosition = () => {
  const place = 100;
  return (
    <div className="flex flex-col bg-muted/30 rounded-xl h-24 w-40 py-4 px-2 items-center justify-center">
      <p className="uppercase font-bold text-xs text-muted-foreground">
        RUSSIAN 15s
      </p>
      <h3
        className={cn(
          "text-4xl font-medium text-primary",
          place >= 10000 && "text-2xl",
          place >= 100_000_000 && "text-xl"
        )}
      >
        {place}st
      </h3>
      <p className="text-[0.6rem] text-muted-foreground">1% игроков</p>
    </div>
  );
};
