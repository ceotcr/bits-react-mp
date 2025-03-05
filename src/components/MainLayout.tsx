import { Outlet } from "react-router"
import SideBar from "./ui/layout/SideBar"
import CustomSnackbar from "./ui/layout/CustomSnackbar"

const MainLayout = () => {
    return (
        <div className="flex w-full flex-row h-screen p-0 bg-[#11191F]">
            <SideBar />
            <main className="flex flex-col w-full h-screen p-4 max-lg:pt-20 bg-slate-100 lg:rounded-l-xl overflow-y-auto">
                <Outlet />
            </main>
            <CustomSnackbar />
        </div>
    )
}

export default MainLayout