"use client";

import { AnimatedTabs, Tab } from "@/components/ui/animated-tabs";
import React, { useState } from "react";

export const LeaderboardTypeTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <AnimatedTabs
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      id="leaderboard"
    >
      <Tab index={0}>Время</Tab>
      <Tab index={1}>Слова</Tab>
      <Tab index={2}>Тексты</Tab>
      <Tab index={3}>Кастом</Tab>
    </AnimatedTabs>
  );
};
