import React from "react";
import { SpeedChart } from "../../charts/speed-chart";
import { Keyboard } from "@/components/keyboard/keyboard";
import { motion } from "framer-motion";

export const MainStats = ({
  wpm,
  accuracy,
}: {
  wpm: number;
  accuracy: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      className="grid grid-cols-[1fr_170px_1fr] gap-6 max-xl:grid-cols-1 absolute inset-0"
    >
      <div className="bg-muted/30 w-full min-w-96 rounded-xl py-4 px-9">
        <SpeedChart />
      </div>
      <div className="bg-muted/30 py-4 px-2 rounded-xl justify-center flex flex-col gap-8 text-center max-xl:-order-1">
        <div>
          <p className="text-muted-foreground">WPM</p>
          <h1 className="text-5xl text-primary">{wpm}</h1>
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
