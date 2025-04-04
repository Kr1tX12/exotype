"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export const TypingEffect = ({
  children,
  typeSpeed = 400,
  eraseSpeed = 50,
  pause = 400,
  initialIndex = 0,
  typing = false,
}: {
  children: string;
  typeSpeed?: number;
  eraseSpeed?: number;
  pause?: number;
  typing?: boolean;
  initialIndex?: number;
}) => {
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!typing && index === initialIndex && isTyping) return;
    if (isTyping) {
      if (index < children.length) {
        timeout = setTimeout(() => setIndex(index + 1), typeSpeed);
      } else {
        timeout = setTimeout(() => setIsTyping(false), pause);
      }
    } else {
      if (index > 0) {
        timeout = setTimeout(() => setIndex(index - 1), eraseSpeed);
      } else {
        timeout = setTimeout(() => setIsTyping(true), pause);
      }
    }
    return () => clearTimeout(timeout);
  }, [
    index,
    isTyping,
    children,
    typeSpeed,
    eraseSpeed,
    pause,
    typing,
    initialIndex,
  ]);

  return (
    <div className="relative inline-block text-[2.2rem]">
      {/* Фоновый текст – занимает место в потоке */}
      <p className="text-primary/50 font-medium m-0">{children}</p>
      {/* Набранный текст с кареткой – абсолютно позиционирован поверх фонового */}
      <div className="absolute top-0 left-0 w-full text-primary font-medium text-nowrap">
        <motion.span ref={spanRef}>{children.slice(0, index)}</motion.span>
        <motion.div
          layoutId={children}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block bg-primary rounded-full h-full"
          style={{
            width: "3px",
            height: "1em",
            verticalAlign: "middle",
          }}
        />
      </div>
    </div>
  );
};
