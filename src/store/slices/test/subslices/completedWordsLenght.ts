import { StoreState } from "@/store/store";
import { StateCreator } from "zustand";

export interface CompleteWordsLengthSlice {
  completeWordsLength: number;
  updateCompleteWordsLength: (value: number) => void;
}

export const createCompleteWordsLengthSlice: StateCreator<
  StoreState,
  [],
  [],
  CompleteWordsLengthSlice
> = (set) => ({
  completeWordsLength: 0,
  updateCompleteWordsLength: (value: number) =>
    set(() => ({ completeWordsLength: value })),
});
