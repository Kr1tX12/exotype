import { StoreState } from "@/store/store";
import { StateCreator } from "zustand";

export interface DynamicStatsSlice {
  wpm: number;
  accuracy: number;
  updateWpm: (value: number) => void;
  updateAccuracy: (value: number) => void;
}

export const createDynamicStatsSlice: StateCreator<
  StoreState,
  [],
  [],
  DynamicStatsSlice
> = (set) => ({
  wpm: 0,
  accuracy: 0,
  updateWpm: (value: number) => set(() => ({ wpm: value })),
  updateAccuracy: (value: number) => set(() => ({ accuracy: value })),
});
