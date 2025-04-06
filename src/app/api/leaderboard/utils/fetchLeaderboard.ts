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
      select: {
        startTestTime: true,
        endTestTime: true,
        typedText: true,
        targetText: true,
        id: true,
        userStatsId: true,
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
      select: {
        id: true,
        username: true,
        avatar: true,
        slug: true,
      },
    });

    const chunkSize = 50;

    const rankKey = `rank${testValue}${testType}`.toLowerCase();

    if (
      ["rank15time", "rank60time", "rank10words", "rank500words"].includes(
        rankKey
      )
    )
      for (let i = 0; i < users.length; i += chunkSize) {
        const chunk = users.slice(i, i + chunkSize);

        await Promise.all(
          chunk.map((user, j) =>
            prisma.userStats.update({
              where: { userId: user.id },
              data: { [rankKey]: i + j + 1 },
            })
          )
        );
      }

    const userMap = new Map(users.map((user) => [user.id, user]));
    const leaderboardEntries = tests.map((test) => {
      const user = userMap.get(test.userStatsId);

      return {
        test: {
          id: test.id,
          startTestTime: Number(test.startTestTime),
          endTestTime: Number(test.endTestTime),
          typedText: test.typedText,
          targetText: test.targetText,
        },
        user: {
          username: user?.username,
          avatar: user?.avatar ?? undefined,
          slug: user?.slug,
        },
      };
    });

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
