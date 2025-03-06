import { MdClose } from "react-icons/md";
import { useSnackbar } from "../../../store/snackbarStore";

const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
};

const CustomSnackbar = () => {
    const { isShowing, hideSnackbar, message, severity } = useSnackbar();

    return (
        <div className={`fixed top-0 right-0 m-4 p-4 gap-4 z-[999] rounded-md flex items-center justify-between text-white ${bgColors[severity]} ${isShowing ? 'flex' : 'hidden'}`}>
            {message}
            <button onClick={hideSnackbar}>
                <MdClose size={24} />
            </button>
        </div>
    )
}

export default CustomSnackbar