import { useStore } from "@/store/store";
import { useEffect } from "react";

export const useTestStarted = () => {
  const typedText = useStore((state) => state.typedText);
  const isTestReloading = useStore((state) => state.isTestReloading);
  const updateIsStarted = useStore((state) => state.updateIsTestStarted);

  useEffect(() => {
    if (typedText.length > 0) {
      updateIsStarted(true);
    } else if (isTestReloading) {
      updateIsStarted(false);
    }
  }, [typedText, isTestReloading, updateIsStarted]);
};
