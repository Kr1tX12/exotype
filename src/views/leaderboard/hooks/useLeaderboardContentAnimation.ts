import { useState, useEffect } from "react";
import { LEADERBOARD_ANIMATION_DURATION } from "../constants/leaderboard.constants";
import { useLeaderboardData } from "../subcomponents/leaderboard-provider";
import { CacheLeaderboard } from "@/entities/leaderboard/leaderboard.model";

export const useLeaderboardContentAnimation = ({
  leaderboardEntries,
  isLoading,
  error,
}: {
  leaderboardEntries: CacheLeaderboard | undefined;
  isLoading: boolean;
  error: Error | null;
}) => {
  const {
    state: { testValue, testType },
    dispatch,
  } = useLeaderboardData();

  const [opacity, setOpacity] = useState(1);

  const [displayedLeaderboardData, setDisplayedLeaderboardData] = useState({
    leaderboardEntries,
    isLoading,
    error,
  });

  useEffect(() => {
    setOpacity(0);

    const timeout = setTimeout(() => {
      setDisplayedLeaderboardData({ leaderboardEntries, isLoading, error });
      setOpacity(1);
    }, LEADERBOARD_ANIMATION_DURATION);
    return () => clearTimeout(timeout);
  }, [testValue, testType, leaderboardEntries, isLoading, error]);

  useEffect(() => {
    if (leaderboardEntries?.timestamp)
      dispatch({
        type: "SET_UPDATED_AT",
        payload: leaderboardEntries.timestamp,
      });
  }, [leaderboardEntries, dispatch]);

  return { displayedLeaderboardData, opacity };
};
