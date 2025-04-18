import { TestRecord, User } from "@prisma/client";

export type LeaderboardEntry = {
  user: User;
  testRecord: TestRecord;
};

export type CacheLeaderboard = {
  data: CacheLeaderboardEntry[];
  timestamp: number;
};

export type CacheLeaderboardEntry = {
  test: {
    id: string;
    startTestTime: number;
    endTestTime: number;
    typedText: string;
    targetText: string;
  };
  user: {
    username?: string;
    avatar?: string;
    slug?: string;
  };
};
