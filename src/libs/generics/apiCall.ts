import { AxiosHeaders } from "axios"
import { AxiosInstance } from "../AxiosInstance"

export const callApi = async <S, T>(data: S, url: string, method: string, headers?: AxiosHeaders): Promise<T> => {
    const response = await AxiosInstance({
        url,
        method,
        data,
        headers
    })
    return response.data
}