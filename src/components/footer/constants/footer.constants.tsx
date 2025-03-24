import { IconBrandGithub } from "@tabler/icons-react";
import { LockIcon, ShieldIcon } from "lucide-react";

export const footerItems: {
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
  {
    title: "Репозиторий exotype",
    icon: <IconBrandGithub className="size-full" />,
    href: "https://github.com/Kr1tX12/exotype",
  },
];
