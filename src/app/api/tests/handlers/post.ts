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
  } = await req.json();

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

  return new NextResponse(null, { status: 204 });
}
