export const generateTestStats = ({
  startTime,
  endTime,
  typedWords,
  needWords,
  rawWpmHistory,
}: {
  startTime: number;
  endTime: number;
  typedWords: string[];
  needWords: string[];
  rawWpmHistory: number[];
}) => {
  const totalTimeMinutes = (endTime - startTime) / 1000 / 60;
  let totalChars = 0;
  let correctChars = 0;
  let validTypedChars = 0;
  let rawTypedChars = 0;
  let missedChars = 0;
  let extraChars = 0;
  let incorrectChars = 0;
  let wordsWithoutErrors = 0;
  let wordsWithErrors = 0;
  const errorLetters: Record<string, number> = {};

  typedWords.forEach((typedWord, index) => {
    const referenceWord = needWords[index] || "";
    let wordCorrectChars = 0;
    let hasErrors = false;

    for (let i = 0; i < typedWord.length; i++) {
      if (typedWord[i] === referenceWord[i]) {
        wordCorrectChars++;
      } else {
        hasErrors = true;
        errorLetters[referenceWord[i]] =
          (errorLetters[referenceWord[i]] || 0) + 1;
        incorrectChars++;
        break; // После первой ошибки символы уже не считаем
      }
    }
    
    if (!hasErrors) {
      wordsWithoutErrors++;
    } else {
      wordsWithErrors++;
    }
    
    // Подсчет количества пропущенных и лишних символов
    if (typedWord.length < referenceWord.length) {
      missedChars += referenceWord.length - typedWord.length;
    } else if (typedWord.length > referenceWord.length) {
      extraChars += typedWord.length - referenceWord.length;
    }
    
    totalChars += typedWord.length;
    correctChars += wordCorrectChars + 1;
    validTypedChars += wordCorrectChars;
    rawTypedChars += typedWord.length; // Raw учитывает вообще все набранные символы
  });

  const finalWpm =
    totalTimeMinutes > 0
      ? Math.round(validTypedChars / 5 / totalTimeMinutes)
      : 0;
  const rawWpm =
    totalTimeMinutes > 0 ? Math.round(rawTypedChars / 5 / totalTimeMinutes) : 0;
  const finalAccuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

  // Consistency — стандартное отклонение WPM
  const meanWpm =
    rawWpmHistory.length > 0
      ? rawWpmHistory.reduce((a, b) => a + b, 0) / rawWpmHistory.length
      : 0;
  const consistency =
    rawWpmHistory.length > 1
      ? Math.sqrt(
          rawWpmHistory.reduce(
            (sum, wpm) => sum + Math.pow(wpm - meanWpm, 2),
            0
          ) / rawWpmHistory.length
        ).toFixed(2)
      : "N/A";

  return {
    wpm: finalWpm,
    rawWpm,
    accuracy: finalAccuracy,
    consistency,
    totalTime: totalTimeMinutes,
    errorsByLetter: errorLetters,
    wordsWithoutErrors,
    wordsWithErrors,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,
  };
};
