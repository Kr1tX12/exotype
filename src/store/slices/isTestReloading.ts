import { StateCreator } from "zustand";
import { StoreState } from "../store";

export interface IsTestReloadingSlice {
  isTestReloading: boolean;
  updateTestReloading: (value: boolean) => void;
}

export const createIsTestReloadingSlice: StateCreator<
  StoreState,
  [],
  [],
  IsTestReloadingSlice
> = (set) => ({
  isTestReloading: false,
  updateTestReloading: (value: boolean) =>
    set(() => ({
      isTestReloading: value,
      isTestEnd: false,
    //   ...(value
    //     ? {
    //         typedText: "",
    //       }
    //     : {}),
    })),
});
