import { AxiosInstance } from "../AxiosInstance"

export const callApi = async <S, T>(
    {
        url,
        method,
        data,
        headers
    }: {
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        data?: S,
        headers?: { [key: string]: string }
    }
): Promise<T> => {
    const response = await AxiosInstance({
        url,
        method,
        data,
        headers
    })
    return response.data
}