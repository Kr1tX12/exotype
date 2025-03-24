import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Link from "next/link";

export const NavbarButtons = ({ full = false }: { full?: boolean }) => {

  return (
    <>
      <Button
        variant="ghost"
        className={cn("rounded-xl", full || "size-11")}
        size={full ? "sm" : "default"}
        asChild
      >
        <Link href="/settings">
          <Settings className="size-10" />
          {full && "Настройки"}
        </Link>
      </Button>
      <ThemeSwitcher full />
    </>
  );
};
