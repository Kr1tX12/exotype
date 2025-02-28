"use client";

import { useEffect } from "react";
import { ActionsBar } from "@/components/actions-bar";
import { Results } from "@/components/results";
import { TypingText } from "@/components/typing-test";
import { useReloadTest } from "@/components/typing-test/hooksblyat/subhooks/useReloadTest";
import { useStore } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const isTestEnd = useStore((state) => state.isTestEnd);
  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const reloadTest = useReloadTest();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        // Обновляем ключ для перезагрузки компонента
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
        >
          <Results />
        </motion.div>
      ) : (
        <motion.div
          key="typing"
          className="h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ActionsBar />
          <div className="container flex flex-col items-center justify-center text-xl select-none h-full my-2">
            <TypingText />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
