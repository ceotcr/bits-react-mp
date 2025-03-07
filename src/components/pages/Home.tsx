import { useNavigate } from "react-router"
import { useAuth } from "../../store/authStore"

const Home = () => {
    const navigate = useNavigate()
    const { user: authUser } = useAuth()

    if (!authUser || ["admin"].includes(authUser.role) === false) {
        navigate('/login')
        return null
    }
    return (
        <div>Home</div>
    )
}

export default Home