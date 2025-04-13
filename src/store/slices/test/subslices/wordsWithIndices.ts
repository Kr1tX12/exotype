import { WordsWithIndices } from "@/features/typing-text/hooks/subhooks/useWordsWithIndices";
import { StoreState } from "@/store/store";
import { StateCreator } from "zustand";

export interface WordsWithIndicesSlice {
  wordsWithIndices: WordsWithIndices;
  updateWordsWithIndices: (value: WordsWithIndices) => void;
}

export const createWordsWithIndicesSlice: StateCreator<
  StoreState,
  [],
  [],
  WordsWithIndicesSlice
> = (set) => ({
  wordsWithIndices: [],
  updateWordsWithIndices: (value: WordsWithIndices) =>
    set(() => ({ wordsWithIndices: value })),
});
