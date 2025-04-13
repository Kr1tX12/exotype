import { VISIBLE_WORDS_COUNT } from "@/features/typing-text/typing-text.constants";
import { StoreState } from "@/store/store";
import { StateCreator } from "zustand";

export interface StartEndWordsIndexSlice {
  startWordsIndex: number;
  endWordsIndex: number;

  updateStartWordsIndex: (value: number) => void;
}

export const createStartEndWordsIndexSlice: StateCreator<
  StoreState,
  [],
  [],
  StartEndWordsIndexSlice
> = (set) => ({
  startWordsIndex: 0,
  endWordsIndex: 0,
  updateStartWordsIndex: (value: number) =>
    set((state) => ({
      startWordsIndex: value,
      endWordsIndex: Math.min(
        state.startWordsIndex + VISIBLE_WORDS_COUNT * 2,
        state.targetWords.length - 1
      ),
    })),
});
