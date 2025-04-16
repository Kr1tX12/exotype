"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { StatsDisplayer } from "./components/stats-displayer";
import { TestProgress } from "./components/test-progress";
import { Text } from "./components/text";
import { TestContainer } from "./components/test-container";
import { TypingRefsProvider } from "./components/refs-context";
import { TestInput } from "./components/test-input";
import { TypingHandler } from "./components/typing-handler";

/// ВООБЩЕ НЕ РЕРЕНДЕРИТСЯ (ПОЧТИ)! НЕ ТРОГАТЬ!
export const TypingText = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TypingRefsProvider>
      <TypingHandler />
      <TestContainer isBlurred={!isFocused}>
        <StatsDisplayer />
        <TestProgress />

        <Text />

        <TestInput isFocused={isFocused} setIsFocused={setIsFocused} />
      </TestContainer>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none text-muted-foreground font-semibold text-xl absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2"
      >
        Click to focus
      </motion.p>
    </TypingRefsProvider>
  );
};
