import { TestRecord, User } from "@prisma/client";

export type CacheLeaderboard = {
  data: CacheLeaderboardEntry[];
  timestamp: number;
};

export type CacheLeaderboardEntry = {
  test: TestRecord;
  user?: User;
};
