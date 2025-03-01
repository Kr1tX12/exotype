"use server";

import { signIn } from "next-auth/react";

export const signInGoogle = async () => {
  await signIn("google");
};
