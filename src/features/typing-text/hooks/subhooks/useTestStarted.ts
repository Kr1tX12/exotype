import { useStore } from "@/store/store";
import { useEffect } from "react";
import {
  setIsStarted,
  useTypingDispatch,
} from "../../components/typing-provider";

export const useTestStarted = () => {
  const dispatch = useTypingDispatch();

  const typedText = useStore((state) => state.typedText);
  const isTestReloading = useStore((state) => state.isTestReloading);

  useEffect(() => {
    if (typedText.length > 0) {
      setIsStarted(dispatch, true);
    } else if (isTestReloading) {
      setIsStarted(dispatch, false);
    }
  }, [typedText, isTestReloading, dispatch]);
};
