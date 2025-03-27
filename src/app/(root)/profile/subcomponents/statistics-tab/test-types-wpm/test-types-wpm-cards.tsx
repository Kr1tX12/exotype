
import React from "react";
import { TestWpmCard } from "./test-wpm-card";

export const TestTypesWpmCards = () => {
  return (
    <div className="grid grid-cols-6 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 origin-top">
      {[0, 1, 2, 4, 5, 6].map((elem, index) => (
        <TestWpmCard key={index} />
      ))}
    </div>
  );
};
