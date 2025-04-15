"use client";

import { useIsTyping } from "@/shared/hooks/useIsTyping";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

interface HideOnTypingProps extends HTMLMotionProps<"div"> {
  reverse?: boolean;
}
export const HideOnTyping = forwardRef<HTMLDivElement, HideOnTypingProps>(
  ({ reverse = false, ...props }, ref) => {
    const isTyping = useIsTyping();
    const opacity = reverse ? (isTyping ? 1 : 0) : isTyping ? 0 : 1;

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
