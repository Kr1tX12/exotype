import { IconArrowRight, IconRotate } from "@tabler/icons-react";
import { AlertCircle } from "lucide-react";

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
    <div className="flex gap-2 w-full justify-center">
      {items.map(({ Icon }, index) => (
        <button
          key={index}
          className="rounded-xl group p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <Icon className="transition-colors text-muted-foreground group-hover:text-foreground" />
        </button>
      ))}
    </div>
  );
};
