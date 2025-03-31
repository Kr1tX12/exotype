'use client';

import React from "react";
import { useLeaderboardEntries } from "../../hooks/useLeaderboardEntries";
import { TestType } from "@prisma/client";

export const LeaderboardContent = ({
  testType,
  testValue,
}: {
  testType: TestType;
  testValue: number;
}) => {
  const {data: leaderboardEntries, isLoading, error} = useLeaderboardEntries({ testType, testValue });

  console.log(leaderboardEntries)
  return (
    <div className="bg-muted/30 rounded-xl size-full flex flex-col">
      <div className="flex flex-col gap-2"></div>
    </div>
  );
};
