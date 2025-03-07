import { callApi } from "../generics/apiCall";
import { TLoginSchema } from "../schemas/userAuth";
import { IAuthRes } from "../types";

export const login = async (data: TLoginSchema) => {
    const response = await callApi<TLoginSchema, IAuthRes>({
        url: "/auth/login",
        method: "POST",
        data
    })
    const fullUser = await getAuthUser(response.accessToken);
    return {
        ...response,
        ...fullUser
    };
}

export const getAuthUser = async (token: string) => {
    const response = await callApi<null, IAuthRes>({
        url: "/auth/me",
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    return response
}