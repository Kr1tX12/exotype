import { TypingPerDay } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";

export const TypingPerDayAPI = {
  getTypingPerDayQueryOptions: () =>
    queryOptions({
      queryKey: ["typingTimePerDay"],
      queryFn: async () => {
        const res = await fetch("/api/typing-per-day/2025");
        if (!res.ok) throw new Error("Ошибка при загрузке typingPerDay");
        return res.json() as Promise<TypingPerDay[]>;
      },
      staleTime: 15 * 1000,
    }),
};
