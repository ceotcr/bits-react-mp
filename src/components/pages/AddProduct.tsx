import { useNavigate } from 'react-router'
import ProductForm from '../ui/products/ProductForm'
import { useAuth } from '../../store/authStore'

const AddProduct = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    if (!user || ["admin"].includes(user.role) === false) {
        navigate('/login')
        return null
    }

    return (
        <ProductForm mode="add" product={null} />
    )
}

export default AddProduct