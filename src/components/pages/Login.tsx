import { Container, Typography } from "@mui/material";
import LoginForm from "../ui/login/LoginForm";
import { useEffect } from "react";
import { useAuth } from "../../store/authStore";
import { useNavigate } from "react-router";
import LoginImage from "../../assets/images/login.jpg"

const Login = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return (
        <Container className="grid place-items-center h-screen grid-cols-1 !p-0 gap-4 md:grid-cols-2  rounded-lg !max-w-full">
            <img src={LoginImage} alt="online store" className="hidden md:block object-cover w-full h-full" />
            <div className="flex flex-col w-full md:max-w-md gap-8 p-4 rounded-lg">
                <Typography variant="h2" textAlign={'left'}>Login</Typography>
                <LoginForm />
            </div>
        </Container>
    )
}

export default Login