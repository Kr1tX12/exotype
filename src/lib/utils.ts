import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const splitText = (text: string) => {
  let splittedText = [];

  let wordNow = '';
  for (let i = 0; i < text.length; i++) {
    wordNow += text[i];
    if (text[i] === " ") {
      splittedText.push(wordNow);
      wordNow = '';
    }
  }

  return splittedText;
}

