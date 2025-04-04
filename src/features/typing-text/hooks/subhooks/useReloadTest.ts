import { useStore } from "@/store/store";
import { useCallback } from "react";
import { generateTextByParams } from "../../utils/generateTextByParams";

export const useReloadTest = () => {
  const updateNeedText = useStore((state) => state.updateTargetText);
  const updateTypedText = useStore((state) => state.updateTypedText);
  const updateTestReloading = useStore((state) => state.updateTestReloading);
  const setStartTestTime = useStore((state) => state.setStartTestTime);
  const setEndTestTime = useStore((state) => state.setEndTestTime);
  const updateTestEnd = useStore((state) => state.updateTestEnd);

  const reloadTest = useCallback(
    async (retry: boolean = false) => {
      const { isTestReloading, typingParams } = useStore.getState();

      if (isTestReloading) return;

      updateTestReloading(true);

      updateTestReloading(true);
      setStartTestTime(0);
      setEndTestTime(0);
      updateTestEnd(false);

      if (!retry) {
        const text = await generateTextByParams(typingParams);

        updateNeedText(text);
      }
      updateTypedText("");
      updateTestReloading(false);
    },
    [
      updateNeedText,
      updateTestReloading,
      updateTypedText,
      setStartTestTime,
      setEndTestTime,
      updateTestEnd,
    ]
  );

  return reloadTest;
};
