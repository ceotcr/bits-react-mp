import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Stack } from "@mui/material"
import { IProduct } from "../../../libs/types"
import { Link, useNavigate } from "react-router"
import { MdDangerous, MdDelete, MdEdit, MdWarning } from "react-icons/md"

const ProductCard = ({ product, onDelete }: { product: IProduct, onDelete: () => void }) => {
    const navigate = useNavigate()
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
                            product.availabilityStatus === 'Low Stock' ?
                                <Typography variant="body2" mt={1} className="!text-yellow-500 flex items-center gap-1">
                                    <MdWarning /> {product.availabilityStatus} ({product.stock})
                                </Typography>
                                :
                                product.availabilityStatus === 'Out of Stock' &&
                                <Typography variant="body2" mt={1} className="!text-red-500 flex items-center gap-1">
                                    <MdDangerous /> {product.availabilityStatus}
                                </Typography>
                        }
                    </Stack>
                </CardContent>
            </Link>
            <CardActions className="absolute top-0 right-0 gap-1">
                <IconButton aria-label="edit" onClick={
                    () => navigate(`/products/edit/${product.id}`)
                } className="!bg-blue-500 hover:!bg-blue-600">
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