import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Stack } from "@mui/material"
import { IProduct } from "../../../libs/types"
import { Link } from "react-router"
import { MdDelete, MdEdit } from "react-icons/md"

const ProductCard = ({ product, onEdit, onDelete }: { product: IProduct, onEdit: () => void, onDelete: () => void }) => {
    return (
        <Card className="relative">
            <Link to={`/products/${product.id}`}>
                <CardMedia
                    className="!object-cover !object-top"
                    sx={{ height: 240 }}
                    image={product.thumbnail}
                    title={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" >
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </Typography>
                    <Typography variant="body2" mt={1} sx={{ color: 'text.secondary' }} className="line-clamp-2">
                        {product.description}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" mt={1}>
                            $ {product.price}
                        </Typography>
                        {
                            product.stock === 0 ? <Typography variant="body2" mt={1} sx={{ color: 'red' }}>
                                Out of stock
                            </Typography> : product.stock < 10 ? <Typography p={1} width={"fit-content"} variant="body2" mt={1} sx={{ color: 'red' }}>
                                Low stock
                            </Typography> : null
                        }
                    </Stack>
                </CardContent>
            </Link>
            <CardActions className="absolute top-0 right-0 gap-1">
                <IconButton aria-label="edit" onClick={onEdit} className="!bg-blue-500 hover:!bg-blue-600">
                    <MdEdit className="text-white" />
                </IconButton>
                <IconButton aria-label="delete" onClick={onDelete} className="!bg-red-500 hover:!bg-red-600">
                    <MdDelete className="text-white" />
                </IconButton>
            </CardActions>
        </Card >
    )
}

export default ProductCard