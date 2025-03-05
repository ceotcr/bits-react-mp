import { Button } from "@mui/material"
import { useNavigate } from "react-router"

const LoginBt = () => {
    const navigate = useNavigate()
    return (
        <Button
            variant="outlined"
            color="warning"
            className="!mt-auto"
            onClick={() => navigate("/login")}
        >
            Login
        </Button>
    )
}

export default LoginBt