import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const User = ({
  className,
  name,
  avatar,
  children,
  email,
  link,
}: {
  className?: string;
  name: string;
  avatar: string;
  children?: ReactNode;
  email?: string;
  link?: string;
}) => {
  return link ? (
    <Link
      href={link}
      className={cn("flex gap-1.5 items-center hover:bg-muted/50 px-4 py-2 rounded-xl transition-colors", className)}
    >
      <UserInfo name={name} avatar={avatar} email={email}>
        {children}
      </UserInfo>
    </Link>
  ) : (
    <div className={cn("flex gap-1.5 justify-between items-center", className)}>
      <UserInfo name={name} avatar={avatar} email={email}>
        {children}
      </UserInfo>
    </div>
  );
};

const UserInfo = ({
  name,
  avatar,
  children,
  email,
}: {
  name: string;
  avatar: string;
  children?: ReactNode;
  email?: string;
}) => {
  return (
    <>
      <Avatar className="size-7">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col leading-3">
        <p className="font-bold text-sm truncate">{name}</p>
        {email && <p className="text-muted-foreground text-[0.6rem] truncate">{email}</p>}
      </div>
      {children}
    </>
  );
};
