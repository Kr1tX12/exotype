import { StateCreator } from "zustand";
import { StoreState } from "../../../store";

export interface IsTestEndSlice {
  isTestEnd: boolean;
  updateTestEnd: (value: boolean) => void;
}

export const createIsTestEndSlice: StateCreator<
  StoreState,
  [],
  [],
  IsTestEndSlice
> = (set) => ({
  isTestEnd: false,
  updateTestEnd: (value: boolean) => set(() => ({ isTestEnd: value })),
});
