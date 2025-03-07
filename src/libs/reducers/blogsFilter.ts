
export const initialFilters = {
    search: "",
    sortBy: "default",
    order: "asc",
    page: 1,
    category: "all",
};

export type TFilter = {
    search: string;
    sortBy: string;
    order: string;
    page: number;
    category: string;
}

export type TAction = {
    type: string;
    payload: string | number;
}

export const filterReducer = (state: TFilter, action: TAction) => {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload as string, category: "all" };
        case "SET_SORT_BY":
            return { ...state, sortBy: action.payload as string };
        case "SET_ORDER":
            return { ...state, order: action.payload as string };
        case "SET_PAGE":
            return { ...state, page: action.payload as number };
        case "SET_CATEGORY":
            return {
                ...state, category: action.payload as string, search: ""
            }
        default:
            return state;
    }
}