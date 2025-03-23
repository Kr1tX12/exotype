import { ThemeItem } from "./theme-item";
import { themes } from "@/themes/themes";

export const ThemeList = () => {
  return (
    <div className="flex flex-col gap-1">
      {themes.map((theme, index) => {
        return <ThemeItem key={index} theme={theme} />;
      })}
    </div>
  );
};
