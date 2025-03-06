import { Button, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material"
import { useCartStore } from "../../store/cartStore"
import CartItem from "../ui/cart/CartItem"
import { Link } from "react-router"
import { useMemo, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../../libs/apicalls/orders"
import { useSnackbar } from "../../store/snackbarStore"
import { useOrders } from "../../store/ordersStore"

const AddToCart = () => {
    const { cart, clearCart } = useCartStore()
    const [user, setUser] = useState(0)
    const { total, discount, grandTotal } = useMemo(() => {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        const discount = cart.reduce((acc, item) => acc + (item.price * item.quantity * item.discountPercentage / 100), 0)
        const grandTotal = total - discount
        return { total, discount, grandTotal }
    }, [cart])
    const { showSnackbar } = useSnackbar()
    const { addOrder } = useOrders()
    const { mutate: addMutation } = useMutation({
        mutationFn: async () => createOrder({ products: cart, userId: user }),
        onSuccess: (data) => {
            showSnackbar({ message: "Cart created successfully", severity: "success" })
            addOrder(data)
            setUser(0)
            clearCart()
        },
        onError: (error) => {
            showSnackbar({ message: error.message, severity: "error" })
        }
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
                <Typography variant="h4">Cart</Typography>
                {cart.length > 0 ?
                    cart.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))
                    :
                    <div className="mt-12">
                        <Typography variant="h6">Cart is empty</Typography>
                        <Link to="/products" className="!text-blue-500">Go to products</Link>
                    </div>
                }

            </div>
            <div className="flex flex-col gap-4">
                <Typography variant="h4">Summary</Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell width={200}>Total</TableCell>
                            <TableCell>${total.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Discount</TableCell>
                            <TableCell>${discount.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Grand Total</TableCell>
                            <TableCell>${grandTotal.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <TextField
                    label="UserID"
                    variant="outlined"
                    type="number"
                    value={user}
                    onChange={(e) => setUser(Number(e.target.value))}
                />
                <Button variant="contained" color="primary" disabled={cart.length === 0} onClick={() =>
                    addMutation()
                }>Create Cart</Button>

            </div>
        </div >
    )
}

export default AddToCart