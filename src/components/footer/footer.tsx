import { GithubIcon, HelpCircle, Info } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const items = [
  {
    name: "Информация",
    icon: Info,
    link: "/info",
  },
  {
    name: "Guthub",
    icon: GithubIcon,
    link: "https://github.com/kr1tx/exotype",
  },
  {
    name: "Помощь",
    icon: HelpCircle,
    link: "/help",
  },
];
export const Footer = () => {
  return (
    <footer className="w-full bg-muted/30 py-4">
      <div className="container">
        <div className="flex gap-2">
          {items.map((item) => (
            <Button  key={item.name} variant="ghost" asChild>
              <Link href={item.link}>
                <item.icon />
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
        <div></div>
      </div>
    </footer>
  );
};
