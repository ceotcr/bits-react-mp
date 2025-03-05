import { callApi } from "../generics/apiCall";
import { TLoginSchema } from "../schemas/userAuth";
import { IAuthRes } from "../types";

export const login = async (data: TLoginSchema) => {
    const response = await callApi<TLoginSchema, IAuthRes>(data, "/auth/login", "POST");
    return response;
}