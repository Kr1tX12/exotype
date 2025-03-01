"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { SignInButton } from "./subcomponents/sign-in-button";
import { SignOutButton } from "./subcomponents/sign-out-button";

export const UserPart = () => {
  const session = useSession();

  console.log(session);
  return !session.data ? (
    <SignInButton />
  ) : (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className="flex gap-2 items-center rounded-full pl-2 pr-4"
        onClick={() => signIn("google")}
      >
        <Avatar className="size-6">
          <AvatarImage src="https://steamuserimages-a.akamaihd.net/ugc/1829021847896261773/37F2A2ECEB5F12C10797217A966289072EF0F4F1/?imw=512&imh=382&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" />
        </Avatar>
        <p>kr1tx</p>
      </Button>
      <SignOutButton />
    </div>
  );
};
