import { create } from "zustand";

interface SnackbarStore {
    message: string;
    severity: "error" | "warning" | "info" | "success";
    isShowing: boolean;
    showSnackbar: (
        {
            message,
            severity,
        }: {
            message: string;
            severity: "error" | "warning" | "info" | "success";
        }
    ) => void;
    hideSnackbar: () => void;
}


export const useSnackbar = create<SnackbarStore>((set) => ({
    message: "",
    isShowing: false,
    severity: "info",
    showSnackbar: ({ message, severity }) => set({ message, severity, isShowing: true }),
    hideSnackbar: () => set({ message: "", isShowing: false }),
}));