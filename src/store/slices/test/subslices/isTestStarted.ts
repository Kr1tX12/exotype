import { StoreState } from "@/store/store";
import { StateCreator } from "zustand";

export interface IsTestStartedSlice {
  isTestStarted: boolean;
  updateIsTestStarted: (value: boolean) => void;
}

export const createIsTestStartedSlice: StateCreator<
  StoreState,
  [],
  [],
  IsTestStartedSlice
> = (set) => ({
  isTestStarted: false,
  updateIsTestStarted: (value: boolean) =>
    set(() => ({ isTestStarted: value })),
});
