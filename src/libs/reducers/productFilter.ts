

interface IFilterState {
    search: string;
    sortBy: string;
    order: string;
    category: string;
    page: number;
}

export const initialFilters = {
    search: "",
    sortBy: "default",
    order: "asc",
    category: "all",
    page: 1,
};
interface IFilterAction {
    type: string;
    payload: string;
}

export const filterReducer = (state: IFilterState, action: IFilterAction) => {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload, category: "all", page: 1 };
        case "SET_SORT_BY":
            return { ...state, sortBy: action.payload, page: 1 };
        case "SET_ORDER":
            return { ...state, order: action.payload, page: 1 };
        case "SET_CATEGORY":
            return { ...state, category: action.payload, search: "", page: 1 };
        case "SET_PAGE":
            return { ...state, page: Number(action.payload) };
        case "RESET":
            return { ...state, search: "", sortBy: "default", order: "asc", category: "all", page: 1 };
        default:
            return state;
    }
};