
import React from "react";
import { TestWpmCard } from "./test-wpm-card";

export const TestTypesWpmCards = () => {
  return (
    <div className="flex gap-4">
      {[0, 1, 2, 4, 5, 6].map((elem, index) => (
        <TestWpmCard key={index} />
      ))}
    </div>
  );
};
