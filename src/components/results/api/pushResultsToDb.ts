export const pushResultsToDb = ({
  typedText,
  targetText,
  startTestTime,
  endTestTime,
  testType,
  testValue,
  punctuation,
  dictionary,
}: {
  typedText: string;
  targetText: string;
  startTestTime: number;
  endTestTime: number;
  testType: string;
  testValue: number;
  punctuation: boolean;
  dictionary: number;
}) => {
  console.log("PUSH DB TEST");
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
      }),
    });
  } catch (err: unknown) {
    console.error(err);
  }
};
