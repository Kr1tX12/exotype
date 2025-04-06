import { authOptions } from "@/shared/lib/auth";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Noauthorized" }, { status: 401 });
  }

  const { year } = await params;

  if (!year) {
    return NextResponse.json(
      { error: "Year is not provided" },
      { status: 400 }
    );
  }

  const typingTimesPerDay = await prisma.typingPerDay.findMany({
    where: {
      userStatsId: session.user.id,
      date: {
        contains: year,
      },
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(typingTimesPerDay, { status: 200 });
}
