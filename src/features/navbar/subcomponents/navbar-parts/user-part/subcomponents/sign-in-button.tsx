import { Discord } from "@/shared/components/icons/discord";
import { Github } from "@/shared/components/icons/github";
import { Google } from "@/shared/components/icons/google";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

type Provider = "google" | "github" | "discord";

const providers: { id: Provider; Icon: React.ElementType }[] = [
  { id: "google", Icon: Google },
  { id: "github", Icon: Github },
  { id: "discord", Icon: Discord },
];

export const SignInButton = () => {
  const [chosen, setChosen] = useState<Provider | null>(null);
  const [typedLabel, setTypedLabel] = useState("Как вам удобно?");

  const handleSignIn = (provider: Provider) => {
    setChosen(provider);
    signIn(provider);
  };

  useEffect(() => {
    if (chosen) {
      const providerName = chosen.charAt(0).toUpperCase() + chosen.slice(1);
      setTypedLabel("");
      let i = 0;
      const interval = setInterval(() => {
        setTypedLabel((prev) => prev + providerName[i]);
        i++;
        if (i >= providerName.length) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      setTypedLabel("Как вам удобно?");
    }
  }, [chosen]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" onClick={() => signIn("google")}>
          <LogIn />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="gap-0">
        <DropdownMenuLabel className="text-center flex justify-center items-center">
          <span className="relative">
            {typedLabel}
            <span
              className={cn(
                "absolute top-0 left-full w-[2px] h-full bg-foreground",
                !chosen && "animate-pulse"
              )}
            />
          </span>
        </DropdownMenuLabel>
        <div className="flex gap-2 py-2 px-4 w-48 rounded-lg">
          <AnimatePresence mode="popLayout">
            {providers.map(({ id, Icon }) =>
              !chosen || chosen === id ? (
                <motion.div layout key={id} exit={{ y: 50, opacity: 0 }}>
                  <Button
                    disabled={Boolean(chosen)}
                    className={cn(
                      chosen ? "w-40" : undefined,
                      "rounded-lg bg-white hover:bg-white/70"
                    )}
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
