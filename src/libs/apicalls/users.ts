import { callApi } from "../generics/apiCall"
import { IAuthRes } from "../types"

export const getUser = async (id: number) => {
    const response = await callApi<null, IAuthRes>({
        url: `/users/${id}`,
        method: "GET",
        data: null,
    })
    return response
}

export const getUsers = async ({
    page = 1, limit = 10, search, filter
}: {
    page?: number; limit?: number; search?: string; filter?: {
        key: string;
        value: string;
    };
}) => {
    let url = "/users";
    if (search) url += `/search?q=${search}`;
    else if (filter?.value && filter.key) url += `/filter?key=${filter.key}&value=${filter.value}`;
    const skip = (page - 1) * limit;
    if (search || (filter?.value && filter.key)) url += `&skip=${skip}&limit=${limit}`;
    else url += `?skip=${skip}&limit=${limit}`;
    const response = await callApi<undefined, {
        users: IAuthRes[],
        total: number
    }>({
        url,
        method: "GET",
        data: undefined
    })
    return {
        users: response.users,
        pages: Math.ceil(response.total / limit)
    }
}


export const updateUser = async (user: Partial<IAuthRes>) => {
    await callApi<Partial<IAuthRes>, IAuthRes>({
        url: `/users/${user.id}`,
        method: "PATCH",
        data: user
    })
    return user
}