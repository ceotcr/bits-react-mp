import { callApi } from "../generics/apiCall"
import { IBlog } from "../types"

export const getBlogs = async ({ limit = 12, page = 1, sortBy = "default", order = "asc", search = "", tag = "all" }: {
    limit?: number,
    page?: number,
    sortBy?: string,
    order?: string,
    search?: string,
    tag?: string
}) => {
    let url = "/posts"
    const skip = (page - 1) * limit
    if (tag !== "all") url += `/tag/${tag}`
    else if (search) url += `/search?q=${search}`
    if (search && sortBy && sortBy !== "default") url += `&sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`
    else {
        if (sortBy && sortBy !== "default") url += `?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`
        else url += `?limit=${limit}&skip=${skip}`
    }
    const response = await callApi<undefined, { posts: IBlog[], total: number }>({
        url,
        method: "GET",
    })
    return {
        blogs: response.posts,
        pages: Math.ceil(response.total / limit)
    }
}

export const getBlogTags = async () => {
    const response = await callApi<undefined, string[]>({
        url: "/posts/tag-list",
        method: "GET",
    })
    return response
}