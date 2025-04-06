import { formatDate } from "@/shared/lib/utils";
import { forwardRef, HTMLProps, useEffect, useState } from "react";

interface InTimeTextProps extends Omit<HTMLProps<HTMLDivElement>, "ref"> {
  ms: number;
}
export const InTimeText = forwardRef<HTMLElement, InTimeTextProps>(
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
        {formatDate(ms)}
      </span>
    );
  }
);

InTimeText.displayName = "TimeAgoText";
