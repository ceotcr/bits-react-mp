interface IFilterState {
    search: string;
    filterKey: string;
    filterValue: string;
    page: number;
}

export const initialFilters: IFilterState = {
    search: "",
    filterKey: "",
    filterValue: "",
    page: 1,
};

interface IFilterAction {
    type: string;
    payload: string;
}

export const filterReducer = (state: IFilterState, action: IFilterAction): IFilterState => {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload, filterKey: "", filterValue: "" };
        case "SET_FILTER_KEY":
            return { ...state, filterKey: action.payload, search: "", filterValue: "" };
        case "SET_FILTER_VALUE":
            return { ...state, filterValue: action.payload, search: "" };
        case "SET_PAGE":
            return { ...state, page: Number(action.payload) };
        case "RESET":
            return { ...initialFilters };
        default:
            return state;
    }
};
