import { motion } from "framer-motion";
import { useTypingState } from "./typing-provider";
import { useStore } from "@/store/store";

export const StatsDisplayer = () => {
  const opacity = useStore((state) => state.typedText).length > 0 ? 1 : 0;
  const wpm = useTypingState((state) => state.wpm);
  
  return (
    <>
      <motion.div
        animate={{ opacity }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex gap-4"
      >
        <div className="flex flex-col items-center leading-none text-primary">
          <p className="text-3xl font-medium">{wpm}</p>
        </div>
      </motion.div>
    </>
  );
};

StatsDisplayer.displayName = "StatsDisplayer";
