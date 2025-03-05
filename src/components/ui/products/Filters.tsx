import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCategories } from '../../../libs/apicalls/products';
import { MdAdd } from 'react-icons/md';

const Filters = ({ filters, dispatch }: {
    filters: {
        search: string;
        sortBy: string;
        order: string;
        category: string;
    },
    dispatch: React.Dispatch<{ type: string, payload: string }>
}) => {
    const [search, setSearch] = useState(filters.search)

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        refetchOnWindowFocus: false
    })

    return (
        <Stack direction="row" spacing={2} className='max-sm:flex-wrap max-sm:gap-y-2'>
            <TextField
                slotProps={
                    {
                        input: {
                            className: "!rounded-lg",
                            value: search,
                            onChange: (e) => setSearch(e.target.value),
                            onKeyPress: (e) => {
                                if (e.key === "Enter") {
                                    dispatch({ type: "SET_SEARCH", payload: search })
                                }
                            }
                        }
                    }
                }
                label="Search"
                id="Search"
                enterKeyHint='search'
                helperText="Press Enter to search"
            />
            <FormControl className="w-[160px]">
                <InputLabel className="bg-slate-100 !px-2" id="Sort By">Sort By</InputLabel>
                <Select
                    className="!rounded-lg"
                    labelId="Sort By"
                    value={filters.sortBy}
                    onChange={(e) => dispatch({ type: "SET_SORT_BY", payload: e.target.value })}
                >
                    <MenuItem value={"default"}>Default</MenuItem>
                    <MenuItem value={"title"}>Title</MenuItem>
                    <MenuItem value={"price"}>Price</MenuItem>
                    <MenuItem value={"rating"}>Rating</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="w-[160px]">
                <InputLabel className="bg-slate-100 !px-2" id="order">Order</InputLabel>
                <Select
                    className="!rounded-lg"
                    labelId="order"
                    value={filters.order}
                    onChange={(e) => dispatch({ type: "SET_ORDER", payload: e.target.value })}
                >
                    <MenuItem value={"asc"}>Ascending</MenuItem>
                    <MenuItem value={"desc"}>Descending</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="w-[160px]">
                <InputLabel className="bg-slate-100 !px-2" id="Category">Category</InputLabel>
                <Select
                    className="!rounded-lg"
                    labelId="Category"
                    value={filters.category}
                    onChange={(e) => {
                        dispatch({ type: "SET_CATEGORY", payload: e.target.value })
                        setSearch("")
                    }}
                >
                    <MenuItem value={"all"}>All</MenuItem>
                    {categories && categories.map((category) => (
                        <MenuItem key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <IconButton aria-label="add" className='h-fit !bg-blue-400 hover:!bg-blue-500 !text-white !mt-2' >
                <MdAdd size={24} />
            </IconButton>
        </Stack >
    )
}

export default Filters