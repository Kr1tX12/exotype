"use client";

import { TestRecord } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useTestRecords = () => {
  return useQuery({
    queryKey: ["test-records"],
    queryFn: async () => {
      const res = await fetch("/api/test-records");
      if (!res.ok) throw new Error("Ошибка при загрузке рекордов");
      return res.json() as Promise<TestRecord[]>;
    },
    staleTime: 15 * 1000,
  });
};
