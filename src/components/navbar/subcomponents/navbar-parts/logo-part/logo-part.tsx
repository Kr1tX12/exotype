import { Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export const LogoPart = () => {
  return (
    <Link href="/" className="flex gap-1 items-center">
      <Zap />
      <div className="flex flex-col">
        <p className="text-2xl font-bold">exotype</p>
        <p className="text-muted-foreground text-[8px] -translate-y-1 ml-px">
          преодолей пределы печати
        </p>
      </div>
    </Link>
  );
};
