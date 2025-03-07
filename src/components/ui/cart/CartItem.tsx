import { FC } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { Card, CardContent, Typography, CardMedia, Box, IconButton } from "@mui/material";
import { ICartItem } from "../../../libs/types";
import { useCartStore } from "../../../store/cartStore";
import { useSnackbar } from "../../../store/snackbarStore";

interface CartItemProps {
    item: ICartItem;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
    const { increaseQuantity, decreaseQuantity, removeProduct } = useCartStore();
    const { showSnackbar } = useSnackbar()
    return (
        <Card className="!rounded-xl !shadow-md !flex !items-center !p-4">
            <CardMedia
                component="img"
                image={item.thumbnail}
                alt={item.title}
                className="!w-20 !h-20 !rounded-lg"
            />
            <CardContent className="!flex !flex-col !flex-grow !ml-4">
                <Typography className="!text-lg !font-semibold">{item.title}</Typography>
                <Typography className="!text-gray-400">Price: ${item.price.toFixed(2)}</Typography>
                <Typography className="!text-green-400">Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
            </CardContent>
            <Box className="!flex !items-center">
                <IconButton onClick={() => {
                    decreaseQuantity(item.id)
                    showSnackbar({ message: 'Product removed from cart', severity: 'success' })
                }}>
                    <FiMinus />
                </IconButton>
                <Typography className="!mx-2 !text-lg !font-semibold">{item.quantity}</Typography>
                <IconButton onClick={() => {
                    increaseQuantity(item.id)
                    showSnackbar({ message: 'Product added to cart', severity: 'success' })
                }}>
                    <FiPlus />
                </IconButton>
                <IconButton onClick={() => {
                    removeProduct(item.id)
                    showSnackbar({ message: 'Product removed from cart', severity: 'success' })
                }} className="!text-red-500">
                    <FiX />
                </IconButton>
            </Box>
        </Card>
    );
};

export default CartItem;
