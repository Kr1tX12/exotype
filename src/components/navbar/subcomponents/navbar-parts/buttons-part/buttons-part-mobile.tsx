import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HandMetal } from "lucide-react";
import { NavbarButtonsMobile } from "./subcomponents/navbar-buttons-mobile";

export const ButtonsPartMobile = () => {
  return (
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
  );
};
