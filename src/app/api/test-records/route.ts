import { authOptions } from "@/shared/lib/auth";
import { serializeBigint } from "@/shared/lib/utils/bigint-utils";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const testRecords = await prisma.testRecord.findMany({
    where: { userStatsId: session.user.id },
  });

  return new Response(serializeBigint(testRecords), { status: 200 });
}
