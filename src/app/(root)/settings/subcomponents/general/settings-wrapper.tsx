import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export const SettingsWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
};
