import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteOrder, getAllOrders } from "../../libs/apicalls/orders"
import { Pagination, Stack, Typography } from "@mui/material"
import OrderCard from "../ui/orders/OrderCard"
import { MdAdd } from "react-icons/md"
import { Link, useNavigate } from "react-router"
import { useOrders } from "../../store/ordersStore"
import { useState } from "react"
import { useSnackbar } from "../../store/snackbarStore"
import Confirmation from "../base/Confirmation"
import { useAuth } from "../../store/authStore"

const Cart = () => {
    const { orders, setOrderDetails, pages, removeOrder } = useOrders()
    const [page, setPage] = useState(1)
    const { isLoading } = useQuery({
        queryKey: ["carts", page],
        queryFn: async () => {
            const data = await getAllOrders({
                page
            })
            setOrderDetails(data.carts, data.pages)
            return data.carts
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1
    })
    const [deleteDialogue, setDeleteDialogue] = useState({
        show: false,
        id: 0
    })
    const { showSnackbar } = useSnackbar()
    const { mutate: deleteMutate, isPending } = useMutation({
        mutationFn: async () => {
            await deleteOrder(deleteDialogue.id)
        },
        onSuccess: () => {
            setDeleteDialogue({
                show: false,
                id: 0
            })
            removeOrder(deleteDialogue.id)
            showSnackbar({ message: "Cart deleted successfully", severity: "success" })
        },
        onError: () => {
            showSnackbar({ message: "Something went wrong", severity: "error" })
            setDeleteDialogue({
                show: false,
                id: 0
            })
        }
    })

    const navigate = useNavigate()
    const { user: authUser } = useAuth()

    if (!authUser || ["admin"].includes(authUser.role) === false) {
        navigate('/login')
        return null
    }
    return (
        <div className="flex flex-col gap-4">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" className="!font-bold">Cart</Typography>
                <Link to="/cart/add" className="!bg-green-500 !text-white !hover:!bg-green-600 !flex !items-center !gap-2 !px-4 !py-2 !rounded-sm"><MdAdd size={24} className="!text-white" />New Cart</Link>
            </Stack>
            {isLoading && <Typography variant="body1">Loading...</Typography>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {
                    orders.length > 0 && orders.map((cart) => (
                        <OrderCard isCart key={cart.id} order={cart} onDelete={() => {
                            setDeleteDialogue({
                                show: true,
                                id: cart.id
                            })
                        }} />
                    ))
                }
            </div>
            {
                <Pagination className="fixed bottom-4 bg-white p-2 rounded-lg right-4" count={pages} shape="rounded" page={page} onChange={(_e, value) => setPage(value)} />
            }
            {
                deleteDialogue.show &&
                <Confirmation title="Delete Cart" description="Are you sure you want to delete this cart?" handleYes={deleteMutate} handleNo={() => setDeleteDialogue({ show: false, id: 0 })} handleClose={() => setDeleteDialogue({ show: false, id: 0 })} open={deleteDialogue.show} isLoading={isPending} />
            }
        </div>
    )
}

export default Cart