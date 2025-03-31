"use client";

import { Leaderboard } from "@/components/leaderboard/leaderboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React from "react";

export default function LeadearboardModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leaderboard</DialogTitle>
          <DialogDescription>This is the leaderboard modal</DialogDescription>
        </DialogHeader>
        <Leaderboard />
      </DialogContent>
    </Dialog>
  );
}
