import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  turnOn: () => void;
  turnOff: () => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  turnOn: () => set({ loading: true }),
  turnOff: () => set({ loading: false }),
}));

export default useLoadingStore;
