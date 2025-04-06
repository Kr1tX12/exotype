import { queryOptions } from "@tanstack/react-query";
import { ReplaceBigIntRecordTest, ReplaceBigIntTest } from "./test.model";

export const TestAPI = {
  getLastTestsQueryOptions: () =>
    queryOptions({
      queryKey: ["lastUserTests"],
      queryFn: async () => {
        const res = await fetch("/api/tests");
        if (!res.ok) throw new Error("Ошибка при загрузке тестов");
        return res.json() as Promise<ReplaceBigIntTest[]>;
      },
      staleTime: 15 * 1000,
    }),
  getTestRecordsQueryOptions: () =>
    queryOptions({
      queryKey: ["test-records"],
      queryFn: async () => {
        const res = await fetch("/api/test-records");
        if (!res.ok) throw new Error("Ошибка при загрузке рекордов");
        return res.json() as Promise<ReplaceBigIntRecordTest[]>;
      },
      staleTime: 15 * 1000,
    }),
};
