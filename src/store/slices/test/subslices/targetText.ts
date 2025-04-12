import { StateCreator } from "zustand";
import { StoreState } from "../../../store";

export interface TargetTextSlice {
  targetText: string;
  updateTargetText: (newNeedText: string) => void;
}

export const createTargetTextSlice: StateCreator<
  StoreState,
  [],
  [],
  TargetTextSlice
> = (set) => ({
  targetText: "",
  updateTargetText: (newNeedText: string) => {
    set(() => ({
      targetText: newNeedText,
    }));
  },
});
