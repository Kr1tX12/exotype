import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string; userId: string }> }
) {
  const { year, userId } = await params;

  if (!year) {
    return NextResponse.json(
      { error: "Year is not provided" },
      { status: 400 }
    );
  }

  const typingTimesPerDay = await prisma.typingPerDay.findMany({
    where: {
      userStatsId: userId,
      date: {
        contains: year,
      },
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(typingTimesPerDay, { status: 200 });
}
