"use client";

import { useEffect, useMemo, useState } from "react";
import { ActionsBar } from "@/features/actions-bar";
import { Results } from "@/features/results";
import { TypingText } from "@/features/typing-text";
import { useReloadTest } from "@/features/typing-text/hooks/subhooks/useReloadTest";
import { useStore } from "@/store/store";
import { motion } from "framer-motion";
import { AdBanner } from "@/components/ui/ad-banner";
import FallingLeaves from "@/features/falling-leaves/falling-leaves";
import { useTheme } from "@/components/theme-provider";
import { getThemeByName } from "@/lib/utils/getThemeByName";
import { CommandLine } from "@/features/command-line/command-line";

const ANIMATION_DURATION = 0.15;
export default function Home() {
  const isTestEnd = useStore((state) => state.isTestEnd);
  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const reloadTest = useReloadTest();
  const { theme: themeName } = useTheme();
  const theme = useMemo(() => getThemeByName(themeName), [themeName]);
  const [contentNow, setContentNow] = useState<"typing" | "results">("typing");
  const [opacityNow, setOpacityNow] = useState(1);

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
    setOpacityNow(0);
    setTimeout(() => {
      setContentNow(isTestEnd ? "results" : "typing");
      setOpacityNow(1);
    }, ANIMATION_DURATION * 1000);
  }, [isTestEnd]);

  return {
    results: (
      <motion.div
        key="results"
        animate={{ opacity: opacityNow }}
        transition={{ duration: 0.15 }}
        className="size-full"
      >
        <Results />
      </motion.div>
    ),
    typing: (
      <motion.div
        key="typing"
        animate={{ opacity: opacityNow }}
        className="size-full flex flex-col container items-center lg:justify-between"
        transition={{ duration: 0.15 }}
      >
        <ActionsBar />
        <div className="flex flex-col items-center justify-center text-xl select-none my-2 max-lg:h-full max-lg:mb-16 w-full">
          <TypingText />
        </div>
        <div className="flex justify-between items-start">
          <AdBanner
            blockId="R-A-14560878-4"
            darkTheme={theme?.isDark ?? true}
          />
        </div>
        {theme?.colors.leaves !== undefined && (
          <FallingLeaves leafSrc={theme.colors.leaves} />
        )}
        <CommandLine />
      </motion.div>
    ),
  }[contentNow];
}
