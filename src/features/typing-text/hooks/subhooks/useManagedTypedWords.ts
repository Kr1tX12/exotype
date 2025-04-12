import { useStore } from "@/store/store";
import { useEffect, useMemo } from "react";
import {
  setTypedWords,
  useTypingDispatch,
} from "../../components/typing-provider";

export const useManagedTypedWords = () => {
  const dispatch = useTypingDispatch();
  const typedText = useStore((state) => state.typedText);

  const typedWords = useMemo(() => typedText.split(" "), [typedText]);

  useEffect(() => {
    setTypedWords(dispatch, typedWords);
  }, [typedWords, dispatch]);
};
