import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function handleGet() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tests = await prisma.test.findMany({
    where: { userStatsId: session.user.id },
    orderBy: { startTestTime: "desc" },
  });

  return new Response(
    JSON.stringify(tests, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    ),
    { headers: { "Content-Type": "application/json" } }
  );
}
