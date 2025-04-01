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
      },
    });

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
