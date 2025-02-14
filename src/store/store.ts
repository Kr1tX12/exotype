import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface StoreState {
  needText: string;
  updateNeedText: (newNeedText: string) => void;

  typedText: string;
  updateTypedText: (value: string | ((prev: string) => string)) => void;

  typingParams: TypingParams;

  isTestReloading: boolean;
  updateTestRealoading: (value: boolean) => void;

  isTestEnd: boolean;
  updateTestEnd: (value: boolean) => void;
  updateTypingParam: (
    key: keyof TypingParams,
    value: TypingParams[typeof key]
  ) => void;
}

export type TypingParams = {
  mode: "words" | "time" | "text" | "free";
  time: number;
  words: number;
  punctuation: boolean;
  numbers: boolean;
};

// export const useStore = create<StoreState>()(
//   persist(
//     (set) => ({
//       needText:
//         "Многие народы увлекаются расширением сознания. Для этого применяются различные вещества и заклинания. Расширив таким образом своё сознание, народы некоторое время охуевши наблюдают вращение бесконечного пространства..." +
//         "Многие народы увлекаются расширением сознания. Для этого применяются различные вещества и заклинания. Расширив таким образом своё сознание, народы некоторое время охуевши наблюдают вращение бесконечного пространства...",
//       updateNeedText: (newNeedText: string) =>
//         set(() => ({ needText: newNeedText })),
//       typedText: "",
//       updateTypedText: (value: string | ((prev: string) => string)) =>
//         set((state) => ({
//           typedText:
//             typeof value === "function" ? value(state.typedText) : value,
//         })),
//       typingParams: {
//         mode: "words",
//         time: 15,
//         words: 10,
//         punctuation: false,
//         numbers: false,
//       },
//       isTestReloading: true,
//       updateTestRealoading: (value: boolean) =>
//         set((state) => ({ isTestReloading: value })),
//       updateTypingParam: (
//         key: keyof TypingParams,
//         value: TypingParams[typeof key]
//       ) =>
//         set((state) => ({
//           typingParams: { ...state.typingParams, [key]: value },
//         })),
//     }),
//     { name: "store" }
//   )
// );

export const useStore = create<StoreState>()(
  devtools((set) => ({
    needText: "",
    updateNeedText: (newNeedText: string) =>
      set(() => ({ needText: newNeedText })),
    typedText: "",
    updateTypedText: (value: string | ((prev: string) => string)) =>
      set((state) => ({
        typedText: typeof value === "function" ? value(state.typedText) : value,
      })),
    typingParams: {
      mode: "words",
      time: 15,
      words: 10,
      punctuation: false,
      numbers: false,
    },
    isTestReloading: false,
    updateTestRealoading: (value: boolean) =>
      set((state) => ({ isTestReloading: value })),
    isTestEnd: false,
    updateTestEnd: (value: boolean) => set((state) => ({ isTestEnd: value })),
    updateTypingParam: (
      key: keyof TypingParams,
      value: TypingParams[typeof key]
    ) =>
      set((state) => ({
        typingParams: { ...state.typingParams, [key]: value },
      })),
  }))
);
