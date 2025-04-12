import { StateCreator } from "zustand";
import { StoreState } from "../../../store";

export interface TimingsSlice {
  startTestTime: number;
  endTestTime: number;
  setStartTestTime: (value: number) => void;
  setEndTestTime: (value: number) => void;
}

export const createTimingsSlice: StateCreator<
  StoreState,
  [],
  [],
  TimingsSlice
> = (set) => ({
  startTestTime: 0,
  endTestTime: 0,

  setStartTestTime: (value: number) => set(() => ({ startTestTime: value })),
  setEndTestTime: (value: number) => set(() => ({ endTestTime: value })),
});
