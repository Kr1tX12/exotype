import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export const ButtonsPart = () => {
  return (
    <div className="flex items-center max-md:hidden">
      <Button variant="ghost" className="rounded-xl size-11" asChild>
        <Link href="/settings">
          <Settings className="size-10" />
        </Link>
      </Button>
      <ThemeSwitcher />
    </div>
  );
};
