"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTypingHandler } from "../hooks/useTypingHandler";
import { AlwaysFocusedInput } from "./always-focused-input";
import { StatsDisplayer } from "./stats-displayer";
import { TestProgress } from "./test-progress";
import { Text } from "./text";
import { TestContainer } from "./test-container";

export const TypingTextWithinProvider = () => {
  const [isFocused, setIsFocused] = useState(false);

  console.log("rerender suka");

  const { inputRef, caretRef, containerRef } =
    useTypingHandler();

  return (
    <TestContainer isBlurred={!isFocused}>
      {/* Счёткики ❤ */}
      <StatsDisplayer />
      <TestProgress />

      {/* Слова ❤❤❤❤❤❤❤❤❤❤❤❤ */}
      <Text caretRef={caretRef} containerRef={containerRef} />
      {/* Для мобилок ❤❤ */}
      <AlwaysFocusedInput
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        ref={inputRef}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none text-muted-foreground font-semibold text-xl absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2"
      >
        Click to focus
      </motion.p>
    </TestContainer>
  );
};
