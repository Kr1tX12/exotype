interface MarkovChain {
  [bigram: string]: {
    [nextWord: string]: number;
  };
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
  const sentenceEndRegex = /[.!?]\s*/; // Разделитель предложений

  // Словарь для пар открывающих и закрывающих символов
  const pairs: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}',
    '"': '"',
    "'": "'"
  };

  let i = 0;
  while (i < text.length) {
    const char = text[i];

    // Если символ – открывающая скобка или кавычка, добавляем её в стек
    if (pairs[char]) {
      stack.push(char);
      result.push(char);
    }
    // Если символ – закрывающая скобка или кавычка
    else if (char === ')' || char === ']' || char === '}' || char === '"' || char === "'") {
      const lastOpened = stack[stack.length - 1];
      if (lastOpened && pairs[lastOpened] === char) {
        stack.pop();
        result.push(char);
      }
    }
    // Если это конец предложения, закрываем все оставшиеся скобки/кавычки
    else if (sentenceEndRegex.test(char)) {
      while (stack.length > 0) {
        const lastOpened = stack.pop();
        result.push(pairs[lastOpened]);
      }
      result.push(char);
    } else {
      result.push(char);
    }
    i++;
  }

  // В конце текста закрываем оставшиеся открытые скобки/кавычки
  while (stack.length > 0) {
    const lastOpened = stack.pop();
    result.push(pairs[lastOpened]);
  }

  return result.join('');
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
 * Теперь генерируются предложения, а не отдельные слова.
 * Количество предложений определяется числом знаков окончания (".", "?", "!").
 *
 * @param chainData Объект с цепью и списком стартовых биграмм.
 * @param sentenceCount Желаемое количество предложений (по умолчанию 3).
 * @returns Сгенерированный текст.
 */
export function generateText(
  chainData: ChainData,
  sentenceCount: number = 3
): string {
  const { chain, start_words } = chainData;
  if (start_words.length === 0) {
    throw new Error("Список стартовых биграмм пуст");
  }

  // Начинаем с случайной стартовой биграммы
  let currentTuple: [string, string] = randomChoice(start_words);
  let currentBigram = makeBigram(currentTuple[0], currentTuple[1]);
  const generatedWords: string[] = [currentTuple[0], currentTuple[1]];

  // Считаем, сколько предложений уже сформировано
  let currentSentenceCount = 0;
  if (/[.!?]$/.test(currentTuple[0])) currentSentenceCount++;
  if (/[.!?]$/.test(currentTuple[1])) currentSentenceCount++;

  // Генерируем до тех пор, пока не достигнем нужного числа предложений
  while (currentSentenceCount < sentenceCount) {
    const transitions = chain[currentBigram];
    console.log(`ИТЕРАЦИЯ: текущая биграмма: ${currentBigram}, переходы: ${JSON.stringify(transitions)}`);
    
    if (!transitions || Object.keys(transitions).length === 0) {
      // Пытаемся сохранить контекст:
      const currentSecond = parseBigram(currentBigram)[1];
      const fallbackKey = Object.keys(chain).find((key) => {
        const [w1] = parseBigram(key);
        return w1 === currentSecond;
      });
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
    // Выбираем следующее слово по весам
    const nextWord = weightedRandomChoice(transitions);
    generatedWords.push(nextWord);
    if (/[.!?]$/.test(nextWord)) {
      currentSentenceCount++;
    }
    // Обновляем биграмму: сдвигаем окно
    const parsed = parseBigram(currentBigram);
    currentBigram = makeBigram(parsed[1], nextWord);
  }

  let result = generatedWords.join(" ").trim();
  // Если текст не заканчивается знаком окончания предложения – добавляем точку
  const lastChar = result[result.length - 1];
  if (![".", "?", "!"].includes(lastChar)) {
    result = lastChar === "," ? result.slice(0, -1) : result;
    result += ".";
  }
  const cleanResult = cleanPunctuation(result);
  console.log(cleanResult);
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
 * Теперь принимает количество предложений.
 *
 * @param sentenceCount Количество предложений, которые нужно сгенерировать.
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
