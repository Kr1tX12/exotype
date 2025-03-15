import { CopyIcon } from "lucide-react";

export const TextToolsGroup = () => {
  return (
    <div className="flex gap-4">
      <button
        className="rounded-xl group p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <CopyIcon size={16} className="transition-colors text-muted-foreground group-hover:text-foreground" />
      </button>
    </div>
  );
};
