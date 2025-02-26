import { ChartColumn, Crown, GithubIcon, HelpCircle, KeyboardIcon, Languages, Settings, Terminal, User, ZapIcon } from "lucide-react";
import React from "react";
import { FloatingDock } from "../ui/floating-dock";

const items: {
  title: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    title: "Информация",
    icon: <ZapIcon className="size-full" />,
    href: "/info",
  },
  {
    title: "Guthub",
    icon: <GithubIcon className="size-full" />,
    href: "https://github.com/kr1tx/exotype",
  },
  {
    title: "Помощь",
    icon: <HelpCircle className="size-full" />,
    href: "/help",
  },
  {
    title: "Командная строка",
    icon: <Terminal className="size-full text-foreground opacity-100" />,
    href: "/command",
  },
  {
    title: "Настройки",
    icon: <Settings className="size-full" />,
    href: "/settings",
  },
  {
    title: "Язык сайта",
    icon: <Languages className="size-full" />,
    href: "/",
  },
  {
    title: "Лидерборды",
    icon: <Crown className="size-full" />,
    href: "/leaderboards",
  },
  {
    title: "Статистика",
    icon: <ChartColumn className="size-full" />,
    href: "/stats",
  },
  {
    title: "Клавиатура",
    icon: <KeyboardIcon className="size-full" />,
    href: "/keyboard",
  },
  {
    title: "Аккаунт",
    icon: <User className="size-full" />,
    href: "/user",
  },
];
export const Footer = () => {
  return (
    <footer className="w-full py-1 flex justify-center">
      <FloatingDock items={items} />
    </footer>
  );
};
