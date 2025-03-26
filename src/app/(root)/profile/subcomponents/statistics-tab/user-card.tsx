'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import React from "react";

export const UserCard = () => {
  const session = useSession();

  const { name, image } = session.data?.user ?? {};

  return (
    <div className="bg-muted/30 rounded-xl flex gap-2 items-center px-4 py-4 pr-12">
      <div>
        <Avatar className="size-10">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback>{name?.slice(0, 1) ?? "Z"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl leading-none font-medium">{name ?? "ZTyper"}</h3>
        <p className="text-xs text-muted-foreground leading-none">Level 10 - Master</p>
      </div>
    </div>
  );
};
