import { useQuery } from "@tanstack/react-query";
import { getBlogs, getBlogTags } from "../../libs/apicalls/blogs";
import Filters from "../base/Filters"
import { useReducer } from "react";
import { BlogCard } from "../ui/blogs/BlogCard";
import { filterReducer, initialFilters } from "../../libs/reducers/blogsFilter";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../../store/authStore";

const Blogs = () => {
    const [filters, filterDispatch] = useReducer(filterReducer, initialFilters
    )
    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ["blogs", filters],
        queryFn: async () => {
            const data = await getBlogs({
                page: filters.page,
                sortBy: filters.sortBy,
                order: filters.order,
                search: filters.search,
                tag: filters.category
            });
            return data.blogs;
        },
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnMount: false,
    })
    const { data: tags } = useQuery({
        queryKey: ["categories", "blogs"],
        queryFn: getBlogTags,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
    const navigate = useNavigate()
    const { user: authUser } = useAuth()

    if (!authUser || ["admin", "user", "moderator"].includes(authUser.role) === false) {
        navigate('/login')
        return null
    }
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <Filters isBlogs categories={tags || []} filters={filters} sortBy={["title", "views", "likes"]} dispatch={filterDispatch} />
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.name}: {error.message}</div>}
            {
                blogs && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )
            }
            <Pagination page={filters.page} count={10} onChange={(_e, page) => filterDispatch({ type: "SET_PAGE", payload: page })} className="fixed bottom-4 bg-white p-2 rounded-lg right-4" />
        </div>
    )
}

export default Blogs