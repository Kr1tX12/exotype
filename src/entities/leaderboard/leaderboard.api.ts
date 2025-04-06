import { TestType } from "@prisma/client";
import { CacheLeaderboard } from "./leaderboard.model";
import { queryOptions } from "@tanstack/react-query";

export const LeaderboardApi = {
  getLeaderboardEntriesQueryOptions: ({
    testType,
    testValue,
  }: {
    testType: TestType;
    testValue: number;
  }) =>
    queryOptions({
      queryKey: ["leaderboard-entries", testValue, testType],
      queryFn: async () => {
        const data = await fetch(
          `/api/leaderboard?testType=${testType}&testValue=${testValue}&take=${100}&skip=${0}`
        );
        if (!data.ok) throw new Error("Ошибка при загрузке лидербордов");
        return data.json() as Promise<CacheLeaderboard>;
      },
      staleTime: 60 * 1000,
    }),
};
