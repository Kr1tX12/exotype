import { useStore } from "@/store/store";
import { useEffect, useMemo } from "react";

export const useManagedTypedWords = () => {
  const typedText = useStore((state) => state.typedText);
  const updateTypedWords = useStore((state) => state.updateTypedWords);

  const typedWords = useMemo(() => typedText.split(" "), [typedText]);

  useEffect(() => {
    updateTypedWords(typedWords);
  }, [typedWords, updateTypedWords]);
};
