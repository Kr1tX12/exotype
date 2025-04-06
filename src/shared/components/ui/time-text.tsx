import { formatTime, timeAgo } from "@/shared/lib/utils";
import { forwardRef, HTMLProps, useEffect, useState } from "react";

interface TimeTextProps extends Omit<HTMLProps<HTMLDivElement>, "ref"> {
  children: number;
  updateInterval?: number;
  type: "timeAgo" | "time" | "future";
}
export const TimeText = forwardRef<HTMLElement, TimeTextProps>(
  ({ children, type, updateInterval = 1000, ...rest }, ref) => {
    const [key, setKey] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setKey((prev) => prev + 1);
      }, updateInterval);

      return () => clearInterval(interval);
    }, [updateInterval]);

    return (
      <span ref={ref} {...rest} key={key}>
        {
          {
            timeAgo: timeAgo(children),
            time: formatTime(children),
            future: formatTime(children - Date.now()),
          }[type]
        }
      </span>
    );
  }
);

TimeText.displayName = "TimeAgoText";
