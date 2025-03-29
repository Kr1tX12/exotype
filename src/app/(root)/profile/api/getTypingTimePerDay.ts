export const getTypingTimePerDay = async () => {
  try {
    const response = await fetch("/api/typing-time-per-day", {
      next: { revalidate: 30 },
    });
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};
