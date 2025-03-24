import { Theme, ThemeTag } from "@/themes/themes";

export const groupThemesByTag = ({ themes }: { themes: Theme[] }) => {
  return themes.reduce<Record<ThemeTag, Theme[]>>((acc, theme) => {
    if (!acc[theme.tag]) {
      acc[theme.tag] = [];
    }
    acc[theme.tag].push(theme);
    return acc;
  }, {} as Record<ThemeTag, Theme[]>);
};
