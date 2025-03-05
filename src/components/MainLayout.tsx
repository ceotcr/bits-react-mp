import { Drawer, Typography } from "@mui/material"
import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Drawer variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200, px: 4, py: 2 },
                }}
            >
                <Typography variant="h4">App</Typography>
            </Drawer>
            <Outlet />
        </div>
    )
}

export default MainLayout