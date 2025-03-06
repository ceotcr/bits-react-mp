import { create } from "zustand";
import { IAuthRes } from "../libs/types";

interface UserStore {
    users: IAuthRes[];
    pages: number
    setUsers: ({
        users, pages
    }: {
        users: IAuthRes[];
        pages: number
    }
    ) => void;
    updateUser: (user: Partial<IAuthRes>) => void;
}

export const useUsersStore = create<UserStore>((set) => ({
    users: [],
    pages: 0,
    setUsers: ({
        users, pages
    }) => set({ users, pages }),
    updateUser: (user) => set((state) => ({ users: state.users.map((u) => u.id === user.id ? { ...u, ...user } : u) })),
}));