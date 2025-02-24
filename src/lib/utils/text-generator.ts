import { Languages } from "@/constants";
import { getRandomArrayElement } from "./utils";

export const generateText = async ({
  wordsCount,
  punctuation,
  numbers,
  dictionarySize,
  language,
}: {
  wordsCount: number;
  dictionarySize: number;
  punctuation: boolean;
  numbers: boolean;
  language: Languages;
}): Promise<string> => {
  const response = await fetch(
    `/api/words?lang=${language}&words=${dictionarySize}`
  );

  const { words } = await response.json();

  if (!words) {
    throw new Error("Не удалось найти слова");
  }

  let text = "";
  for (let i = 0; i < wordsCount; i++) {
    text += getRandomArrayElement(words);
    if (i !== wordsCount - 1) text += " ";
  }

  return text;
};