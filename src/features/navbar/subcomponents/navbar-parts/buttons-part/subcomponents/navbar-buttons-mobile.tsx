import { ThemeSwitcher } from "@/features/theme-switcher";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import Link from "next/link";

export const NavbarButtonsMobile = () => {
  return (
    <>
      <DropdownMenuItem asChild>
        <Button asChild size="sm" variant="ghost">
          <Link href="/settings">
            <Settings className="size-10" />
            Настройки
          </Link>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <ThemeSwitcher full />
      </DropdownMenuItem>
    </>
  );
};
