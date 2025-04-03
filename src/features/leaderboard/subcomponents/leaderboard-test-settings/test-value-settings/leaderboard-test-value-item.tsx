import React, { ReactNode } from "react";
import { useLeaderboardData } from "../../leaderboard-provider";
import { cn } from "@/lib/utils";

export const LeaderboardTestValueItem = ({
  testValue,
  children,
}: {
  testValue: number;
  children: ReactNode;
}) => {
  const {
    state: { testValue: chosenTestValue },
    dispatch,
  } = useLeaderboardData();

  const choose = () => {
    dispatch({ type: "SET_TEST_VALUE", payload: testValue });
  };

  const isChosen = testValue === chosenTestValue;

  return (
    <div
      className={cn(
        "bg-muted/30 hover:bg-muted/40 hover:scale-[0.96] transition-all rounded-xl py-2 px-4 w-40 cursor-pointer grid place-content-center",
        isChosen ? "bg-primary hover:bg-primary/80 text-background" : ""
      )}
      onClick={choose}
    >
      {children}
    </div>
  );
};
