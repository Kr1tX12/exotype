import { Discord } from "@/components/icons/discord";
import { Github } from "@/components/icons/github";
import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

type Provider = "google" | "github" | "discord";

const providers: { id: Provider; Icon: React.ElementType }[] = [
  { id: "google", Icon: Google },
  { id: "github", Icon: Github },
  { id: "discord", Icon: Discord },
];

export const SignInButton = () => {
  const [chosen, setChosen] = useState<Provider | null>(null);

  const handleSignIn = (provider: Provider) => {
    setChosen(provider);
    signIn(provider);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" onClick={() => signIn("google")}>
          <LogIn />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="gap-0">
        <DropdownMenuLabel className="text-center">
          {chosen
            ? chosen.charAt(0).toUpperCase() + chosen.slice(1)
            : "Как вам удобно?"}
        </DropdownMenuLabel>
        <div className="flex gap-2 p-2 w-44">
          <AnimatePresence mode="popLayout">
            {providers.map(({ id, Icon }) =>
              !chosen || chosen === id ? (
                <motion.div layout key={id} exit={{ y: 50, opacity: 0 }}>
                  <Button
                    disabled={Boolean(chosen)}
                    className={chosen ? "w-40" : undefined}
                    size="sm"
                    onClick={() => handleSignIn(id)}
                  >
                    {chosen ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Icon size={25} />
                    )}
                  </Button>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
