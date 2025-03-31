import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function handlePost(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    typedText,
    targetText,
    startTestTime,
    endTestTime,
    testType,
    testValue,
    punctuation,
    dictionary,
    wpm,
  } = await req.json();

  try {
    const tests = await prisma.test.findMany({
      where: { userStatsId: session.user.id },
      orderBy: { startTestTime: "desc" },
    });

    if (tests.length >= 10) {
      const testsToDelete = tests.slice(9);

      await prisma.test.deleteMany({
        where: {
          id: {
            in: testsToDelete.map((test) => test.id),
          },
        },
      });
    }

    await prisma.test.create({
      data: {
        userStatsId: session.user.id,
        typedText,
        targetText,
        startTestTime: BigInt(startTestTime),
        endTestTime: BigInt(endTestTime),
        testType,
        testValue,
        punctuation,
        dictionary,
      },
    });

    const date = new Date().toISOString().split("T")[0];

    // ДОБАВЛЕНИЕ TYPINGPERDAY

    const typingPerDay = await prisma.typingPerDay.findUnique({
      where: {
        userStatsId: session.user.id,
        date,
      },
    });

    if (!typingPerDay) {
      await prisma.typingPerDay.create({
        data: {
          userStatsId: session.user.id,
          date,
          timeSec: Math.round((endTestTime - startTestTime) / 1000),
          testsCount: 1,
          avgWPM: wpm,
        },
      });
    } else {
      await prisma.typingPerDay.update({
        where: {
          userStatsId: session.user.id,
          date,
        },
        data: {
          timeSec:
            typingPerDay.timeSec +
            Math.round((endTestTime - startTestTime) / 1000),
          testsCount: typingPerDay.testsCount + 1,
          avgWPM:
            (typingPerDay.avgWPM * typingPerDay.testsCount + wpm) /
            (typingPerDay.testsCount + 1),
        },
      });
    }

    // ДОБАВЛЕНИЕ РЕКОРДА

    const prevRecord = await prisma.testRecord.findFirst({
      where: {
        userStatsId: session.user.id,
        testType,
        testValue,
      },
    });

    if (prevRecord) {
      if (wpm > prevRecord.wpm)
        await prisma.testRecord.update({
          where: {
            id: prevRecord.id,
          },
          data: {
            startTestTime: BigInt(startTestTime),
            endTestTime: BigInt(endTestTime),
            typedText,
            targetText,
            wpm,
          },
        });
    } else {
      await prisma.testRecord.create({
        data: {
          userStatsId: session.user.id,
          startTestTime: BigInt(startTestTime),
          endTestTime: BigInt(endTestTime),
          typedText,
          targetText,
          testType,
          testValue,
          wpm,
        },
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
