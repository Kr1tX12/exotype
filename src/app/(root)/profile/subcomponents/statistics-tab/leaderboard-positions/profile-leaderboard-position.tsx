import { cn, getEnglishOrdinal } from "@/lib/utils";
import { TestType } from "@prisma/client";
import React from "react";

export const ProfileLeaderboardPosition = ({
  rank,
  testValue,
  testType,
}: {
  rank: number;
  testValue: number;
  testType: TestType;
}) => {
  return (
    <div className="flex flex-col bg-muted/30 rounded-xl h-24 w-40 py-4 px-2 items-center justify-center">
      <p className="uppercase font-bold text-sm text-muted-foreground">
        {testValue}{" "}
        {(() => {
          switch (testType) {
            case "WORDS":
              return "words";
            case "TIME":
              return "sec";
            default:
              return "";
          }
        })()}
      </p>
      <h3
        className={cn(
          "text-4xl font-medium text-primary font-goblin-one",
          rank >= 10000 && "text-2xl",
          rank >= 100_000_000 && "text-xl"
        )}
      >
        {rank}{getEnglishOrdinal(rank)}
      </h3>
      <p className="text-[0.6rem] text-muted-foreground">1% игроков</p>
    </div>
  );
};
