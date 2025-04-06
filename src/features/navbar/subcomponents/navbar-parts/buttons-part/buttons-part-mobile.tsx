import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { HandMetal } from "lucide-react";
import { NavbarButtonsMobile } from "./subcomponents/navbar-buttons-mobile";
import { HideOnTyping } from "@/shared/components/hide-on-typing";

export const ButtonsPartMobile = () => {
  return (
    <HideOnTyping>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button size="icon" variant="secondary">
            <HandMetal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col md:hidden">
          <NavbarButtonsMobile />
        </DropdownMenuContent>
      </DropdownMenu>
    </HideOnTyping>
  );
};
