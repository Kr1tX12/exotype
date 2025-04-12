import { useStore } from "@/store/store";
import { useEffect, useMemo } from "react";
import {
    setTargetWords, useTypingDispatch
} from "../../components/typing-provider";

export const useManagedTargetWords = () => {
  const dispatch = useTypingDispatch();
  const targetText = useStore((state) => state.targetText);

  const targetWords = useMemo(() => targetText.split(" "), [targetText]);

  useEffect(() => {
    setTargetWords(dispatch, targetWords);
  }, [targetWords, dispatch]);
};
