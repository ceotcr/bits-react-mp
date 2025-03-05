import { Route, Routes } from "react-router"
import Login from "./components/pages/Login"
import MainLayout from "./components/MainLayout"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element="Home" />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes