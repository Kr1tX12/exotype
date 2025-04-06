import { Languages } from "@/shared/constants";

export const getFullLanguageName = (language: Languages) => {
  return {
    en: "English",
    ru: "Russian",
    fr: "French",
    de: "German",
    it: "Italian",
  }[language];
};
