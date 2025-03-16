import { LockIcon, ShieldIcon } from "lucide-react";
import React from "react";
import { FloatingDock } from "../ui/floating-dock";

const items: {
  title: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    title: "Политика конфедициальности",
    icon: <LockIcon className="size-full" />,
    href: "/policies?tab=0",
  },
  {
    title: "Условия пользования",
    icon: <ShieldIcon className="size-full" />,
    href: "/policies?tab=1",
  },
];
export const Footer = () => {
  return (
    <footer className="w-full py-1 flex justify-center">
      <FloatingDock items={items} />
    </footer>
  );
};
