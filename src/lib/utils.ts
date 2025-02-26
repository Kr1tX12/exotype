import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitText = (text: string) => {
  const splittedText = [];

  let wordNow = '';
  for (let i = 0; i < text.length; i++) {
    wordNow += text[i];
    if (text[i] === " ") {
      splittedText.push(wordNow);
      wordNow = '';
    }
  }
  splittedText.push(wordNow);

  return splittedText;
}

export const getRandomArrayElement = (arr: unknown[]) => {
  if (arr.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * arr.length);
  
  return arr[randomIndex];
}
