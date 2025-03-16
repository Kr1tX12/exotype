"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { SignInButton } from "./subcomponents/sign-in-button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  LucideChevronsUpDown,
  Settings
} from "lucide-react";
import { User } from "@/components/ui/user";
export const UserPart = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex gap-2 justify-self-end">
        <Skeleton className="w-32 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-self-end">
      {!session ? (
        <SignInButton />
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex gap-2 items-center rounded-xl"
              >
                <User
                  name={session.user?.name ?? ""}
                  avatar={session.user?.image ?? ""}
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
              {/* <DropdownMenuItem><ChartColumn />Статистика</DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings />
                  Настройки
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};
