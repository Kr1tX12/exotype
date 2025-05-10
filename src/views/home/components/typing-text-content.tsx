import { ActionsBar } from "@/features/actions-bar";
import { CommandLine } from "@/features/command-line";
import { FallingLeaves } from "@/features/falling-leaves";
import { TypingText } from "@/features/typing-text/typing-text";
import { useTheme } from "@/shared/components/theme-provider";
import { getThemeByName } from "@/shared/lib/utils/getThemeByName";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

export const TypingTextContent = () => {
  const { theme: themeName } = useTheme();

  const theme = useMemo(() => getThemeByName(themeName), [themeName]);

  return (
    <motion.div className="size-full flex flex-col container items-center lg:justify-between">
      <ActionsBar />
      <div className="flex flex-col items-center justify-center select-none my-2 h-full w-full">
        <TypingText text="Шёл как-то даун по лесу гулял" />
      </div>
      {theme?.colors.leaves !== undefined && (
        <FallingLeaves leafSrc={theme.colors.leaves} />
      )}
      <CommandLine />
    </motion.div>
  );
};
