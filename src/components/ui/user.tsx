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
  adaptive = false,
}: {
  className?: string;
  name: string;
  avatar: string;
  children?: ReactNode;
  email?: string;
  link?: string;
  adaptive?: boolean;
}) => {
  return link ? (
    <Link
      href={link}
      className={cn(
        "flex gap-1.5 items-center hover:bg-muted/50 px-4 py-2 rounded-xl transition-colors",
        className
      )}
    >
      <UserInfo name={name} avatar={avatar} email={email}>
        {children}
      </UserInfo>
    </Link>
  ) : (
    <div className={cn("flex gap-1.5 justify-between items-center", className)}>
      <UserInfo name={name} avatar={avatar} email={email} adaptive={adaptive}>
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
  adaptive,
}: {
  name: string;
  avatar: string;
  children?: ReactNode;
  email?: string;
  adaptive?: boolean;
}) => {
  return (
    <>
      <Avatar className="size-7">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div
        className={cn("flex flex-col leading-3", adaptive && "max-sm:hidden")}
      >
        <p
          className={cn(
            "font-bold text-sm truncate",
            adaptive ? "xl:max-w-80 max-2xl:max-w-72 max-xl:max-w-52 max-lg:max-w-28 max-md:max-w-44" : "max-w-44"
          )}
        >
          {name}
        </p>
        {email && (
          <p className="text-muted-foreground text-[0.6rem] truncate">
            {email}
          </p>
        )}
      </div>
      {children}
    </>
  );
};
