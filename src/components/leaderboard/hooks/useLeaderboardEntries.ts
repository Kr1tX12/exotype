'use client';

import { useQuery } from "@tanstack/react-query";
import { LeaderboardEntry } from "../types/leaderboard.types";
import { TestType } from "@prisma/client";

export const useLeaderboardEntries = ({
  testType,
  testValue,
}: {
  testType: TestType;
  testValue: number;
}) => {
  return useQuery({
    queryKey: ["leaderboard-entries"],
    queryFn: async () => {
      const data = await fetch("/api/leaderboards", {
        body: JSON.stringify({
          testType,
          testValue,
          take: 10,
          skip: 0,
        }),
      });
      if (!data.ok) throw new Error("Ошибка при загрузке лидербордов");
      return data.json() as Promise<LeaderboardEntry[]>;
    },
    staleTime: 60 * 1000,
  });
};
