import { create } from "zustand";

interface StoreState {
    needText: string;
    updateNeedText: (newNeedText: string) => void;
};

export const useStore = create<StoreState>((set) => ({
    needText: '',
    updateNeedText: (newNeedText: string) => set(() => ({ needText: newNeedText }))
}));