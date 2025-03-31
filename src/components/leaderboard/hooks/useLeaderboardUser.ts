"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

export const useLeaderboardUser = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["leaderboard-user", userId],
    queryFn: async () => {
      const data = await fetch(`/api/user/${userId}`);
      if (!data.ok)
        throw new Error(
          `Ошибка при загрузке пользователя дли лидерборда ${userId}`
        );
      return data.json() as Promise<User>;
    },
    staleTime: 60 * 1000,
  });
};
