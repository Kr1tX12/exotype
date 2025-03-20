import { useStore } from "@/store/store";
import { useEffect, useState } from "react";

export const useTestStarted = () => {
  const typedText = useStore((state) => state.typedText);
  const isTestReloading = useStore((state) => state.isTestReloading);

  const [isTestStarted, setTestStarted] = useState(false);

  useEffect(() => {
    if (typedText.length > 0) {
      setTestStarted(true);
    } else if (isTestReloading) {
      setTestStarted(false);
    }
  }, [typedText, isTestReloading]);

  return isTestStarted;
};
