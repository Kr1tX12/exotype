"use client";

import { Leaderboard } from "@/features/leaderboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeadearboardModal() {
  const [open, setOpen] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/leaderboard") setOpen(false);
    else setOpen(true);
  }, [pathname]);

  return (
    <Dialog
      open={open}
      defaultOpen
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) router.back();
      }}
    >
      <DialogContent className="block" fullscreen>
        <DialogHeader hidden className="h-0">
          <DialogTitle hidden>Leaderboard</DialogTitle>
          <DialogDescription hidden>
            This is the leaderboard modal
          </DialogDescription>
        </DialogHeader>
        <Leaderboard isModal />
      </DialogContent>
    </Dialog>
  );
}
