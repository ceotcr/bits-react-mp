import { callApi } from "../generics/apiCall"
import { IBlog } from "../types"

export const getBlogs = async ({ limit = 10, page = 1, filter }: {
    limit?: number,
    page?: number,
    filter?: {
        sortBy: string,
        order: string,
        search?: string
    }
}) => {
    let url = "/blogs"
    const skip = (page - 1) * limit
    if (filter?.search) url += `/search?q=${filter.search}&limit=${limit}&skip=${skip}`
    else if (filter?.sortBy && filter.sortBy !== "default") url += `/category/filter?sortBy=${filter.sortBy}&order=${filter.order}&limit=${limit}&skip=${skip}`
    else url += `?limit=${limit}&skip=${skip}`
    const response = await callApi<undefined, { blogs: IBlog[], total: number }>({
        url,
        method: "GET",
    })
    return {
        blogs: response.blogs,
        pages: Math.ceil(response.total / limit)
    }
}

