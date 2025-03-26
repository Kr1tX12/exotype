"use client";

import { useState } from "react";
import { ProfileWpmHistory } from "./profile-wpm-history";
import { BookOpenText, ChartLine } from "lucide-react";
import { IconFlameFilled } from "@tabler/icons-react";
import { AnimatedTabs, Tab } from "@/components/ui/animated-tabs";

export const ProfileChartsGroup = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex gap-8 w-full h-72">
      <AnimatedTabs
        id="profile-charts"
        vertical
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        className="w-14"
      >
        <Tab index={0}>
          <ChartLine />
        </Tab>
        <Tab index={1}>
          <IconFlameFilled />
        </Tab>
        <Tab index={2}>
          <BookOpenText />
        </Tab>
      </AnimatedTabs>

      {{ 0: <ProfileWpmHistory /> }[activeIndex]}
    </div>
  );
};
