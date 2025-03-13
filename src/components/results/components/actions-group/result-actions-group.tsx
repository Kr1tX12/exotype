import { Button } from "@/components/ui/button";
import { IconArrowRight, IconRotate } from "@tabler/icons-react";
import { AlertCircle } from "lucide-react";
import React from "react";

const items = [
  {
    Icon: IconRotate,
  },
  {
    Icon: IconArrowRight,
  },
  {
    Icon: AlertCircle,
  },
];
export const ResultActionsGroup = () => {
  return (
    <div className="flex w-full justify-center">
      {items.map(({ Icon }, index) => (
        <button
          key={index}
          className="rounded-xl group p-4"
        >
          <Icon className="transition-colors group-hover:text-foreground" />
        </button>
      ))}
    </div>
  );
};
