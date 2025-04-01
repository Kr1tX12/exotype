"use client";

import { LeafScene } from "./subcomponents/leaf-scene";

export default function FallingLeaves({ leafSrc }: { leafSrc: string }) {
  return (
    <div className="absolute inset-0 -z-20 bg-center bg-cover">
      <LeafScene leafSrc={leafSrc} />
    </div>
  );
}
