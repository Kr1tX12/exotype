import { capitalize, getRandomArrayElement } from "@/lib/utils";

self.onmessage = async (event: MessageEvent) => {
  try {
    const { wordsCount, punctuation, numbers, logicEnd, words } = event.data;
    let text = "";

    // Для того, чтобы после точек была заглавная буква
    let nextWordCapitalized = false;

    for (let i = 0; i < wordsCount; i++) {
      // Для чисел в тексте
      if (numbers && Math.random() < 0.05) {
        text +=
          (Math.random() * 100000).toFixed(Math.random() < 0.2 ? 2 : 0) + " ";
      }

      // Получение рандомного слова
      let word = getRandomArrayElement(words);
      if (word === undefined) {
        i--;
        continue;
      }

      // Оборачиваем слово в кавычки/скобки если не повезло
      if (!nextWordCapitalized && i !== 0 && punctuation) {
        const randomWrap = Math.random();
        if (randomWrap < 0.02) {
          word = `(${word})`;
        } else if (randomWrap < 0.04) {
          word = `"${word}"`;
        } else if (randomWrap < 0.042) {
          word = `'${word}'`;
        }
      }

      // Добавляем слово в текст с учётом заглавности
      text +=
        nextWordCapitalized || (i === 0 && punctuation)
          ? capitalize(word as string)
          : word;
      nextWordCapitalized = false;

      // Добавляем знаки препинания после слова если не повезло
      if (punctuation) {
        const randomPunc = Math.random();
        if (randomPunc < 0.1) {
          text += getRandomArrayElement([",", ",", ",", ";"]);
        } else if (randomPunc < 0.16) {
          text += getRandomArrayElement([".", "!", "?"]);
          nextWordCapitalized = true;
        }
      }

      // Пробел после слова, кроме последнего
      if (i !== wordsCount - 1) text += " ";
    }

    // Добавление точки и других хернюшек в конец текста
    if (logicEnd && punctuation) {
      if (![".", "!", "?", ";", ","].includes(text[text.length - 1])) {
        text += getRandomArrayElement([".", ";", "?", "!"]);
      } else if ([";", ","].includes(text[text.length - 1])) {
        text = text.slice(0, -1);
        text += getRandomArrayElement([".", ";", "?", "!"]);
      }
    }

    self.postMessage({ text });
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};

export {};
