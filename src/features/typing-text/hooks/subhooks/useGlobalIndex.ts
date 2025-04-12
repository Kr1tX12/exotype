import { useRef, useEffect } from "react";
import {
  setInitialGlobalIndex,
  useTypingDispatch,
  useTypingState,
} from "../../components/typing-provider";

export const useGlobalIndex = () => {
  const dispatch = useTypingDispatch();

  const targetWords = useTypingState((state) => state.targetWords);
  const typedWords = useTypingState((state) => state.typedWords);
  const startWordsIndex = useTypingState((state) => state.startWordsIndex);

  const globalIndexRef = useRef(0);
  const prevStartIndexRef = useRef(startWordsIndex);

  useEffect(() => {
    // O(n) редко
    globalIndexRef.current = 0;
    prevStartIndexRef.current = startWordsIndex;
    for (let i = 0; i < startWordsIndex; i++) {
      globalIndexRef.current +=
        Math.max(targetWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) + 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetWords, startWordsIndex]);

  // O(k) каждый символ
  const delta = startWordsIndex - prevStartIndexRef.current;
  if (delta !== 0) {
    if (delta > 0) {
      for (let i = prevStartIndexRef.current; i < startWordsIndex; i++) {
        globalIndexRef.current +=
          Math.max(targetWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) + 1;
      }
    } else {
      for (let i = startWordsIndex; i < prevStartIndexRef.current; i++) {
        globalIndexRef.current -=
          Math.max(targetWords[i]?.length ?? 0, typedWords[i]?.length ?? 0) + 1;
      }
    }
    prevStartIndexRef.current = startWordsIndex;
  }

  useEffect(() => {
    setInitialGlobalIndex(dispatch, globalIndexRef.current);
  }, [globalIndexRef, dispatch]);
};
