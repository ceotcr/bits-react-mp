import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getProduct } from "../../libs/apicalls/products"
import { IProduct } from "../../libs/types"
import { useEffect, useState } from "react"
import { Button, Chip, Rating, Stack, Typography } from "@mui/material"
import { MdArrowDropDown, MdCheck, MdClose, MdDangerous, MdWarning } from "react-icons/md"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useCartStore } from "../../store/cartStore"

const Product = () => {
    const params = useParams<{ id: string }>()
    const id = params.id as string
    const { cart, addProduct } = useCartStore()
    const { data: product, isLoading, error } = useQuery<IProduct>({
        queryKey: ['product', id],
        queryFn: async () => {
            return await getProduct(id)
        },
    })
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const [openReviews, setOpenReviews] = useState<boolean>(false)
    useEffect(() => {
        setSelectedImage(0)
    }, [product])
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.name}: {error.message}</div>
    if (!product) return <div>Product not found</div>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto rounded-lg gap-4 p-4">
            <div className="w-full flex flex-col gap-4 md:!sticky !top-0 h-fit">
                <div className="w-full">
                    <img src={product.images[selectedImage]} alt={product.title} className="w-full h-96 object-center object-cover rounded-lg" />
                </div>
                <Stack direction="row" gap={2} flexWrap="wrap">
                    {product.images.map((image, index) => (
                        <img key={index} src={image} alt={product.title} className={`w-20 h-20 object-cover rounded-lg object-center outline-1 outline-slate-400 cursor-pointer ${selectedImage == index && "outline-2 !outline-green-500"}`} onClick={() => setSelectedImage(index)} />
                    ))}
                </Stack>
            </div>
            <div className="w-full flex flex-col gap-4">
                <Typography variant="h2" color="initial">
                    {product.title}
                </Typography>
                <Typography variant="h5" color="initial">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)} {product.brand && `| ${product.brand}`}
                </Typography>
                <Stack direction="row" gap={2} alignItems="center">
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="initial">
                        ({product.rating})
                    </Typography>
                    <Typography variant="body2" color="initial" onClick={() => setOpenReviews(true)} className="cursor-pointer !text-yellow-500">
                        ({product.reviews.length} reviews)
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Typography variant="h6" color="initial">
                        Price: $ {product.price}
                    </Typography>
                    <Typography variant="h6" color="initial" className={`${product.availabilityStatus === `In Stock` ? "!text-green-500" : product.availabilityStatus == `Low Stock` ? '!text-yellow-500' : '!text-red-500'} flex items-center gap-1`}>
                        {product.availabilityStatus === 'In Stock' ? <MdCheck /> : product.availabilityStatus == "Low Stock" ? <MdWarning /> : <MdDangerous />} {product.availabilityStatus} ({product.stock})
                    </Typography>
                </Stack>
                <Typography variant="body1" color="initial">
                    {product.description}
                </Typography>
                <Stack direction="row" gap={2}>
                    {product.tags.map((tag, index) => (
                        <Chip key={index} label={tag} />
                    ))}
                </Stack>
                {
                    product.stock > 0 &&
                        ((cart.find((item) => item.id === product.id)?.quantity ?? 0) < product.stock)
                        ? (
                            <Button variant="contained" color="primary" onClick={() => addProduct(product)}>
                                Add to Cart
                            </Button>) : (
                            <Button variant="contained" color="error" disabled>
                                {product.availabilityStatus === 'Out of Stock' ? 'Out of Stock' : 'Max Quantity Reached'}
                            </Button>
                        )
                }

                <Typography variant="h6" color="initial">
                    Specifications
                </Typography>
                <Stack direction="row" gap={2}>
                    <Typography variant="body1" color="initial">
                        Dimensions: {product.dimensions.height} x {product.dimensions.width} x {product.dimensions.depth}
                    </Typography>
                    <Typography variant="body1" color="initial">
                        Weight: {product.weight} Units
                    </Typography>

                </Stack>
                <Stack direction="column" gap={1}>
                    <Accordion disableGutters className="!shadow-none !border-none !outline-none">
                        <AccordionSummary expandIcon={
                            <MdArrowDropDown />
                        }>
                            <Typography variant="h6" color="initial">
                                Shipping Information
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" color="initial">
                                {product.shippingInformation}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters className="!shadow-none !border-none !outline-none">
                        <AccordionSummary expandIcon={
                            <MdArrowDropDown />
                        }>
                            <Typography variant="h6" color="initial">
                                Warranty details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" color="initial">
                                {product.warrantyInformation}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters className="!shadow-none !border-none !outline-none">
                        <AccordionSummary expandIcon={
                            <MdArrowDropDown />
                        }>
                            <Typography variant="h6" color="initial">
                                Return Policy
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" color="initial">
                                {product.returnPolicy}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Stack>

                {
                    openReviews && <div className="w-full h-full fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 z-50 flex items-center justify-center">
                        <Stack direction="column" gap={2} className="p-4 bg-white w-md">
                            <Stack direction="row" gap={2} justifyContent="space-between">
                                <Typography variant="h6" color="initial">
                                    Reviews
                                </Typography>
                                <MdClose className="cursor-pointer" size={24} onClick={() => { setOpenReviews(false) }} />
                            </Stack>

                            {
                                product.reviews.map((review, index) => (
                                    <Typography variant="body1" color="initial" key={index}>
                                        <Rating value={review.rating} precision={0.5} readOnly />
                                        <br />
                                        {review.comment}
                                        <br />
                                        <Typography variant="body2" color="initial">
                                            {review.reviewerName}, {new Date(review.date).toDateString()}
                                        </Typography>
                                    </Typography>
                                ))
                            }
                        </Stack>
                    </div>
                }
            </div>
        </div>
    )
}

export default Product