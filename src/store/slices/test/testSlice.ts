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
import {
  createWordsWithIndicesSlice,
  WordsWithIndicesSlice,
} from "./subslices/wordsWithIndices";
import { createTypedWordsSlice, TypedWordsSlice } from "./subslices/typedWords";
import {
  createStartEndWordsIndexSlice,
  StartEndWordsIndexSlice,
} from "./subslices/startEndWordsIndex";
import {
  createIsTestStartedSlice,
  IsTestStartedSlice,
} from "./subslices/isTestStarted";
import {
  createGlobalIndexSlice,
  GlobalIndexSlice,
} from "./subslices/globalIndex";
import {
  createDynamicStatsSlice,
  DynamicStatsSlice,
} from "./subslices/dynamicStats";
import {
  createDisplayedWordsSlice,
  DisplayedWordsSlice,
} from "./subslices/displayedWords";
import {
  CompleteWordsLengthSlice,
  createCompleteWordsLengthSlice,
} from "./subslices/completedWordsLenght";

export type TestSlice = TargetTextSlice &
  TypedTextSlice &
  TypingParamsSlice &
  IsTestReloadingSlice &
  IsTestEndSlice &
  TimingsSlice &
  StatsSlice &
  TargetWordsSlice &
  WordsWithIndicesSlice &
  TypedWordsSlice &
  StartEndWordsIndexSlice &
  IsTestStartedSlice &
  GlobalIndexSlice &
  DynamicStatsSlice &
  DisplayedWordsSlice &
  CompleteWordsLengthSlice;

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
  ...createWordsWithIndicesSlice(...a),
  ...createTypedWordsSlice(...a),
  ...createStartEndWordsIndexSlice(...a),
  ...createIsTestStartedSlice(...a),
  ...createGlobalIndexSlice(...a),
  ...createDynamicStatsSlice(...a),
  ...createDisplayedWordsSlice(...a),
  ...createCompleteWordsLengthSlice(...a),
});
