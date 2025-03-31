"use client";

import { useQuery } from "@tanstack/react-query";
import { TestRecord } from "@prisma/client";

export const useLeaderboardTest = ({ testId }: { testId: string }) => {
  return useQuery({
    queryKey: ["leaderboard-test", testId],
    queryFn: async () => {
      const data = await fetch(`/api/test-records/${testId}`);
      if (!data.ok)
        throw new Error(`Ошибка при загрузке теста для лидерборда ${testId}`);
      return data.json() as Promise<TestRecord>;
    },
    staleTime: 60 * 1000,
  });
};
