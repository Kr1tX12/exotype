import { SimplifiedTest, SimplifiedUser } from "@/types/types";
import { TypedText } from "./subcomponents/typed-text";
import { User } from "@/components/ui/user";
import { ChevronRight } from "lucide-react";
import { GradientTransition } from "@/components/ui/gradient-transition";
import { TestStatsGroup } from "./subcomponents/test-stats-group";
import Link from "next/link";

export const TestInfoCard = ({
  test,
  user,
}: {
  test: SimplifiedTest;
  user?: SimplifiedUser;
}) => {
  const { typedText, targetText } = test;

  return (
    <div className="flex flex-col items-start gap-4">
      <Link
        href={`/profile/${user?.slug}`}
        className="bg-muted/30 rounded-xl hover:bg-muted/40 cursor-pointer px-3 py-3 hover:scale-[.98] group transition-all"
      >
        <User name={user?.username ?? ""} avatar={user?.avatar ?? ""}>
          <ChevronRight
            className="mr-1 group-hover:ml-1 group-hover:mr-0 transition-all"
            size={14}
          />
        </User>
      </Link>
      <div className="overflow-y-auto max-h-44 relative w-full">
        <GradientTransition direction="top" className="h-4" />
        <TypedText typedText={typedText} targetText={targetText} />
        <GradientTransition direction="bottom" className="h-4 translate-y-1" />
      </div>
      <div>
        <TestStatsGroup test={test} />
      </div>
    </div>
  );
};
