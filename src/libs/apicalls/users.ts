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