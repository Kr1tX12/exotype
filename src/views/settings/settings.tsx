"use client";

import { AnimatedTabs, Tab } from "@/shared/components/ui/animated-tabs";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UserSettings } from "./subcomponents/tabs/user-settings";

export const Settings = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-8 items-center">
      <AnimatedTabs
        id="settings"
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <Tab index={0}>Пользователь</Tab>
        <Tab index={1} locked>
          Текст
        </Tab>
        <Tab index={2} locked>
          Тест
        </Tab>
        <Tab index={3} locked>
          Статистика
        </Tab>
        <Tab index={4} locked>
          Другое
        </Tab>
      </AnimatedTabs>
      <div className="mini-container size-full relative">
        <AnimatePresence mode="wait">
          {
            {
              "0": <UserSettings />,
            }[activeIndex]
          }
        </AnimatePresence>
      </div>
    </div>
  );
};
