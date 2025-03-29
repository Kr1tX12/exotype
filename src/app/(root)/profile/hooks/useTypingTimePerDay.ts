"use client";

import { TypingTimePerDay } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useTypingTimePerDay = () => {
  return useQuery({
    queryKey: ["typingTimePerDay"],
    queryFn: async () => {
      const res = await fetch("/api/typing-time-per-day/2025");
      if (!res.ok) throw new Error("Ошибка при загрузке typingTimePerDay");
      return res.json() as Promise<TypingTimePerDay[]>;
    },
    staleTime: 15 * 1000,
  });
};
