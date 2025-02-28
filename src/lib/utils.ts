import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomArrayElement = (arr: unknown[]) => {
  if (arr.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * arr.length);
  
  return arr[randomIndex];
}
