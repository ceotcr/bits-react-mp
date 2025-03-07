import { callApi } from "../generics/apiCall"
import { IBlog, IComment } from "../types"

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

export const getBlog = async (id: string) => {
    const response = await callApi<undefined, IBlog>({
        url: `/posts/${id}`,
        method: "GET",
    })
    const comments = await getComments(id)
    return { ...response, comments }
}

export const getComments = async (id: string) => {
    const response = await callApi<undefined, { comments: IComment[], total: number }>({
        url: `/posts/${id}/comments`,
        method: "GET",
    })
    return response.comments
}

export const addComment = async ({ body, userId, postId }: { body: string, userId: number, postId: number }) => {
    const response = await callApi<{ body: string, userId: number, postId: number }, IComment>({
        url: `/comments/add`,
        method: "POST",
        data: { body, userId, postId }
    })
    return response
}

export const deleteComment = async (id: string) => {
    const response = await callApi<undefined, { message: string }>({
        url: `/comments/${id}`,
        method: "DELETE",
    })
    return response
}