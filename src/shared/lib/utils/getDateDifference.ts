export const getDateDifference = (date1: string, date2: string) => {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();

  // Получаем разницу в миллисекундах
  return Math.abs(d1 - d2);
};
