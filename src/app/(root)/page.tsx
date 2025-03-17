"use client";

import { useEffect } from "react";
import { ActionsBar } from "@/components/actions-bar";
import { Results } from "@/components/results";
import { TypingText } from "@/components/typing-test";
import { useReloadTest } from "@/components/typing-test/hooks/subhooks/useReloadTest";
import { useStore } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";
import { AdBanner } from "@/components/ui/ad-banner";

export default function Home() {
  const isTestEnd = useStore((state) => state.isTestEnd);
  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const reloadTest = useReloadTest();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        reloadTest();
        updateTestEnd(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [reloadTest, updateTestEnd]);

  return (
    <AnimatePresence mode="wait">
      {isTestEnd ? (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="size-full"
        >
          <Results />
        </motion.div>
      ) : (
        <motion.div
          key="typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="size-full flex flex-col container items-center lg:justify-between"
          transition={{ duration: 0.15 }}
        >
          <ActionsBar />
          <div className="flex flex-col items-center justify-center text-xl select-none my-2 max-lg:h-full max-lg:mb-16">
            <TypingText />
          </div>
          <AdBanner />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
