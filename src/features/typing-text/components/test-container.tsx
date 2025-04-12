import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { useTypingState } from "./typing-provider";
import { TRANSITION_DURATION } from "../typing-test.constants";

const containerVariants = (opacity: number, duration: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity, transition: { duration } },
});

export const TestContainer = ({
  children,
  isBlurred,
}: {
  children: ReactNode;
  isBlurred: boolean;
}) => {
  const animationOpacity = useTypingState((state) => state.animationOpacity);

  return (
    <motion.div
      className={cn(
        isBlurred ? "cursor-pointer blur-sm" : "cursor-none",
        "mb-36 transition-[--tw-blur] relative whitespace-pre-wrap text-[3rem] max-sm:text-[1.2rem] max-md:text-[2rem] max-lg:text-[2.5rem] max-xl:text-[2.7rem] leading-snug flex flex-col gap-2 w-full"
      )}
      variants={containerVariants(animationOpacity, TRANSITION_DURATION)}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};
