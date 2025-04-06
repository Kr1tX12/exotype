import { HideOnTyping } from "@/components/hide-on-typing";
import { NavbarButtons } from "./subcomponents/navbar-buttons";

export const ButtonsPart = () => {
  return (
    <HideOnTyping className="flex items-center max-md:hidden">
      <NavbarButtons />
    </HideOnTyping>
  );
};
