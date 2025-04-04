import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createTypedTextSlice, TypedTextSlice } from "./slices/typedText";
import { createTargetTextSlice, TargetTextSlice } from "./slices/targetText";
import {
  createTypingParamsSlice,
  TypingParamsSlice,
} from "./slices/typingParams";
import {
  createIsTestReloadingSlice,
  IsTestReloadingSlice,
} from "./slices/isTestReloading";
import { createIsTestEndSlice, IsTestEndSlice } from "./slices/isTestEnd";
import { createTimingsSlice, TimingsSlice } from "./slices/timings";
import { createStatsSlice, StatsSlice } from "./slices/stats";

export type StoreState = TargetTextSlice &
  TypedTextSlice &
  TypingParamsSlice &
  IsTestReloadingSlice &
  IsTestEndSlice &
  TimingsSlice &
  StatsSlice;

export const useStore = create<StoreState>()(
  persist(
    devtools((...a) => ({
      ...createTargetTextSlice(...a),
      ...createTypedTextSlice(...a),
      ...createIsTestReloadingSlice(...a),
      ...createIsTestEndSlice(...a),
      ...createTimingsSlice(...a),
      ...createTypingParamsSlice(...a),
      ...createStatsSlice(...a),
    })),
    {
      name: "store",
      partialize: (state) => ({ typingParams: state.typingParams }),
    }
  )
);
