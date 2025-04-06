import { serializeBigint } from "@/lib/utils/bigint-utils";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const statsParam = req.nextUrl.searchParams.get("stats");
  const stats = statsParam === "true";

  const user = await prisma.user.findUnique({
    where: { slug },
    include: { stats },
  });

  return new Response(serializeBigint(user ?? {}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
