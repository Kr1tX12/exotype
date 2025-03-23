import { createContext, useContext, useEffect, useState } from "react";
import { themes } from "@/themes/themes";

type ThemeContextProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  const applyTheme = (themeName: string) => {
    const selectedTheme =
      themes.find((t) => t.name === themeName) || themes[0];

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
