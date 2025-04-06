import { useTheme } from "@/shared/components/theme-provider";
import { Theme } from "@/shared/themes/themes";
import { Check } from "lucide-react";

export const ThemeItem = ({ theme }: { theme: Theme }) => {
  const { setTheme, theme: themeNow } = useTheme();
  const isChosen = theme.name === themeNow;

  const handleSetTheme = () => {
    setTheme(theme.name);
  };

  return (
    <div
      onClick={handleSetTheme}
      className="w-full hover:bg-muted transition-colors px-3 py-1 rounded-xl cursor-pointer flex gap-1.5 items-center border"
      style={{
        background: `hsl(${theme.colors.background})`,
        color: `hsl(${theme.colors.foreground})`,
        borderColor: `hsl(${theme.colors.border})`,
      }}
    >
      <div
        className="size-4 rounded-full grid place-items-center"
        style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
      >
        <Check
          className="size-3"
          style={{
            opacity: isChosen ? 1 : 0,
            color: `hsl(${theme.colors.background})`,
          }}
        />
      </div>

      {theme.name.replaceAll("-", " ")}
    </div>
  );
};
