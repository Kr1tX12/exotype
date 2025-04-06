"use client";

import { useIsTyping } from "@/hooks/useIsTyping";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

export const HideOnTyping = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  (props, ref) => {
    const opacity = useIsTyping() ? 0 : 1;

    return (
      <motion.div
        ref={ref}
        {...props}
        animate={{ opacity, pointerEvents: opacity ? "auto" : "none" }}
        transition={{ duration: 0.15 }}
      />
    );
  }
);

HideOnTyping.displayName = "HideOnTyping";
