import { FloatingDock } from "../ui/floating-dock";
import { footerItems } from "./constants/footer.constants";


export const Footer = () => {
  return (
    <footer className="w-full py-1 flex justify-center">
      <FloatingDock items={footerItems} />
    </footer>
  );
};
