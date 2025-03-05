import { create } from "zustand";

interface SnackbarStore {
    message: string;
    isShowing: boolean;
    showSnackbar: (message: string) => void;
    hideSnackbar: () => void;
}


export const useSnackbar = create<SnackbarStore>((set) => ({
    message: "",
    isShowing: false,
    showSnackbar: (message) => set({ message, isShowing: true }),
    hideSnackbar: () => set({ message: "", isShowing: false }),
}));