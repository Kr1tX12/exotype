import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface StoreState {
  needText: string;
  updateNeedText: (newNeedText: string) => void;

  typedText: string;
  updateTypedText: (value: string | ((prev: string) => string)) => void;

  typingParams: TypingParams;
  updateTypingParam: (
    key: keyof TypingParams,
    value: TypingParams[typeof key]
  ) => void;

  isTestReloading: boolean;
  updateTestRealoading: (value: boolean) => void;

  isTestEnd: boolean;
  updateTestEnd: (value: boolean) => void;

  startTestTime: number;
  endTestTime: number;
  setStartTestTime: (value: number) => void;
  setEndTestTime: (value: number) => void;

  stats: Stats;
  setStats: (value: Stats) => void;
}
export type Stats = {
  wpmHistory: number[];
  rawWpmHistory: number[];
};
export type TypingParams = {
  mode: "words" | "time" | "text" | "free" | "ai";
  time: number;
  words: number;
  punctuation: boolean;
  numbers: boolean;
};

export const useStore = create<StoreState>()(
  persist(
    devtools((set) => ({
      needText: "",
      updateNeedText: (newNeedText: string) => {
        set(() => ({
          needText: newNeedText,
          typedText: "",
          isTestReloading: true,
          isTestEnd: false,
        }));
      },
      typedText: "",
      updateTypedText: (value: string | ((prev: string) => string)) =>
        set((state) => ({
          typedText:
            typeof value === "function" ? value(state.typedText) : value,
        })),
      typingParams: {
        mode: "words",
        time: 15,
        words: 10,
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
      isTestReloading: false,
      updateTestRealoading: (value: boolean) =>
        set(() => ({
          isTestReloading: value,
          ...(value
            ? {
                typedText: "",
                isTestEnd: false,
              }
            : {}),
        })),
      isTestEnd: false,
      updateTestEnd: (value: boolean) => set(() => ({ isTestEnd: value })),

      startTestTime: 0,
      endTestTime: 0,

      setStartTestTime: (value: number) =>
        set(() => ({ startTestTime: value })),
      setEndTestTime: (value: number) => set(() => ({ endTestTime: value })),
      stats: {
        rawWpmHistory: [],
        wpmHistory: [],
      },
      setStats: (value: Stats) => set(() => ({ stats: value })),
    })),
    {
      name: "store",
      partialize: (state) => ({ typingParams: state.typingParams }),
    }
  )
);
