import { Card, CardContent, Typography, Box, CardMedia, Stack, IconButton, Switch, Tooltip } from '@mui/material';
import { IOrder } from '../../../libs/types';
import { MdDelete } from 'react-icons/md';

const OrderCard = ({ order, onDelete, isCart, onProcessStatusChange }: {
    order: IOrder, onDelete?: () => void, isCart?: boolean, onProcessStatusChange?: () => void
}) => {
    return (
        <Card>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" className="!font-semibold">
                        {isCart ? 'Cart' : 'Order'} #{order.id}
                        <span className="!text-green-500 !text-sm !font-normal !ml-4">
                            {!isCart && order.isProcessed && '(Processed)'}
                        </span>
                    </Typography>
                    {
                        isCart ? (
                            <IconButton aria-label="delete" onClick={onDelete} className='!bg-red-500 !text-white !hover:!bg-red-600'>
                                <MdDelete size={24} />
                            </IconButton>
                        ) : (
                            <Tooltip title={order.isProcessed ? 'Mark as unprocessed' : 'Mark as processed'} placement='top' arrow slotProps={{
                                tooltip: { sx: { fontSize: 14, bgcolor: "black", color: "white" } },
                                arrow: { sx: { color: "black" } }
                            }}>
                                <Switch checked={order.isProcessed} onChange={onProcessStatusChange}
                                    color="primary"
                                />
                            </Tooltip>
                        )
                    }
                </Stack>
                <Typography variant="body2" className="!text-gray-800">
                    User ID: {order.userId}
                    <br />
                    Total Items: {order.totalProducts} | Total Quantity: {order.totalQuantity}
                </Typography>
                <Box className="!mt-4 h-[300px] overflow-y-auto">
                    {order.products.map((product) => (
                        <Box key={product.id} className="!flex !items-center !mb-4">
                            <CardMedia
                                component="img"
                                image={product.thumbnail}
                                alt={product.title}
                                className="!w-16 !h-16 !rounded-lg !mr-4"
                            />
                            <Box>
                                <Typography className="!text-lg !font-semibold">
                                    {product.title}
                                </Typography>
                                <Typography className="!text-gray-800">Quantity: {product.quantity}</Typography>
                                <Typography className="!text-gray-800">Discount: {product.discountPercentage}%</Typography>
                                <Typography className="!text-green-400 !font-bold">
                                    ${product.discountedTotal?.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box className="!mt-4 !border-t !border-gray-600 !pt-2">
                    <Typography variant="body1" className="!font-semibold">
                        Total Price: <span className="!line-through">${order.total.toFixed(2)}</span>
                    </Typography>
                    <Typography variant="h6" className="!text-green-400 !font-bold">
                        Discounted Total: ${order.discountedTotal.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default OrderCard