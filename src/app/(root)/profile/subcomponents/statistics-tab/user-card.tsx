"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDto } from "../../hooks/useUserBySlug";

export const UserCard = ({ user }: { user?: UserDto }) => {
  if (!user) {
    return <Skeleton className="h-20 w-full" />;
  }

  const { username, avatar } = user;

  return (
    <div className="bg-muted/30 rounded-xl flex gap-2 items-center px-4 py-4 pr-12">
      <div>
        <Avatar className="size-10">
          <AvatarImage src={avatar ?? undefined} />
          <AvatarFallback>{username?.slice(0, 1) ?? "Z"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl leading-none font-medium">
          {username ?? "ZTyper"}
        </h3>
        <p className="text-xs text-muted-foreground leading-none">
          Level 10 - Master
        </p>
      </div>
    </div>
  );
};
