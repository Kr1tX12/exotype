import { Languages } from "@/constants";

export const generateText = async ({
  wordsCount,
  punctuation,
  numbers,
  dictionarySize,
  language,
  logicEnd = true,
}: {
  wordsCount: number;
  dictionarySize: number;
  punctuation: boolean;
  numbers: boolean;
  language: Languages;
  logicEnd?: boolean;
}): Promise<string> => {
  const response = await fetch(
    `/api/words?lang=${language}&words=${dictionarySize}`
  );
  if (!response.ok) throw new Error("Ошибка при загрузке слов");

  const { words }: { words: string[] } = await response.json();

  if (!words) throw new Error("Не удалось найти слова");

  const worker = new Worker(
    new URL(
      "@/lib/utils/text-generator/text-generator.worker.ts",
      import.meta.url
    )
  );

  return new Promise((resolve, reject) => {
    worker.onmessage = (event: MessageEvent) => {
      const { text, error } = event.data;
      if (error) {
        reject(new Error(error));
      } else {
        resolve(text);
      }
      worker.terminate();
    };

    worker.onerror = (error) => {
      worker.terminate();
      reject(error);
    };

    worker.postMessage({
      wordsCount,
      punctuation,
      numbers,
      logicEnd,
      words,
    });
  });
};
