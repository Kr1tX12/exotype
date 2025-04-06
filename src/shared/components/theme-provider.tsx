import { createContext, useContext, useEffect, useState } from "react";
import { ThemeName, themes } from "@/shared/themes/themes";
import { getRandomArrayElement } from "@/shared/lib/utils";

type ThemeContextProps = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedTheme: ThemeName = localStorage.getItem("theme") as ThemeName;
      if (!storedTheme) {
        // Если пользователь первый раз на сайте даём ему рандом тему блять
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (isDarkMode) storedTheme = "darker-gray";
        else {
          storedTheme =
            getRandomArrayElement([
              "light",
              "lavander",
              "soft-meadow",
              "candy-apple",
              "sky-whisper",
            ] satisfies ThemeName[]) ?? "light";
        }
      }
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  const applyTheme = (themeName: string) => {
    const selectedTheme = themes.find((t) => t.name === themeName) || themes[0];

    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value as string);
    });

    document.documentElement.setAttribute("data-theme", themeName);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeName);
    }
  };

  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
