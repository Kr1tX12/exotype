import { NextRequest } from "next/server";
import { LeaderboardSchema } from "../leaderboard.schema";

export const getSearchParams = (request: NextRequest) => {
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );
  const result = LeaderboardSchema.safeParse(searchParams);

  return result;
};
