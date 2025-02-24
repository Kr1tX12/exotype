import { Languages } from "@/constants";
import { generateText } from "@/lib/utils/text-generator";
import { useStore } from "@/store/store";
import { useEffect } from "react";

export const useReloadTest = () => {
  const updateNeedText = useStore((state) => state.updateNeedText);
  const updateTypedText = useStore((state) => state.updateTypedText);
  const updateTestRealoading = useStore((state) => state.updateTestRealoading);

  const typingParams = useStore((state) => state.typingParams);

  useEffect(() => {
    reloadTest();
  }, [typingParams]);

  const reloadTest = async () => {
    const { isTestReloading, typingParams } = useStore.getState();
    
    if (isTestReloading) return;


    updateTestRealoading(true);
    const text = await generateText({
      punctuation: false,
      numbers: false,
      language: Languages.RU,
      wordsCount: typingParams.words,
      dictionarySize: 200000,
    });

    updateNeedText(text);
    updateTypedText("");

    updateTestRealoading(false);
  };

  return reloadTest;
};
