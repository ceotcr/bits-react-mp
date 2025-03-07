import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { useState } from 'react';

const UserFilters = ({ filters, dispatch, filterKeyValues }: {
    filters: {
        search: string;
        filterKey: string;
        filterValue: string;
    },
    filterKeyValues: { key: string, values: string[] }[],
    dispatch: React.Dispatch<{ type: string, payload: string }>
}) => {
    const [search, setSearch] = useState(filters.search);

    return (
        <Stack direction="row" className='max-sm:flex-wrap-reverse max-sm:gap-y-2 !space-0 !gap-2 !gap-y-4'>
            <TextField
                slotProps={{
                    input: {
                        className: "!rounded-lg",
                        value: search,
                        onChange: (e) => setSearch(e.target.value),
                        onKeyPress: (e) => {
                            if (e.key === "Enter") {
                                dispatch({ type: "SET_SEARCH", payload: search });
                            }
                        }
                    }
                }}
                label="Search"
                id="Search"
                enterKeyHint='search'
                helperText="Press Enter to search"
            />
            <FormControl className="w-[160px]">
                <InputLabel className="bg-slate-100 !px-2" id="Filter Key">Filter By</InputLabel>
                <Select
                    className="!rounded-lg"
                    labelId="Filter Key"
                    value={filters.filterKey}
                    onChange={(e) => {
                        dispatch({ type: "SET_FILTER_KEY", payload: e.target.value })
                        setSearch("")
                    }}
                >
                    {filterKeyValues.map((filter) => (
                        <MenuItem key={filter.key} value={filter.key}>{filter.key}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className="w-[160px]">
                <InputLabel className="bg-slate-100 !px-2" id="Filter Value">{
                    !filters.filterKey ? `Select filter first` : "Filter Value"
                }</InputLabel>
                <Select
                    className="!rounded-lg"
                    labelId="Filter Value"
                    disabled={!filters.filterKey}
                    value={filters.filterValue}
                    onChange={(e) => {
                        dispatch({ type: "SET_FILTER_VALUE", payload: e.target.value })
                        setSearch("")
                    }}
                >
                    {filters.filterKey && filterKeyValues.find((f) => f.key === filters.filterKey)?.values.map((value) => (
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
};

export default UserFilters;
