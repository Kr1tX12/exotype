import { prisma } from "@/prisma/prisma-client";
import { TestType } from "@prisma/client";
import { kv } from "@vercel/kv";

const CACHE_DURATION = 300 * 1000;

async function fetchLeaderboard(
  testType: TestType,
  testValue: number,
  take: number,
  skip: number
) {
  return prisma.testRecord.findMany({
    where: {
      testType,
      testValue,
    },
    orderBy: {
      wpm: "desc",
    },
    take,
    skip,
  });
}

async function updateCache(
  cacheKey: string,
  testType: TestType,
  testValue: number,
  take: number,
  skip: number
) {
  try {
    const freshData = await fetchLeaderboard(testType, testValue, take, skip);
    const payload = {
      data: freshData,
      timestamp: Date.now(),
    };
    await kv.set(cacheKey, JSON.stringify(payload));
  } catch (error) {
    console.error("Ошибка при обновлении кэша:", error);
  }
}

export default async function GET(request: Request) {
  // Сука опять лидерборд делать блять

  // Чё там ему нужно нахуй
  const { testType, testValue, take, skip } = await request.json();
  // Ага понятно теперь бы запомнить блять
  const cacheKey = `leaderboard-${testType}-${testValue}-${take}-${skip}`;

  // Чё бля ищи старый кэш блять где он блять
  const cached = await kv.get<string>(cacheKey);

  if (cached) {
    // Еба нашёл сука блять
    const { data, timestamp } = JSON.parse(cached);

    // Кэш устарел блять ладно похуй потом обновим блять
    // старые данные тоже норм блять
    if (Date.now() - timestamp > CACHE_DURATION) {
      updateCache(cacheKey, testType, testValue, take, skip);
    }

    // Доставка данных блять
    return new Response(
      JSON.stringify(data, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      ),
      { status: 200 }
    );
  }

  // Сука где кэш нахуй блять
  // Похуй новый сделаем блять
  const leaderboardEntries = await fetchLeaderboard(
    testType,
    testValue,
    take,
    skip
  );

  // Упаковываем блять
  const payload = {
    data: leaderboardEntries,
    timestamp: Date.now(),
  };

  // Выкидываем нахуй чтобы потом 5 лет искать блять
  await kv.set(cacheKey, JSON.stringify(payload), {
    ex: CACHE_DURATION / 1000,
  });

  // Отдаём данные блять
  // Пользователь ждал 5 часов блять
  return new Response(
    // Пользователи дауны не понимают больших чисел
    // Надо бы блять их вот так блять
    JSON.stringify(leaderboardEntries, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    ),
    // Скажи триста
    { status: 200 }
    // Долбаёб
  );
}
