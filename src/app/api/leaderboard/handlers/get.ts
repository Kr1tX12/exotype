import { NextRequest, NextResponse } from "next/server";
import { CacheLeaderboard } from "../leaderboard.types";
import { kv } from "@vercel/kv";
import { updateCache } from "../utils/updateCache";
import { CACHE_DURATION } from "../leaderboard.constants";
import { fetchLeaderboard } from "../utils/fetchLeaderboard";
import { getSearchParams } from "../utils/getSearchParams";
import { packCache } from "../utils/packCache";
import { serializeBigint } from "@/lib/utils/bigint-utils";

export const handleGet = async (request: NextRequest) => {
  // Сука опять лидерборд делать блять
  try {
    // Чё там ему нужно нахуй
    const result = getSearchParams(request);

    if (!result.success) {
      console.error(result.error);
      return NextResponse.json(
        {
          message: "Invalid parameters",
          error: result.error,
        },
        { status: 400 }
      );
    }
    const { testType, testValue, take, skip } = result.data;

    // Ага понятно теперь бы запомнить блять
    const cacheKey = `leaderboard-${testType}-${testValue}-${take}-${skip}`;

    // Чё бля ищи старый кэш блять где он блять
    let cached;
    try {
      cached = await kv.get<CacheLeaderboard>(cacheKey);
    } catch (error) {
      console.error("Ошибка во время получение кэша: " + error);
      return NextResponse.json(
        { message: "Ошибка во время получения кэша", error },
        { status: 500 }
      );
    }

    if (cached) {
      // Еба нашёл сука блять

      // Кэш устарел блять ладно похуй потом обновим блять
      // старые данные тоже норм блять
      if (Date.now() - cached.timestamp > CACHE_DURATION) {
        // Делаем всё асинхронно блять чтобы пользователь не ждал пять лет и сразу получил старые данные
        updateCache(cacheKey, testType, testValue, take, skip).catch((error) =>
          console.error("Ошибка обновления кэша", error)
        );
      }

      // Доставка данных блять
      return new Response(serializeBigint(cached), { status: 200 });
    }

    // Сука где кэш нахуй блять
    // Похуй новый сделаем блять
    const leaderboardEntries = await fetchLeaderboard(
      testType,
      testValue,
      take,
      skip
    );

    if (!leaderboardEntries.ok) {
      return NextResponse.json({
        message: "Ошибка при составлении лидерборда",
        error: leaderboardEntries.error,
      });
    }

    // Упаковываем блять
    const payload = packCache(leaderboardEntries.data ?? []);
    // Выкидываем нахуй чтобы потом 5 лет искать блять
    await kv
      .set(cacheKey, payload, {
        ex: -1,
      })
      .catch((error) => {
        console.error("Ошибка во время сохранения кэша: " + error);
        return NextResponse.json(
          { message: "Ошибка во время сохранения кэша", error },
          { status: 500 }
        );
      });

    // Отдаём данные блять
    // Пользователь ждал 5 часов блять
    return new Response(
      // Пользователи дауны не понимают больших чисел
      // Надо бы блять их вот так блять
      payload,
      // Скажи триста
      { status: 200 }
      // Долбаёб
    );
  } catch (error) {
    console.error("Неизвестная ошибка" + error);
    return NextResponse.json(
      { message: "Неизвестная ошибка", error },
      { status: 500 }
    );
  }
};
