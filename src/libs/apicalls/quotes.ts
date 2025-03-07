import { callApi } from "../generics/apiCall";
import { IQuote } from "../types";

export const getQuotes = async ({
    limit = 10,
    page = 1
}: {
    limit?: number,
    page?: number
}) => {
    const skip = (page - 1) * limit
    const response = await callApi<undefined, {
        quotes: IQuote[], total: number
    }>({
        url: `/quotes?limit=${limit}&skip=${skip}`,
        method: 'GET',
    })
    return {
        quotes: response.quotes,
        pages: Math.ceil(response.total / limit)
    }
}