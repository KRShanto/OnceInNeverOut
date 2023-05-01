import UserType from "@/types/user";
import { create } from "zustand";

interface AuthState {
  user: UserType | null | "loading";
  setUser: (user: UserType | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: "loading",
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
