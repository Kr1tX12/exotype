import { HideOnTyping } from "@/components/hide-on-typing";
import { FloatingDock } from "../../components/ui/floating-dock";
import { footerItems } from "./constants/footer.constants";

export const Footer = () => {
  return (
    <HideOnTyping className="w-full py-1 flex justify-center">
      <FloatingDock items={footerItems} />
    </HideOnTyping>
  );
};
