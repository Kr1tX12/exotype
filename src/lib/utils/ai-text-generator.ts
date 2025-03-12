interface MarkovChain {
  [bigram: string]: { [nextWord: string]: number };
}

interface ChainData {
  chain: MarkovChain;
  start_words: [string, string][];
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function cleanPunctuation(text: string): string {
  const stack: string[] = [];
  const result: string[] = [];
  const sentenceEndRegex = /[.!?]/; // Знак окончания предложения

  // Определяем пары для открывающих и закрывающих символов
  const pairs: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
    '"': '"',
    "'": "'",
  };

  const isMatching = (open: string, close: string): boolean =>
    (open === "(" && close === ")") ||
    (open === "[" && close === "]") ||
    (open === "{" && close === "}") ||
    ((open === '"' || open === "'") && open === close);

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if ("([{".includes(char)) {
      // Обработка открывающих скобок
      stack.push(char);
      result.push(char);
    } else if (")]}".includes(char)) {
      // Обработка закрывающих скобок
      if (stack.length > 0 && isMatching(stack[stack.length - 1], char)) {
        stack.pop();
        result.push(char);
      }
      // Если лишний закрывающий символ, просто пропускаем его
    } else if (char === '"' || char === "'") {
      // Обработка кавычек
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
        result.push(char);
      } else {
        stack.push(char);
        result.push(char);
      }
    } else if (sentenceEndRegex.test(char)) {
      // Обработка знака окончания предложения
      let j = i + 1;
      while (j < text.length && text[j] === " ") j++;
      let flushStack = true;
      if (j < text.length && stack.length > 0) {
        const nextChar = text[j];
        if (")]}\"'".includes(nextChar) && isMatching(stack[stack.length - 1], nextChar)) {
          flushStack = false;
        }
      }
      if (flushStack) {
        while (stack.length > 0) {
          const open = stack.pop()!;
          result.push(pairs[open]);
        }
      }
      result.push(char);
    } else {
      result.push(char);
    }
  }

  // Закрываем оставшиеся незакрытые символы
  while (stack.length > 0) {
    const open = stack.pop()!;
    result.push(pairs[open]);
  }

  return result.join("");
}

function weightedRandomChoice(choices: { [key: string]: number }): string {
  const entries = Object.entries(choices);
  const rand = Math.random();
  let cumulative = 0;
  for (const [word, probability] of entries) {
    cumulative += probability;
    if (rand < cumulative) {
      return word;
    }
  }
  return entries[entries.length - 1][0];
}

/**
 * Преобразует строковое представление биграммы в кортеж.
 * Ожидается формат: "('слово1', 'слово2')"
 */
function parseBigram(bigramStr: string): [string, string] {
  const regex = /^\('(.+?)', '(.+?)'\)$/;
  const match = bigramStr.match(regex);
  if (!match) {
    throw new Error(`Неверный формат биграммы: ${bigramStr}`);
  }
  return [match[1], match[2]];
}

/**
 * Формирует строковое представление биграммы из двух слов.
 */
function makeBigram(word1: string, word2: string): string {
  return `('${word1}', '${word2}')`;
}

/**
 * Генерирует текст на основе цепи Маркова с биграммами.
 * Количество предложений определяется числом знаков окончания (".", "?", "!").
 *
 * @param chainData Объект с цепью и списком стартовых биграмм.
 * @param sentenceCount Желаемое количество предложений (по умолчанию 3).
 * @returns Сгенерированный текст.
 */
export function generateText(chainData: ChainData, sentenceCount: number = 3): string {
  const { chain, start_words } = chainData;
  if (start_words.length === 0) {
    throw new Error("Список стартовых биграмм пуст");
  }

  let currentTuple: [string, string] = randomChoice(start_words);
  let currentBigram = makeBigram(currentTuple[0], currentTuple[1]);
  const generatedWords: string[] = [currentTuple[0], currentTuple[1]];

  // Подсчет уже сформированных предложений
  let currentSentenceCount = 0;
  if (/[.!?]$/.test(currentTuple[0])) currentSentenceCount++;
  if (/[.!?]$/.test(currentTuple[1])) currentSentenceCount++;

  let iterations = 0;
  const MAX_ITERATIONS = 10000; // Безопасный лимит итераций

  while (currentSentenceCount < sentenceCount && iterations < MAX_ITERATIONS) {
    iterations++;
    const transitions = chain[currentBigram];

    if (!transitions || Object.keys(transitions).length === 0) {
      // Пытаемся сохранить контекст: ищем биграмму, где первое слово совпадает со вторым текущей
      const currentSecond = parseBigram(currentBigram)[1];
      const fallbackKey = Object.keys(chain).find(
        (key) => parseBigram(key)[0] === currentSecond
      );
      if (fallbackKey) {
        currentBigram = fallbackKey;
        continue;
      } else {
        // Если fallback не найден, сбрасываем состояние
        currentTuple = randomChoice(start_words);
        currentBigram = makeBigram(currentTuple[0], currentTuple[1]);
        generatedWords.push(currentTuple[0], currentTuple[1]);
        if (/[.!?]$/.test(currentTuple[0])) currentSentenceCount++;
        if (/[.!?]$/.test(currentTuple[1])) currentSentenceCount++;
        continue;
      }
    }

    // Выбираем следующее слово с учетом весов
    const nextWord = weightedRandomChoice(transitions);
    generatedWords.push(nextWord);
    if (/[.!?]$/.test(nextWord)) {
      currentSentenceCount++;
    }
    // Обновляем биграмму: сдвигаем окно
    const parsed = parseBigram(currentBigram);
    currentBigram = makeBigram(parsed[1], nextWord);
  }

  if (iterations === MAX_ITERATIONS) {
    console.warn("Достигнут лимит итераций. Возможно, цепь имеет проблему.");
  }

  let result = generatedWords.join(" ").trim();
  // Если текст не заканчивается знаком окончания предложения – добавляем точку
  const lastChar = result[result.length - 1];
  if (![".", "?", "!"].includes(lastChar)) {
    result = lastChar === "," ? result.slice(0, -1) : result;
    result += ".";
  }
  const cleanResult = cleanPunctuation(result);
  return cleanResult;
}

/**
 * Запрос к API для получения данных марковской цепи.
 */
async function fetchChainData(language: string): Promise<ChainData> {
  const response = await fetch(`/api/ai?lang=${language}`);
  if (!response.ok) {
    throw new Error("Ошибка при получении данных марковской цепи");
  }
  return response.json();
}

/**
 * Генерирует текст на основе марковской цепи, полученной через API.
 *
 * @param sentenceCount Количество предложений для генерации.
 * @param language Язык для генерации.
 * @returns Сгенерированный текст.
 */
export async function generateMarkovChainText(
  sentenceCount: number,
  language: string
): Promise<string> {
  try {
    const chainData = await fetchChainData(language);
    return generateText(chainData, sentenceCount);
  } catch (error) {
    console.error("ОШИБКА ГЕНЕРАЦИИ ТЕКСТА:", error);
    throw error;
  }
}
