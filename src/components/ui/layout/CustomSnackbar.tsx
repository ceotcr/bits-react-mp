import { useSnackbar } from "../../../store/snackbarStore";
import Snackbar from '@mui/material/Snackbar';
const CustomSnackbar = () => {
    const { isShowing, hideSnackbar, message } = useSnackbar();

    return (
        <Snackbar
            open={isShowing}
            onClose={hideSnackbar}
            message={message}
        />
    )
}

export default CustomSnackbar