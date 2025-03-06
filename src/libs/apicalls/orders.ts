import { callApi } from "../generics/apiCall";
import { IOrder } from "../types";

export const getAllOrders = async ({
    limit = 10, page = 1,
    userId, cartId
}: {
    limit?: number; page?: number;
    userId?: number; cartId?: number;
}) => {
    const skip = (page - 1) * limit;
    let url = "/carts";
    if (userId) url += `/user/${userId}`;
    else if (cartId) url += `/${cartId}`;
    if (!cartId)
        url += `?limit=${limit}&skip=${skip}`;
    const response = await callApi<undefined, {
        carts: IOrder[],
        total: number
    }>({
        url,
        method: "GET",
        data: undefined,
    })
    return {
        ...response,
        pages: Math.ceil(response.total / limit)
    };
}

export const createOrder = async ({
    userId, products
}: {
    userId: number; products: { id: number; quantity: number }[];
}) => {
    const response = await callApi<{ userId: number, products: { id: number; quantity: number }[] }, IOrder>({
        url: "/carts/add",
        method: "POST",
        data: { products, userId }
    })
    return response;
}

export const deleteOrder = async (cartId: number) => {
    const response = await callApi<undefined, IOrder>({
        url: `/carts/${cartId}`,
        method: "DELETE",
        data: undefined
    })
    return response;
}