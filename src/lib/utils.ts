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

  const secStr = seconds.toString().padStart(2, "0");
  const minStr = minutes.toString().padStart(2, "0");
  const hourStr = hours.toString();

  if (hours > 0) {
    return `${hourStr}:${minStr}:${secStr}`;
  } else if (minutes > 0) {
    return `${minStr}:${secStr}`;
  } else {
    return `${seconds}с`;
  }
};
