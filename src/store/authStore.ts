import { create } from "zustand";
import { IAuthRes } from "../libs/types";

interface AuthStore {
    user: IAuthRes | null;
    setUser: (user: IAuthRes | null) => void;
    logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null })
}));