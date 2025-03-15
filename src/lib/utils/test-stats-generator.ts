export interface LetterStat {
  typedLetter: string;
  referenceLetter: string;
  isCorrect: boolean;
  //Время между текущим и предыдущим символом в миллисекундах.
  timeDelta: number;
  letterSpeed: number;
}

export interface WordStat {
  typedWord: string;
  referenceWord: string;
  letters: LetterStat[];
  wordTime: number;
  wordSpeed: number;
  isWordCorrect: boolean;
  missedLetters: string[];
  extraLetters: string[];
}

export interface DetailedTestLog {
  totalTime: number;
  words: WordStat[];
}

export const generateDetailedTestLog = ({
  startTime,
  letterTimestamps,
  typedWords,
  needWords,
  endTime,
}: {
  startTime: number;
  letterTimestamps: number[][];
  typedWords: string[];
  needWords: string[];
  endTime?: number;
}): DetailedTestLog => {
  const words: WordStat[] = [];

  for (let i = 0; i < typedWords.length; i++) {
    const typedWord = typedWords[i];
    const referenceWord = needWords[i] || "";
    const timestamps = letterTimestamps[i] || [];
    const letters: LetterStat[] = [];

    // Для расчёта timeDelta первого символа:
    let prevTimestamp: number;
    if (i === 0) {
      prevTimestamp = startTime;
    } else {
      const prevTimestamps = letterTimestamps[i - 1];
      prevTimestamp = prevTimestamps[prevTimestamps.length - 1];
    }

    for (let j = 0; j < typedWord.length; j++) {
      const typedLetter = typedWord[j];
      const refLetter = referenceWord[j] || "";
      const isCorrect = typedLetter === refLetter;
      const currentTimestamp = timestamps[j] || prevTimestamp;

      const delta = currentTimestamp - prevTimestamp;
      const letterSpeed = delta > 0 ? 60000 / delta : Infinity;

      letters.push({
        typedLetter,
        referenceLetter: refLetter,
        isCorrect,
        timeDelta: delta,
        letterSpeed,
      });

      prevTimestamp = currentTimestamp;
    }

    const missedLetters: string[] = [];
    const extraLetters: string[] = [];
    if (typedWord.length < referenceWord.length) {
      for (let j = typedWord.length; j < referenceWord.length; j++) {
        missedLetters.push(referenceWord[j]);
      }
    } else if (typedWord.length > referenceWord.length) {
      for (let j = referenceWord.length; j < typedWord.length; j++) {
        extraLetters.push(typedWord[j]);
      }
    }

    let wordTime = 0;
    if (timestamps.length > 0) {
      wordTime = timestamps[timestamps.length - 1] - timestamps[0];
    }
    const wordSpeed =
      wordTime > 0 ? (typedWord.length * 60000) / wordTime : Infinity;

    const isWordCorrect = typedWord === referenceWord;

    words.push({
      typedWord,
      referenceWord,
      letters,
      wordTime,
      wordSpeed,
      isWordCorrect,
      missedLetters,
      extraLetters,
    });
  }

  // Если endTime не передан, вычисляем его по последней метке времени последнего слова
  const finalEndTime =
    endTime ??
    (letterTimestamps.length > 0 &&
    letterTimestamps[letterTimestamps.length - 1].length > 0
      ? letterTimestamps[letterTimestamps.length - 1][
          letterTimestamps[letterTimestamps.length - 1].length - 1
        ]
      : startTime);

  const totalTime = finalEndTime - startTime;

  return {
    totalTime,
    words,
  };
};

export interface AggregateStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: string | number;
  totalTimeMinutes: number;
  errorsByLetter: Record<string, number>;
  wordsWithoutErrors: number;
  wordsWithErrors: number;
  correctChars: number;
  incorrectChars: number;
  missedChars: number;
  extraChars: number;
  avgWpm: number;
  maxWordWpm: number;
  minWordWpm: number;
}

export const computeAggregateStats = (
  detailedLog: DetailedTestLog
): AggregateStats => {
  let correctChars = 0;
  let incorrectChars = 0;
  let missedChars = 0;
  let extraChars = 0;
  let wordsWithoutErrors = 0;
  let wordsWithErrors = 0;
  let rawTypedChars = 0;
  let validTypedChars = 0;
  const errorsByLetter: Record<string, number> = {};
  const wordSpeeds: number[] = [];
  let totalWordSpeed = 0;

  detailedLog.words.forEach((wordStat) => {
    rawTypedChars += wordStat.typedWord.length;
    rawTypedChars += 1;

    if (wordStat.isWordCorrect) {
      wordsWithoutErrors++;
      validTypedChars += wordStat.typedWord.length;
      // +1 для пробела
      validTypedChars += 1;
    } else {
      wordsWithErrors++;

      wordStat.letters.forEach((letter) => {
        if (letter.isCorrect) {
          correctChars++;
          validTypedChars++;
        } else {
          incorrectChars++;
          errorsByLetter[letter.referenceLetter] =
            (errorsByLetter[letter.referenceLetter] || 0) + 1;
        }
      });
    }

    if (wordStat.isWordCorrect) {
      correctChars += wordStat.typedWord.length;
    }

    missedChars += wordStat.missedLetters.length;
    extraChars += wordStat.extraLetters.length;

    if (isFinite(wordStat.wordSpeed)) {
      wordSpeeds.push(wordStat.wordSpeed);
      totalWordSpeed += wordStat.wordSpeed;
    }
  });

  const totalTimeMinutes = detailedLog.totalTime / 60000;

  const wpm =
    totalTimeMinutes > 0
      ? Math.round(validTypedChars / 5 / totalTimeMinutes)
      : 0;
  const rawWpm =
    totalTimeMinutes > 0 ? Math.round(rawTypedChars / 5 / totalTimeMinutes) : 0;
  const totalChars = rawTypedChars;

  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

  // Рассчитываем стандартное отклонение скоростей по словам (consistency)
  let consistency: number | string = "N/A";
  if (wordSpeeds.length > 1) {
    const mean =
      wordSpeeds.reduce((acc, speed) => acc + speed, 0) / wordSpeeds.length;
    const variance =
      wordSpeeds.reduce((acc, speed) => acc + Math.pow(speed - mean, 2), 0) /
      wordSpeeds.length;
    consistency = Math.sqrt(variance).toFixed(2);
  }

  const avgWpm = wordSpeeds.length > 0 ? totalWordSpeed / wordSpeeds.length : 0;

  const minWordWpm = Math.min(...wordSpeeds);
  const maxWordWpm = Math.max(...wordSpeeds);

  return {
    wpm,
    rawWpm,
    accuracy,
    consistency,
    totalTimeMinutes,
    errorsByLetter,
    wordsWithoutErrors,
    wordsWithErrors,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,
    avgWpm,
    minWordWpm,
    maxWordWpm,
  };
};

export const generateStats = ({
  startTime,
  letterTimestamps,
  typedWords,
  needWords,
  endTime,
}: {
  startTime: number;
  letterTimestamps: number[][];
  typedWords: string[];
  needWords: string[];
  endTime?: number;
}) => {
  const detailedLog = generateDetailedTestLog({
    startTime,
    letterTimestamps,
    typedWords,
    needWords,
    endTime,
  });

  const aggregateStats = computeAggregateStats(detailedLog);

  return {
    detailedLog,
    aggregateStats,
  };
};
