import { authOptions } from "@/lib/auth";
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

  return new Response(
    JSON.stringify(testRecords, (_, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    }),
    { status: 200 }
  );
}
