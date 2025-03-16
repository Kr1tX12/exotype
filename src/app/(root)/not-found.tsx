"use client";

import { TypingEffect } from "@/components/ui/typing-effect";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();
  return (
    <div className="size-full flex gap-4 flex-col items-center justify-center">
      <Image alt="404" src="/404.png" width={200} height={200} />
      <div className="flex flex-col items-center">
        <TypingEffect typeSpeed={80} typing>
          НЕ НАЙДЕНО ЗДЕСЬ НИЧЕГО
        </TypingEffect>
        <p className="text-muted-foreground/50">
          Ты чё реально думал, что в {pathname.slice(1, pathname.length)} чё-то
          будет?
        </p>
      </div>
      <Button variant="secondary" onClick={() => alert("Hello world!")}>
        <HomeIcon />
        ДОМОЙ
      </Button>
    </div>
  );
};

export default NotFound;
