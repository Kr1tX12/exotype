import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Crown, Settings } from "lucide-react";
import Link from "next/link";

export const NavbarButtons = () => {
  return (
    <>
      <Button variant="ghost" className="rounded-xl size-11" asChild>
        <Link href="/settings">
          <Settings className="size-10" />
        </Link>
      </Button>
      <ThemeSwitcher />
      <Button variant="ghost" className="rounded-xl size-11" asChild>
        <Link href="/leaderboard">
          <Crown className="size-10" />
        </Link>
      </Button>
    </>
  );
};
