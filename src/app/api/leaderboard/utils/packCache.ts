import { CacheLeaderboardEntry } from "@/entities/leaderboard/leaderboard.model";
import { serializeBigint } from "@/shared/lib/utils/bigint-utils";

export const packCache = (leaderboardEntries: CacheLeaderboardEntry[]) => {
  const payload = {
    data: leaderboardEntries,
    timestamp: Date.now(),
  };
  const serializedPayload = serializeBigint(payload);
  return serializedPayload;
};
