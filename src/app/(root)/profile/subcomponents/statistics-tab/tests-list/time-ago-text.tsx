import { timeAgo } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const TimeAgoText = ({ ms }: { ms: number }) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (Date.now() - ms > 3600000) return;

    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [ms]);

  return <span key={key}>{timeAgo(ms)}</span>;
};
