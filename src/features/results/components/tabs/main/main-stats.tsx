import { Keyboard } from "@/features/keyboard/keyboard";
import { motion } from "framer-motion";
import { WpmChart } from "@/components/ui/wpm-chart";
import { useStore } from "@/store/store";

export const MainStats = ({
  wpm,
  accuracy,
}: {
  wpm: number;
  accuracy: number;
}) => {
  const { rawWpmHistory, wpmHistory } = useStore((state) => state.stats);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      className="grid grid-cols-[1fr_170px_1fr] gap-6 max-xl:grid-cols-1 absolute inset-0"
    >
      <div className="bg-muted/30 w-full min-w-96 rounded-xl py-4 px-9">
        <WpmChart rawWpmHistory={rawWpmHistory} wpmHistory={wpmHistory} />
      </div>
      <div className="bg-muted/30 py-4 px-2 rounded-xl justify-center flex flex-col gap-8 text-center max-xl:-order-1">
        <div>
          <p className="text-muted-foreground">WPM</p>
          <h1 className="text-5xl text-primary">{Math.round(wpm)}</h1>
        </div>
        <div>
          <p className="text-muted-foreground">Точность</p>
          <h1 className="text-5xl text-primary">{accuracy}%</h1>
        </div>
      </div>
      <div className="bg-muted/30 w-full rounded-xl p-9 min-w-96 flex items-center justify-center">
        <Keyboard scale={0.9} />
      </div>
    </motion.div>
  );
};
