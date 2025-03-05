import { Button } from "@mui/material"
import { CiLogout } from "react-icons/ci"
import { useAuth } from "../../../store/authStore"

const LogoutBt = () => {
    const { logout } = useAuth()
    return (
        <Button
            variant="outlined"
            color="warning"
            startIcon={<CiLogout size={24} />}
            className="!mt-auto"
            onClick={() => logout()}
        >
            Logout
        </Button>
    )
}

export default LogoutBt