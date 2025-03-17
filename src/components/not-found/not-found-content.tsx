'use client';

import { HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { TypingEffect } from "../ui/typing-effect";
import Image from "next/image";
import Link from "next/link";

export const NotFoundContent = () => {
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
      <Link href="/">
        <Button variant="secondary">
          <HomeIcon />
          ДОМОЙ
        </Button>
      </Link>
    </div>
  );
};
