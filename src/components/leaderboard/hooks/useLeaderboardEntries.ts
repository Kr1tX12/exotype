"use client";

import { useQuery } from "@tanstack/react-query";
import { TestType } from "@prisma/client";
import { CacheLeaderboard } from "@/app/api/leaderboard/leaderboard.types";

export const useLeaderboardEntries = ({
  testType,
  testValue,
}: {
  testType: TestType;
  testValue: number;
}) => {
  return useQuery({
    queryKey: ["leaderboard-entries", testValue, testType],
    queryFn: async () => {
      const data = await fetch(
        `/api/leaderboard?testType=${testType}&testValue=${testValue}&take=${100}&skip=${0}`
      );
      if (!data.ok) throw new Error("Ошибка при загрузке лидербордов");
      return data.json() as Promise<CacheLeaderboard>;
    },
    staleTime: 60 * 1000,
  });
};
