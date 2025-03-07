import { Drawer, Typography } from "@mui/material"
import { FaStore, FaUsers } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { MdArticle, MdSpaceDashboard } from "react-icons/md"
import { AiFillProduct } from "react-icons/ai"
import { IoReceipt } from "react-icons/io5"
import { ImQuotesLeft } from "react-icons/im"
import { NavLink } from "react-router"
import { RiMenuUnfoldLine } from "react-icons/ri"
import { useState } from "react"
import { useAuth } from "../../../store/authStore"
import LogoutBt from "./LogoutBt"
import LoginBt from "./LoginBtn"
// eslint-disable-next-line react-refresh/only-export-components
export const links = [
    {
        title: "Dashboard",
        icon: <MdSpaceDashboard size={24} className="text-inherit" />,
        to: "/",
        for: ["admin"]
    },
    {
        title: "Products",
        icon: <AiFillProduct size={24} className="text-inherit" />,
        to: "/products",
        for: ["admin"]
    },

    {
        title: "Cart",
        icon: <FaCartShopping size={24} className="text-inherit" />,
        to: "/cart",
        for: ["admin"]
    },

    {
        title: "Users",
        icon: <FaUsers size={24} className="text-inherit" />,
        to: "/users",
        for: ["admin", "moderator"]
    },

    {
        title: "Orders",
        icon: <IoReceipt size={24} className="text-inherit" />,
        to: "/orders",
        for: ["admin", "moderator"]
    },
    {
        title: "Blogs",
        icon: <MdArticle size={24} className="text-inherit" />,
        to: "/blogs",
        for: ["admin", "moderator", "user"]
    },
    {
        title: "Quotes",
        icon: <ImQuotesLeft size={24} className="text-inherit" />,
        to: "/quotes",
        for: ["admin", "moderator", "user", "guest"]
    },
    {
        title: "Recipes",
        icon: <MdSpaceDashboard size={24} className="text-inherit" />,
        to: "/recipes",
        for: ["admin", "moderator", "user", "guest"]
    }
]
const SideBar = () => {
    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    return (
        <>
            <Drawer variant="permanent"
                className="max-lg:hidden"
                slotProps={{
                    paper: {
                        className: "w-52 !border-none hide-scrollbar px-2 py-4 !bg-transparent gap-8"
                    },
                    docked: {
                        className: "w-52 h-screen !border-none !bg-transparent"
                    }
                }}
            >
                <div className="flex items-center gap-2 w-full">
                    <FaStore size={32} className="text-slate-100 !min-h-fit !max-h-fit p-1 outline-1 rounded-lg outline-slate-500 bg-transparent" />
                    <Typography variant="h6" className="text-slate-100">CS Store</Typography>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    {links.filter(link => link.for.includes(user?.role ?? "guest")).map((link, index) => (
                        <NavLink to={link.to} key={index} className={({ isActive }) => `w-full transition-colors text-slate-100 flex flex-row gap-2 items-center ${isActive ? "bg-slate-100 !text-slate-800" : ""} p-2 rounded-lg`}>
                            {link.icon}
                            <span className="">{link.title}</span>
                        </NavLink>
                    ))}
                </div>
                {
                    user ?
                        <LogoutBt />
                        :

                        <LoginBt />

                }
            </Drawer>

            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="left"
                variant="temporary"
                slotProps={{
                    paper: {
                        className: "lg:hidden w-64 !border-none px-2 py-4 !bg-[#11191F] gap-8"
                    },
                    docked: {
                        className: "w-64 h-screen !border-none !bg-[#11191F]"
                    },
                    backdrop: {
                        className: "backdrop-blur-lg"
                    }
                }}
            >
                <div className="flex items-center gap-2 w-full">
                    <FaStore size={32} className="text-slate-100 !min-h-fit !max-h-fit p-1 outline-1 rounded-lg outline-slate-500 bg-transparent" />
                    <Typography variant="h6" className="text-slate-100">CS Store</Typography>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    {links.filter(link => link.for.includes(user?.role ?? "guest")).map((link, index) => (
                        <NavLink to={link.to} key={index} onClick={() => {
                            setOpen(false)
                        }} className={({ isActive }) => `w-full transition-colors text-slate-100 flex flex-row gap-2 items-center ${isActive ? "bg-slate-100 !text-slate-800" : ""} p-2 rounded-lg`}>
                            {link.icon}
                            <span className="">{link.title}</span>
                        </NavLink>
                    ))}
                </div>
                {
                    user ?
                        <LogoutBt />
                        :
                        <LoginBt />

                }
            </Drawer>
            <button className="fixed top-4 left-4 text-slate-700 p-2 bg-white rounded-lg lg:hidden cursor-pointer z-50 shadow-lg hover:text-slate-900"
                onClick={() => setOpen(true)}
            >
                <RiMenuUnfoldLine size={24} />
            </button>
        </>
    )
}

export default SideBar