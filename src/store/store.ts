import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createTestSlice, TestSlice } from "./slices/test/testSlice";

export type StoreState = TestSlice;

export const useStore = create<StoreState>()(
  persist(
    devtools((...a) => ({
      test: {
        ...createTestSlice(...a),
      },
    })),
    {
      name: "store",
      partialize: (state) => ({ typingParams: state.typingParams }),
    }
  )
);
