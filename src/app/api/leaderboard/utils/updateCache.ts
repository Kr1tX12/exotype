import { TestType } from "@prisma/client";
import { fetchLeaderboard } from "./fetchLeaderboard";
import { kv } from "@vercel/kv";
import { packCache } from "./packCache";

export async function updateCache(
  cacheKey: string,
  testType: TestType,
  testValue: number,
  take: number,
  skip: number
) {
  try {
    const result = await fetchLeaderboard(testType, testValue, take, skip);
    if (!result.ok) {
      throw new Error(
        "Не получилось составить лидерборд для обновления кэша: " + result.error
      );
    }

    const payload = packCache(result.data ?? []);
    await kv.set(cacheKey, payload, { ex: 24 * 60 * 60 * 1000 }); // Кэш хранится максимум один день.
  } catch (error) {
    console.error("Ошибка при обновлении кэша:", error);
  }
}
