import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getAllOrders } from "../../libs/apicalls/orders"
import { useOrders } from "../../store/ordersStore"
import OrderCard from "../ui/orders/OrderCard"
import { Pagination, Stack, Typography } from "@mui/material"

const Orders = () => {
    const { orders, setOrderDetails, pages, updateProcessStatus } = useOrders()
    const [page, setPage] = useState(1)
    const { isLoading } = useQuery({
        queryKey: ["orders", page],
        queryFn: async () => {
            const data = await getAllOrders({
                page
            })
            const updatedOrders = data.carts.map((cart) => ({
                ...cart,
                isProcessed: false
            }))
            setOrderDetails(updatedOrders, data.pages)
            return updatedOrders
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1
    })
    return (
        <div className="flex flex-col gap-4">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" className="!font-bold">Orders</Typography>
            </Stack>
            {isLoading && <Typography variant="body1">Loading...</Typography>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {
                    orders.length > 0 && orders.map((cart) => (
                        <OrderCard key={cart.id} order={cart} onProcessStatusChange={() => {
                            updateProcessStatus(cart.id)
                        }} />
                    ))
                }
            </div>

            {
                <Pagination className="fixed bottom-4 bg-white p-2 rounded-lg right-4" count={pages} shape="rounded" page={page} onChange={(_e, value) => setPage(value)} />
            }
        </div>
    )
}

export default Orders