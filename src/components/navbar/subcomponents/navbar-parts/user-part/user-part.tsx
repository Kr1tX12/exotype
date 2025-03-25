"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { SignInButton } from "./subcomponents/sign-in-button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, LucideChevronsUpDown, Settings } from "lucide-react";
import { User } from "@/components/ui/user";
import useBreakpoint from "@/hooks/useBreakpoint";

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
    <div className="flex gap-2">
      {!session ? (
        <SignInButton />
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isMobile ? "secondary" : "ghost"}
                className="flex gap-2 items-center rounded-xl px-3"
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
    </div>
  );
};
