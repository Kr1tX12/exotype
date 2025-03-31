import { prisma } from "@/prisma/prisma-client";
import { TestType } from "@prisma/client";

export async function fetchLeaderboard(
  testType: TestType,
  testValue: number,
  take: number,
  skip: number
) {
  try {
    const tests = await prisma.testRecord.findMany({
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
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: tests.map((test) => test.userStatsId),
        },
      },
    });

    const userMap = new Map(users.map((user) => [user.id, user]));
    const leaderboardEntries = tests.map((test) => ({
      test,
      user: userMap.get(test.userStatsId),
    }));

    return {
      data: leaderboardEntries,
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
}
