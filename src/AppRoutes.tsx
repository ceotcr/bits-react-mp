import { Route, Routes } from "react-router"
import Login from "./components/pages/Login"
import MainLayout from "./components/MainLayout"
import Products from "./components/pages/Products"
import AddProduct from "./components/pages/AddProduct"
import EditProduct from "./components/pages/EditProduct"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element="Home" />
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes