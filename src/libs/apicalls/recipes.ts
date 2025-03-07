import { callApi } from "../generics/apiCall"
import { IRecipe } from "../types"

export const getRecipes = async ({
    limit = 6,
    page = 1
}: {
    limit?: number,
    page?: number
}) => {
    const skip = (page - 1) * limit
    const response = await callApi<undefined, {
        recipes: IRecipe[], total: number
    }>({
        url: `/recipes?limit=${limit}&skip=${skip}`,
        method: 'GET',
    })
    return {
        recipes: response.recipes,
        pages: Math.ceil(response.total / limit)
    }
}

export const getRecipe = async (id: string) => {
    const response = await callApi<undefined, IRecipe>({
        url: `/recipes/${id}`,
        method: 'GET',
    })
    return response
}


