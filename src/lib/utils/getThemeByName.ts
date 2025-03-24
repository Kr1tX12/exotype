import { Theme, themes } from "@/themes/themes";

export function getThemeByName(name: string): Theme | null {
  return themes.find((theme) => theme.name === name) || null;
}
