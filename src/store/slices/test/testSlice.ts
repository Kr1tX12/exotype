import { StateCreator } from "zustand";
import { createIsTestEndSlice, IsTestEndSlice } from "./subslices/isTestEnd";
import {
  createIsTestReloadingSlice,
  IsTestReloadingSlice,
} from "./subslices/isTestReloading";
import { createStatsSlice, StatsSlice } from "./subslices/stats";
import { createTargetTextSlice, TargetTextSlice } from "./subslices/targetText";
import { createTimingsSlice, TimingsSlice } from "./subslices/timings";
import { createTypedTextSlice, TypedTextSlice } from "./subslices/typedText";
import {
  createTypingParamsSlice,
  TypingParamsSlice,
} from "./subslices/typingParams";
import { StoreState } from "@/store/store";
import {
  createTargetWordsSlice,
  TargetWordsSlice,
} from "./subslices/targetWords";

export type TestSlice = TargetTextSlice &
  TypedTextSlice &
  TypingParamsSlice &
  IsTestReloadingSlice &
  IsTestEndSlice &
  TimingsSlice &
  StatsSlice &
  TargetWordsSlice;

export const createTestSlice: StateCreator<StoreState, [], [], TestSlice> = (
  ...a
) => ({
  ...createTargetTextSlice(...a),
  ...createTypedTextSlice(...a),
  ...createIsTestReloadingSlice(...a),
  ...createIsTestEndSlice(...a),
  ...createTimingsSlice(...a),
  ...createTypingParamsSlice(...a),
  ...createStatsSlice(...a),
  ...createTargetWordsSlice(...a),
});
