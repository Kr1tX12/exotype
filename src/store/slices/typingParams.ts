import { StateCreator } from "zustand";
import { StoreState } from "../store";

export type TypingParams = {
  mode: "words" | "time" | "text" | "free" | "ai";
  time: number;
  words: number;
  sentences: number;
  punctuation: boolean;
  numbers: boolean;
};

export interface TypingParamsSlice {
  typingParams: TypingParams;
  updateTypingParam: (
    key: keyof TypingParams,
    value: TypingParams[typeof key]
  ) => void;
}

export const createTypingParamsSlice: StateCreator<
  StoreState,
  [],
  [],
  TypingParamsSlice
> = (set) => ({
  typingParams: {
    mode: "words",
    time: 15,
    words: 10,
    sentences: 1,
    punctuation: false,
    numbers: false,
  },
  updateTypingParam: (
    key: keyof TypingParams,
    value: TypingParams[typeof key]
  ) =>
    set((state) => ({
      typingParams: { ...state.typingParams, [key]: value },
    })),
});
