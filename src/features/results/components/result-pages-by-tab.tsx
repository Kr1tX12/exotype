import { AnimatePresence } from "framer-motion";
import { MainStats } from "./tabs/main/main-stats";
import { TextTab } from "./tabs/text/text-tab";

export const ResultPagesByTab = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="w-full h-72 overflow-y-auto relative">
      <AnimatePresence mode="popLayout">
        {
          {
            "0": <MainStats key={0} />,
            "1": <TextTab />,
          }[activeIndex]
        }
      </AnimatePresence>
    </div>
  );
};
