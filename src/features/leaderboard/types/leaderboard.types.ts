import { TestRecord, User } from "@prisma/client";

export type LeaderboardEntry = {
  user: User;
  testRecord: TestRecord;
};
