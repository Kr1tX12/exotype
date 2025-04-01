import { Languages } from "@/constants";
import { getFullLanguageName } from "@/lib/utils/getFullLanguageName";
import React from "react";

export const LeaderboardLanguageItem = ({
  language,
}: {
  language: Languages;
}) => {
  const languageName = getFullLanguageName(language);

  return (
    <div className="bg-muted/30 rounded-xl w-48 py-2 grid place-content-center hover:bg-muted/50 transition-colors cursor-pointer">
      {languageName}
    </div>
  );
};
