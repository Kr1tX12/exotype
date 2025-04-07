import { motion } from "framer-motion";
import { WpmChart } from "@/shared/components/ui/wpm-chart";
import { useStore } from "@/store/store";
import { useStats } from "../../stats-provider";

export const MainStats = () => {
  const { rawWpmHistory, wpmHistory } = useStore((state) => state.stats);
  const { stats } = useStats();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      className="grid grid-cols-[170px_1fr] gap-6 max-xl:grid-cols-1 absolute inset-0"
    >
      <div className="bg-muted/30 py-4 px-2 rounded-xl justify-center flex flex-col gap-8 text-center max-xl:-order-1">
        <div>
          <p className="text-muted-foreground">WPM</p>
          <h1 className="text-5xl text-primary font-goblin-one">
            {Math.round(stats?.wpm ?? 0)}
          </h1>
        </div>
        <div>
          <p className="text-muted-foreground">Точность</p>
          <h1 className="text-5xl text-primary font-goblin-one">{stats?.accuracy ?? 0}%</h1>
        </div>
      </div>
      <div className="bg-muted/30 w-full min-w-96 rounded-xl py-4">
        <WpmChart rawWpmHistory={rawWpmHistory} wpmHistory={wpmHistory} />
      </div>
    </motion.div>
  );
};
