"use client";

import { useState } from "react";
import { ProfileWpmHistory } from "./profile-wpm-history";
import { BookOpenText, ChartLine } from "lucide-react";
import { IconFlameFilled } from "@tabler/icons-react";
import { AnimatedTabs, Tab } from "@/components/ui/animated-tabs";
import { ProfileActivityCalendar } from "./profile-activity-calendar";
import { AnimatePresence, motion } from "framer-motion";
import { TestsList } from "../tests-list/tests-list";

export const ProfileChartsGroup = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex gap-8 w-full h-72 items-center justify-between">
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

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full"
          key={activeIndex}
        >
          {
            {
              0: <ProfileWpmHistory />,
              1: <ProfileActivityCalendar />,
              2: <TestsList />,
            }[activeIndex]
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
