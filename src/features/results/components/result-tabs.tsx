"use client";

import { AnimatedTabs, Tab } from "@/shared/components/ui/animated-tabs";
import { Dispatch, SetStateAction } from "react";

export const ResultTabs = ({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <AnimatedTabs
      id="results"
      className="self-center"
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      <Tab index={0}>Основное</Tab>
      <Tab locked index={1}>
        Текст
      </Tab>
      <Tab locked index={2}>
        Реплей
      </Tab>
      <Tab locked index={3}>
        Вся информация
      </Tab>
    </AnimatedTabs>
  );
};
