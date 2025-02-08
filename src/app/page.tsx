"use client";

import { TypingText } from "@/components/typing-test";

export default function Home() {
  return (
    <div className="h-96 container text-xl flex items-center select-none mt-10">
      <TypingText />
    </div>
  );
}
