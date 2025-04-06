"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ResultActionsGroup } from "./actions-group/result-actions-group";
import { ResultPagesByTab } from "./result-pages-by-tab";
import { ResultTabs } from "./result-tabs";
import { TestResultsGroup } from "./test-results-group/test-results-group";
import { useResultStats } from "../hooks/useResultStats";

export const ResultsWithinProvider = () => {
  useResultStats();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="size-full flex flex-col gap-8 container">
      <div className="rounded-xl my-8 size-full px-12 justify-center flex flex-col gap-8">
        <ResultTabs activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <ResultPagesByTab activeIndex={activeIndex} />
        <motion.div layout className="flex flex-col gap-8">
          <TestResultsGroup />
          <ResultActionsGroup />
        </motion.div>
      </div>
    </div>
  );
};
