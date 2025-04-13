import { StoreState } from "@/store/store";
import { StateCreator } from "zustand";

export interface GlobalIndexSlice {
  globalIndex: number;
  updateGlobalIndex: (value: number) => void;
}

export const createGlobalIndexSlice: StateCreator<
  StoreState,
  [],
  [],
  GlobalIndexSlice
> = (set) => ({
  globalIndex: 0,
  updateGlobalIndex: (value: number) => set(() => ({ globalIndex: value })),
});
