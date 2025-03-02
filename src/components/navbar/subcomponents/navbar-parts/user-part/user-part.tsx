"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { SignInButton } from "./subcomponents/sign-in-button";
import { SignOutButton } from "./subcomponents/sign-out-button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

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
          <Button
            variant="ghost"
            className="flex gap-2 items-center rounded-full pl-2 pr-4"
            asChild
          >
            <Link href="/profile">
              <Avatar className="size-6">
                <AvatarImage src={session.user?.image ?? ""} />
                 <AvatarFallback>{session.user?.name?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <p>{session.user?.name}</p>
            </Link>
          </Button>
          <SignOutButton />
        </>
      )}
    </div>
  );
};
