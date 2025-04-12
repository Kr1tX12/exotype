import { StateCreator } from "zustand";
import { StoreState } from "../../../store";

export interface TargetWordsSlice {
  targetWords: string[];
  updateTargetWords: (value: string[]) => void;
}

export const createTargetWordsSlice: StateCreator<
  StoreState,
  [],
  [],
  TargetWordsSlice
> = (set) => ({
  targetWords: [],
  updateTargetWords: (value: string[]) => set(() => ({ targetWords: value })),
});
