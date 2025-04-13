"use client";

import { useStore } from "@/store/store";

export const useIsTyping = () => {
  const isTyping = useStore((state) => state.isTestStarted);

  return isTyping;
};
