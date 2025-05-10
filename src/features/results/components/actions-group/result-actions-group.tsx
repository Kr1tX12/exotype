import { useReloadTest } from "@/features/typing-text-old/hooks/subhooks/useReloadTest";
import { useStore } from "@/store/store";
import { IconArrowRight, IconRotate } from "@tabler/icons-react";
import { AlertCircle } from "lucide-react";

type ActionClickFnType = {
  reloadTest: (retry?: boolean) => Promise<void>;
  updateTestEnd: (value: boolean) => void;
};

const actions = [
  {
    Icon: IconRotate,
    onClick: ({ reloadTest, updateTestEnd }: ActionClickFnType) => {
      reloadTest(true);
      updateTestEnd(false);
    },
  },
  {
    Icon: IconArrowRight,
    onClick: ({ reloadTest, updateTestEnd }: ActionClickFnType) => {
      reloadTest();
      updateTestEnd(false);
    },
  },
  {
    Icon: AlertCircle,
    onClick: ({ reloadTest, updateTestEnd }: ActionClickFnType) => {
      reloadTest(true);
      updateTestEnd(false);
    },
  },
];

export const ResultActionsGroup = () => {
  const updateTestEnd = useStore((state) => state.updateTestEnd);
  const reloadTest = useReloadTest();

  return (
    <div className="flex gap-2 w-full justify-center">
      {actions.map(({ Icon, onClick }, index) => (
        <button
          key={index}
          onClick={() => onClick({ reloadTest, updateTestEnd })}
          className="rounded-xl group p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <Icon className="transition-colors text-muted-foreground group-hover:text-foreground" />
        </button>
      ))}
    </div>
  );
};
