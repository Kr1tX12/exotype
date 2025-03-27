"use client";

import { useQuery } from "@tanstack/react-query";

export const useLastUserTests = () => {
  return useQuery({
    queryKey: ["lastUserTests"],
    queryFn: async () => {
      const res = await fetch("/api/tests");
      if (!res.ok) throw new Error("Ошибка при загрузке тестов");
      return res.json();
    },
    staleTime: 15 * 1000,
  });
};
