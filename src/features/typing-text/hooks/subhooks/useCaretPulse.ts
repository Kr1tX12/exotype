import { useState, useRef, useEffect } from "react";

export const useCaretPulse = (delay = 1000) => {
  const [isPulsing, setIsPulsing] = useState(true);
  const pulseTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = () => {

      setIsPulsing(false);
      if (pulseTimeout.current) {
        clearTimeout(pulseTimeout.current);
      }

      pulseTimeout.current = setTimeout(() => {
        setIsPulsing(true);
      }, delay);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (pulseTimeout.current) {
        clearTimeout(pulseTimeout.current);
      }
    };
  }, [delay]);

  return isPulsing;
};
