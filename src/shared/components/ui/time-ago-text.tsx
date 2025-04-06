import { timeAgo } from "@/shared/lib/utils";
import React, { forwardRef, HTMLProps, useEffect, useState } from "react";

interface TimeAgoTextProps extends Omit<HTMLProps<HTMLDivElement>, "ref"> {
  ms: number;
}
export const TimeAgoText = forwardRef<HTMLElement, TimeAgoTextProps>(
  ({ ms, ...rest }, ref) => {
    const [key, setKey] = useState(0);
    useEffect(() => {
      if (Date.now() - ms > 3600000) return;

      const interval = setInterval(() => {
        setKey((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [ms]);

    return (
      <span ref={ref} {...rest} key={key}>
        {timeAgo(ms)}
      </span>
    );
  }
);

TimeAgoText.displayName = "TimeAgoText";
