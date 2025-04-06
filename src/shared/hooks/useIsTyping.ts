'use client';

import { useStore } from "@/store/store";

export const useIsTyping = () => {
  const typedText = useStore((state) => state.typedText);
  const isTestEnd = useStore((state) => state.isTestEnd);

  return typedText.length !== 0 && !isTestEnd;
};
