import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <Button
      className="rounded-full"
      variant="ghost"
      size="icon"
      onClick={() => signOut()}
    >
      <LogOut />
    </Button>
  );
};
