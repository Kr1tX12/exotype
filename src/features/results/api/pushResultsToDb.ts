export const pushResultsToDb = ({
  typedText,
  targetText,
  startTestTime,
  endTestTime,
  testType,
  testValue,
  punctuation,
  dictionary,
  wpm,
}: {
  typedText: string;
  targetText: string;
  startTestTime: number;
  endTestTime: number;
  testType: string;
  testValue: number;
  punctuation: boolean;
  dictionary: number;
  wpm: number;
}) => {
  console.log("%c[IMPORTANT] Pushing the test results to DB", 'color: lightgreen; background: darkslategray');
  try {
    fetch("/api/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typedText,
        targetText,
        startTestTime,
        endTestTime,
        testType,
        testValue,
        punctuation,
        dictionary,
        wpm,
      }),
    });
  } catch (err: unknown) {
    console.error(err);
  }
};
