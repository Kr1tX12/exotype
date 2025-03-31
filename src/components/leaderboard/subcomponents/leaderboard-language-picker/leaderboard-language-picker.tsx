import { Languages } from "@/constants";
import { LeaderboardLanguageItem } from "./leaderboard-language-item";

export const LeaderboardLanguagePicker = () => {
  return (
    <ul className="flex flex-col gap-2">
      {Object.values(Languages).map((language) => (
        <LeaderboardLanguageItem key={language} language={language} />
      ))}
    </ul>
  );
};
