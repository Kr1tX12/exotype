import { StoreState } from "@/store/store";
import { StateCreator } from "zustand";

export interface DisplayedWordsSlice {
  displayedWords: string[];
  updateDisplayedWords: (value: string[]) => void;
  animationOpacity: number;
  updateAnimationOpacity: (value: number) => void;
}

export const createDisplayedWordsSlice: StateCreator<
  StoreState,
  [],
  [],
  DisplayedWordsSlice
> = (set) => ({
  displayedWords: [],
  animationOpacity: 1,
  updateDisplayedWords: (value: string[]) =>
    set(() => ({ displayedWords: value })),
  updateAnimationOpacity: (value: number) =>
    set(() => ({ animationOpacity: value })),
});
