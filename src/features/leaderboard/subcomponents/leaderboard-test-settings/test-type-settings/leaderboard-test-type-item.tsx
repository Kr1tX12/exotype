import { TestType } from "@prisma/client";
import React from "react";
import { useLeaderboardData } from "../../leaderboard-provider";
import { cn } from "@/lib/utils";
import { LEADERBOARD_TEST_VALUES } from "@/features/leaderboard/constants/leaderboard.constants";

export const LeaderboardTestTypeItem = ({
  testType,
  children,
}: {
  testType: TestType;
  children: string;
}) => {
  const {
    state: { testType: chosenTestType },
    dispatch,
  } = useLeaderboardData();

  const choose = () => {
    dispatch({ type: "SET_TEST_TYPE", payload: testType });
    dispatch({
      type: "SET_TEST_VALUE",
      payload: LEADERBOARD_TEST_VALUES[testType][0]?.testValue,
    });
  };

  const isChosen = testType === chosenTestType;

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
