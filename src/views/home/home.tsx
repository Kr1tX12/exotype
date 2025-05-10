"use client";

import { useEffect, useRef, useState } from "react";
import { Results } from "@/features/results";
import { useStore } from "@/store/store";
import { motion } from "framer-motion";
import { TypingTextContent } from "./components/typing-text-content";
import { useReloadTest } from "@/features/typing-text-old/hooks/subhooks/useReloadTest";

const ANIMATION_DURATION = 0.15;
export const Home = () => {
  const isTestEnd = useStore((state) => state.isTestEnd);
  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const reloadTest = useReloadTest();
  const [contentNow, setContentNow] = useState<"typing" | "results">("typing");
  const [opacityNow, setOpacityNow] = useState(1);
  const isMountedRef = useRef(false);

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

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    setOpacityNow(0);

    const timeout = setTimeout(() => {
      setOpacityNow(1);
      setContentNow(isTestEnd ? "results" : "typing");
    }, ANIMATION_DURATION * 1000);

    return () => clearTimeout(timeout);
  }, [isTestEnd]);

  return (
    <motion.div
      key={contentNow}
      className="size-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: opacityNow }}
      transition={{ duration: 0.15 }}
    >
      {
        {
          results: <Results />,
          typing: <TypingTextContent />,
        }[contentNow]
      }
    </motion.div>
  );
};
