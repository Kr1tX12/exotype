"use client";

import { Leaderboard } from "@/components/leaderboard/leaderboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function LeadearboardModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent fullscreen>
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
