"use client";

import { UserCard } from "./subcomponents/statistics-tab/user-card";
import { ProfileLeaderboardPositions } from "./subcomponents/statistics-tab/leaderboard-positions/profile-leaderboard-positions";
import { TestTypesWpmCards } from "./subcomponents/statistics-tab/test-types-wpm/test-types-wpm-cards";
import { ProfileChartsGroup } from "./subcomponents/statistics-tab/charts/profile-charts-group";
import { AnimatedTabs, Tab } from "@/shared/components/ui/animated-tabs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { UserAPI } from "@/entities/user/user.api";

export const Profile = ({ slug }: { slug?: string }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const session = useSession();

  const { data: user } = useQuery(
    UserAPI.getUserQueryOptions(slug || session.data?.user.slug)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="sm:container flex flex-col gap-4 items-center"
    >
      <AnimatedTabs
        id="profile"
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <Tab index={0}>Статистика</Tab>
        <Tab index={1}>Другое</Tab>
      </AnimatedTabs>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="size-full"
          key={activeIndex}
        >
          {
            {
              0: (
                <div className="bg-muted/30 rounded-xl p-8 max-lg:p-4 max-sm:p-2 flex flex-col items-center gap-8 w-full">
                  <div className="flex max-lg:flex-col w-full justify-between gap-8 items-center">
                    <UserCard user={user} />
                    <ProfileLeaderboardPositions user={user} />
                  </div>
                  <ProfileChartsGroup />
                  <TestTypesWpmCards />
                </div>
              ),
            }[activeIndex]
          }
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
