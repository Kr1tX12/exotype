import { serializeBigint } from "@/lib/utils/serialize-bigint";
import { CacheLeaderboardEntry } from "../leaderboard.types";

export const packCache = (leaderboardEntries: CacheLeaderboardEntry[]) => {
  const payload = {
    data: leaderboardEntries,
    timestamp: Date.now(),
  };
  const serializedPayload = serializeBigint(payload);
  return serializedPayload;
};
