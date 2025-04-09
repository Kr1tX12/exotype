'use client';

import { ErrorModal } from "@/widgets/error-modal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Critical error",
};
const NotFound = () => {
  return <ErrorModal title="System message" description={`Critical error`} />;
};

export default NotFound;
