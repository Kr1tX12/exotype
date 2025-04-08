"use client";

import { Button } from "@/shared/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { SignInButton } from "./subcomponents/sign-in-button";
import Link from "next/link";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LogOutIcon, LucideChevronsUpDown, Settings } from "lucide-react";
import { User } from "@/shared/components/ui/user";
import useBreakpoint from "@/shared/hooks/useBreakpoint";
import { HideOnTyping } from "@/shared/components/hide-on-typing";

export const UserPart = () => {
  const { data: session, status } = useSession();
  const isMobile = !useBreakpoint("md");

  if (status === "loading") {
    return (
      <div className="flex gap-2">
        <Skeleton className="w-32 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    );
  }

  return (
    <HideOnTyping className="flex gap-2">
      {!session ? (
        <SignInButton />
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isMobile ? "secondary" : "ghost"}
                className="flex gap-2 items-center px-3"
              >
                <User
                  name={session.user?.name ?? ""}
                  avatar={session.user?.image ?? ""}
                  adaptive
                >
                  <LucideChevronsUpDown />
                </User>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <User
                link="/profile"
                className="justify-start"
                name={session.user?.name ?? ""}
                avatar={session.user?.image ?? ""}
                email={session.user?.email ?? ""}
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted"
              >
                <Link href="/settings">
                  <Settings />
                  Настройки
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer hover:bg-muted"
              >
                <LogOutIcon />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </HideOnTyping>
  );
};
