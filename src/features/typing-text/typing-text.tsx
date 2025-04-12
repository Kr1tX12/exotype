"use client";

import { TypingProvider } from "./components/typing-provider";
import { TypingTextWithinProvider } from "./components/typing-text-within-provider";

export const TypingText = () => {
  return (
    <TypingProvider>
      <TypingTextWithinProvider />
    </TypingProvider>
  );
};

export default TypingText;
