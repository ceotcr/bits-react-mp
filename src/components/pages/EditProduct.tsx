import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { getProduct } from "../../libs/apicalls/products"
import ProductForm from "../ui/products/ProductForm"
import { useAuth } from "../../store/authStore"

const EditProduct = () => {
    const { id } = useParams<{ id: string }>()

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            return await getProduct(id as string)
        }
    })

    const navigate = useNavigate()
    const { user: authUser } = useAuth()

    if (!authUser || ["admin"].includes(authUser.role) === false) {
        navigate('/login')
        return null
    }
    return (
        <>
            {
                isLoading ? <div>Loading...</div> :
                    error ? <div>{error.name}: {error.message}</div> :
                        product ? <ProductForm mode="edit" product={product} /> : <div>Product not found</div>
            }
        </>
    )
}

export default EditProduct