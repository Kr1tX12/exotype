import { StateCreator } from "zustand";
import { StoreState } from "../store";

export interface TypedTextSlice {
  typedText: string;
  updateTypedText: (value: string | ((prev: string) => string)) => void;
}

export const createTypedTextSlice: StateCreator<
  StoreState,
  [],
  [],
  TypedTextSlice
> = (set) => ({
  typedText: "",
  updateTypedText: (value: string | ((prev: string) => string)) =>
    set((state) => ({
      typedText: typeof value === "function" ? value(state.typedText) : value,
    })),
});
