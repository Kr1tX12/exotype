import { StateCreator } from "zustand";
import { StoreState } from "../../../store";

export interface TypedWordsSlice {
  typedWords: string[];
  updateTypedWords: (value: string[]) => void;
}

export const createTypedWordsSlice: StateCreator<
  StoreState,
  [],
  [],
  TypedWordsSlice
> = (set) => ({
  typedWords: [],
  updateTypedWords: (value: string[]) => set(() => ({ typedWords: value })),
});
