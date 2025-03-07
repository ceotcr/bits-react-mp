import { Route, Routes } from "react-router"
import Login from "./components/pages/Login"
import MainLayout from "./components/MainLayout"
import Products from "./components/pages/Products"
import AddProduct from "./components/pages/AddProduct"
import EditProduct from "./components/pages/EditProduct"
import Product from "./components/pages/Product"
import Cart from "./components/pages/Cart"
import AddToCart from "./components/pages/AddToCart"
import Orders from "./components/pages/Orders"
import Users from "./components/pages/Users"
import User from "./components/pages/User"
import Blogs from "./components/pages/Blogs"
import Blog from "./components/pages/Blog"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element="Home" />
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/add" element={<AddToCart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<Blog />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes