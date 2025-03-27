export const getLastUserTests = async () => {
  try {
    const res = await fetch("/api/tests", { next: { revalidate: 60 } });
    const tests = await res.json();
    return tests;
  } catch (err) {
    console.log(err);
    return { error: "Не удалось загрузить тесты" };
  }
};
