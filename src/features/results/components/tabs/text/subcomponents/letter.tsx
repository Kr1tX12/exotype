import { LetterStat } from "@/lib/utils/test-stats-generator";

export const Letter = ({ letter }: { letter: LetterStat }) => {
  return <span>{letter.referenceLetter}</span>;
};
