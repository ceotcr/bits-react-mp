import { callApi } from "../generics/apiCall"
import { TProductFormSchema } from "../schemas/productForm"
import { IProduct } from "../types"

export const getProducts = async ({ limit = 12, page = 1, sortBy = "default", order = "asc", search = "", category = "all" }: { limit?: number, page?: number, sortBy?: string, order?: string, category?: string, search?: string }) => {
    let url = "/products"
    const skip = (page - 1) * limit
    if (search) url += `/search?q=${search}&limit=${limit}`
    else if (category && category !== "all") url += `/category/${category}`
    if (!search) url += `?limit=${limit}`
    if (skip) url += `&skip=${skip}`
    if (sortBy && sortBy !== "default") url += `&sortBy=${sortBy}&order=${order}`
    const response = await callApi<null, { products: IProduct[], total: number }>({
        url,
        method: "GET",
        data: null,
    })
    return {
        products: response.products,
        pages: Math.ceil(response.total / limit)
    }
}

export const getProduct = async (id: string) => {
    const response = await callApi<null, IProduct>({
        url: `/products/${id}`,
        method: "GET",
        data: null,
    })
    return response
}

export const getCategories = async () => {
    const response = await callApi<null, string[]>({
        url: "/products/category-list",
        method: "GET",
        data: null,
    })
    return response
}

export const addProductAPI = async (product: TProductFormSchema) => {
    const response = await callApi<TProductFormSchema, IProduct>({
        url: "/products/add",
        method: "POST",
        data: product,
    })
    return response
}

export const updateProductAPI = async (product: TProductFormSchema, id: number) => {
    const response = await callApi<TProductFormSchema, IProduct>({
        url: `/products/${id}`,
        method: "PUT",
        data: product,
    })
    return response
}

export const deleteProductAPI = async (id: number) => {
    const response = await callApi<undefined, IProduct>({
        url: `/products/${id}`,
        method: "DELETE",
        data: undefined
    })
    return response
}