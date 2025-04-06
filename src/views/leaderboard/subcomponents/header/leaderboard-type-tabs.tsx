"use client";

import { AnimatedTabs, Tab } from "@/shared/components/ui/animated-tabs";
import { useEffect, useState } from "react";
import { useLeaderboardData } from "../leaderboard-provider";
import { LEADERBOARD_LANGUAGES } from "../../constants/leaderboard.constants";
import { Languages } from "@/shared/constants";
import { IconWorld } from "@tabler/icons-react";

export const LeaderboardTypeTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { dispatch } = useLeaderboardData();
  useEffect(() => {
    dispatch({
      type: "SET_LANGUAGE",
      payload: LEADERBOARD_LANGUAGES[activeIndex]?.language || Languages.EN,
    });
  }, [activeIndex, dispatch]);

  return (
    <div className="flex gap-2 items-center">
      <div className="p-3 grid place-content-center bg-muted/30 rounded-xl">
        <IconWorld />
      </div>
      <AnimatedTabs
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        id="leaderboard"
      >
        {LEADERBOARD_LANGUAGES.map((language, index) => (
          <Tab key={index} index={index}>
            {language.label}
          </Tab>
        ))}
      </AnimatedTabs>
    </div>
  );
};
