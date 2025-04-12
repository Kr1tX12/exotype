import { StateCreator } from "zustand";
import { StoreState } from "../../../store";

export type Stats = {
  wpmHistory: number[];
  rawWpmHistory: number[];
  letterTimestamps: number[][];
};

export interface StatsSlice {
  stats: Stats;
  setStats: (value: Stats) => void;
}

export const createStatsSlice: StateCreator<StoreState, [], [], StatsSlice> = (
  set
) => ({
  stats: {
    rawWpmHistory: [],
    wpmHistory: [],
    letterTimestamps: [],
  },
  setStats: (value: Stats) => set(() => ({ stats: value })),
});
