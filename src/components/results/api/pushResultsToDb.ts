export const pushResultsToDb = ({
  typedText,
  targetText,
  startTestTime,
  endTestTime,
  testType,
  testValue,
}: {
  typedText: string;
  targetText: string;
  startTestTime: number;
  endTestTime: number;
  testType: string;
  testValue: number;
}) => {
  console.log("PUSH DB TEST");
  try {
    fetch("/api/test/push", {
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
      }),
    });
  } catch (err: unknown) {
    console.error(err);
  }
};
