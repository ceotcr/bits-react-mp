import { callApi } from "../generics/apiCall";
import { TLoginSchema } from "../schemas/userAuth";
import { IAuthRes } from "../types";
import { getUser } from "./users";

export const login = async (data: TLoginSchema) => {
    const response = await callApi<TLoginSchema, IAuthRes>({
        url: "/auth/login",
        method: "POST",
        data
    })
    const fullUser = await getUser(response.id)
    return {
        ...response,
        ...fullUser
    };
}