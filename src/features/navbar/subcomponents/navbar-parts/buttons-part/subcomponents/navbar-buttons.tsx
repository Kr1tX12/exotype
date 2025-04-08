import { ThemeSwitcher } from "@/features/theme-switcher";
import { Button } from "@/shared/components/ui/button";
import { Crown, Settings } from "lucide-react";
import Link from "next/link";

export const NavbarButtons = () => {
  return (
    <>
      <Button size="icon" variant="ghost" asChild>
        <Link href="/settings">
          <Settings className="size-10" />
        </Link>
      </Button>
      <ThemeSwitcher />
      <Button variant="ghost" size="icon" asChild>
        <Link href="/leaderboard">
          <Crown className="size-10" />
        </Link>
      </Button>
    </>
  );
};
