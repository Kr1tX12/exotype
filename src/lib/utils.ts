import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomArrayElement = <T>(arr: T[]) => {
  if (arr.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const capitalize = (word: string) => {
  return String(word).charAt(0).toUpperCase() + String(word).slice(1);
};

export const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000);

  const secStr = seconds.toString();
  const minStr = minutes.toString();
  const hourStr = hours.toString();

  if (hours > 0) {
    return `${hourStr}ч. ${minStr}мин. ${secStr}с.`;
  } else if (minutes > 0) {
    return `${minStr} мин. ${secStr} с.`;
  } else {
    return `${seconds}с.`;
  }
};

export const formatDate = (ms: number, locale: string = "ru-RU") => {
  return new Date(ms).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

function getPlural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) {
    return many;
  }
  if (mod10 === 1) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }
  return many;
}

export const timeAgo = (timestamp: number) => {
  const now = Date.now();
  // Разница в секундах
  const diff = Math.floor((now - timestamp) / 1000);

  if (diff < 60) {
    // Секунды
    return `${diff} ${getPlural(diff, "секунда", "секунды", "секунд")} назад`;
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    // Минуты
    return `${minutes} ${getPlural(
      minutes,
      "минута",
      "минуты",
      "минут"
    )} назад`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    // Часы
    return `${hours} ${getPlural(hours, "час", "часа", "часов")} назад`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    // Дни
    return `${days} ${getPlural(days, "день", "дня", "дней")} назад`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    // Месяцы
    return `${months} ${getPlural(months, "месяц", "месяца", "месяцев")} назад`;
  }

  const years = Math.floor(months / 12);
  // Годы
  return `${years} ${getPlural(years, "год", "года", "лет")} назад`;
};

export const getEnglishOrdinal = (number: number) => {
  const j = number % 10;
  const k = number % 100;

  if (j === 1 && k !== 11) {
    return `st`;
  }
  if (j === 2 && k !== 12) {
    return `nd`;
  }
  if (j === 3 && k !== 13) {
    return `rd`;
  }
  return `th`;
};
