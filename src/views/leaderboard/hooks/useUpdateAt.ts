import { useEffect } from "react";
import { useLeaderboardData } from "../subcomponents/leaderboard-provider";
import { CacheLeaderboard } from "@/entities/leaderboard/leaderboard.model";

export const useUpdateAt = ({
  leaderboardEntries,
}: {
  leaderboardEntries: CacheLeaderboard | undefined;
}) => {
  const { dispatch } = useLeaderboardData();
  useEffect(() => {
    if (leaderboardEntries?.timestamp)
      dispatch({
        type: "SET_UPDATED_AT",
        payload: leaderboardEntries.timestamp,
      });
  }, [leaderboardEntries, dispatch]);
};
