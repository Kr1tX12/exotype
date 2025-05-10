import { useTestEnd } from "./subhooks/useTestEnd";
import { useManagedTypedWords } from "./subhooks/useManagedTypedWords";
import { useGlobalIndex } from "./subhooks/useGlobalIndex";
import { useTextResetAnimation } from "./subhooks/useTextResetAnimation";
import { useTimeTest } from "./subhooks/useTimeTest";
import { useUISizing } from "./subhooks/useUISizing";
import { useDynamicWords } from "./subhooks/useDynamicWords";
import { useTestStarted } from "./subhooks/useTestStarted";
import { useCompletedWordsLength } from "./subhooks/useCompletedWordsLength";
import { useManagedTargetWords } from "./subhooks/useManagedTargetWords";

export const useTypingHandler = () => {
  useManagedTargetWords();
  useManagedTypedWords();

  useDynamicWords();

  useUISizing();

  useCompletedWordsLength();

  useTextResetAnimation();

  useTestEnd();

  useGlobalIndex();

  useTimeTest();

  useTestStarted();
};
