import { Button } from "../ui/button";
import { Crown, Settings, Zap } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="container flex flex-col gap-4">
      <nav className="flex gap-8 justify-between items-center bg-muted/20 rounded-lg h-16 my-6 px-6">
        <div className="flex items-center">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Settings />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Crown />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Zap />
          </Button>
        </div>
        <Link href="/" className="flex gap-1 items-center">
          <Zap />
          <div className="flex flex-col">
            <p className="text-2xl font-bold">exotype</p>
            <p className="text-muted-foreground text-[8px] -translate-y-1 ml-px">
              преодолей пределы печати
            </p>
          </div>
        </Link>
        <div>
          <Button
            variant="ghost"
            className="flex gap-2 items-center rounded-full pl-2 pr-4"
          >
            <Avatar className="size-6">
              <AvatarImage src="https://steamuserimages-a.akamaihd.net/ugc/1829021847896261773/37F2A2ECEB5F12C10797217A966289072EF0F4F1/?imw=512&imh=382&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" />
            </Avatar>
            <p>kr1tx</p>
          </Button>
        </div>
      </nav>
    </header>
  );
};
