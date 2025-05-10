import { useStore } from "@/store/store";
import { useEffect, useMemo } from "react";

export const useManagedTargetWords = () => {
  const targetText = useStore((state) => state.targetText);
  const updateTargetWords = useStore((state) => state.updateTargetWords);

  const targetWords = useMemo(() => targetText.split(" "), [targetText]);

  useEffect(() => {
    updateTargetWords(targetWords);
  }, [targetWords, updateTargetWords]);
};
