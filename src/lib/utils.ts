import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomArrayElement = <T>(arr: T[]) => {
  if (arr.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * arr.length);
  
  return arr[randomIndex];
}


export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
}

export const capitalize = (word: string) => {
  return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}