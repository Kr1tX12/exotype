"use client";

import { ActionsBar } from "@/components/actions-bar";
import { Results } from "@/components/results";
import { TypingText } from "@/components/typing-test";
import { useReloadTest } from "@/components/typing-test/Hooks/useReloadTest";
import { useStore } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const isTestEnd = useStore((state) => state.isTestEnd);

  const reloadTest = useReloadTest();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        reloadTest();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
