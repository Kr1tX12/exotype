import { RawTheme, Theme, ThemeTag } from "@/shared/themes/themes";

export const groupThemesByTag = ({
  themes,
}: {
  themes: readonly RawTheme[];
}) => {
  return themes.reduce<Record<ThemeTag, Theme[]>>((acc, theme) => {
    if (!acc[theme.tag]) {
      acc[theme.tag] = [];
    }
    acc[theme.tag].push(theme as Theme);
    return acc;
  }, {} as Record<ThemeTag, Theme[]>);
};
