import { PrimaryText } from "@/components/ui/primary-text";
import { SecondaryText } from "@/components/ui/secondary-text";
import React from "react";

export const ResultItem = ({
  children,
  label,
}: {
  children: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center cursor-pointer rounded-xl px-8 py-2">
      <SecondaryText>{label}</SecondaryText>
      <PrimaryText>{children}</PrimaryText>
    </div>
  );
};
