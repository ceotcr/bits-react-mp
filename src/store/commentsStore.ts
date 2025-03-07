import { create } from "zustand";
import { IComment } from "../libs/types";

interface ICommentsStore {
    mycomments: IComment[];
    setComments: (comments: IComment[]) => void;
    addComment: (comment: IComment) => void;
    removeComment: (id: number) => void;
}

export const useCommentsStore = create<ICommentsStore>((set) => ({
    mycomments: [],
    setComments: (comments) => set({ mycomments: comments }),
    addComment: (comment) => set((state) => ({ mycomments: [...state.mycomments, comment] })),
    removeComment: (id) => set((state) => ({ mycomments: state.mycomments.filter((comment) => comment.id !== id) })),
}));