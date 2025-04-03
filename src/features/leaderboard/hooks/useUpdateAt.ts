import { CacheLeaderboard } from "@/app/api/leaderboard/leaderboard.types";
import { useEffect } from "react";
import { useLeaderboardData } from "../subcomponents/leaderboard-provider";

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
