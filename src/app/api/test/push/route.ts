import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
  } = await req.json();

  const userStats = await prisma.userStats.findUnique({
    where: { userId: session?.user.id },
  });

  if (!userStats) {
    return NextResponse.json(
      { error: "User stats not found" },
      { status: 404 }
    );
  }

  await prisma.test.create({
    data: {
      userStatsId: userStats.userId,
      typedText,
      targetText,
      startTestTime: BigInt(startTestTime),
      endTestTime: BigInt(endTestTime),
      testType,
      testValue,
    },
  });

  return NextResponse.json(null, { status: 204 });
}
