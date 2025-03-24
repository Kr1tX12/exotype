import React, { Fragment, useMemo } from "react";
import { groupThemesByTag } from "../utils/groupThemesByTag";
import { ThemeItem } from "./theme-item";
import { themes } from "@/themes/themes";
import { ThemeGroupTitle } from "./theme-group-title";

export const ThemeList = () => {
  const groupedThemes = useMemo(() => groupThemesByTag({ themes }), []);

  return (
    <div className="flex flex-col gap-1">
      {Object.entries(groupedThemes).map((group, groupIndex) => {
        return (
          <Fragment key={groupIndex}>
            <ThemeGroupTitle key={`title`}>{group[0]}</ThemeGroupTitle>
            {group[1].map((theme, index) => (
              <ThemeItem key={`${index}`} theme={theme} />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
};
