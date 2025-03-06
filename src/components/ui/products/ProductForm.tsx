import { useForm } from "react-hook-form";
import { IProduct } from "../../../libs/types";
import { FormControl, TextField, Select, MenuItem, Button, Stack, InputLabel, Typography } from "@mui/material";
import { ProductFormSchema, TProductFormSchema } from "../../../libs/schemas/productForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "../../../store/productsStore";
import { addProductAPI, getCategories, updateProductAPI } from "../../../libs/apicalls/products";
import { useSnackbar } from "../../../store/snackbarStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const ProductForm = ({ product, mode}: { product: IProduct | null; mode: 'add' | 'edit'; }) => {
    const { addProduct, updateProduct } = useProducts()
    const { showSnackbar } = useSnackbar()

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
    const navigate = useNavigate()
    const { register, formState: { isSubmitting, errors }, handleSubmit, watch } = useForm<TProductFormSchema>({
        mode: 'onChange',
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            title: product?.title ?? "",
            description: product?.description ?? "",
            price: product?.price ?? 0,
            thumbnail: product?.thumbnail ?? "",
            category: product?.category ?? "",
            stock: product?.stock ?? 0,
        }
    })
    const onSubmit = async (data: TProductFormSchema) => {
        const res = await ((mode === 'edit' && product) ? updateProductAPI(data, product.id) : addProductAPI(data))
        if (res) {
            if (mode === 'edit' && product) updateProduct(res)
            else addProduct(res)
            showSnackbar({ message: `Product ${mode === 'add' ? 'added' : 'updated'} successfully`, severity: 'success' })
            navigate('/products')
        }
        else {
            showSnackbar({ message: 'Failed to add product', severity: 'error' })
        }
    }
    return (
            <form className="grid grid-cols-1 md:grid-cols-2 w-full max-w-2xl mx-auto rounded-lg gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" justifyContent="space-between" className="md:col-span-2" alignItems="center">
                    <Typography variant="h2" mb={4}>{mode === 'add' ? 'Add Product' : 'Edit Product'}</Typography>
                </Stack>
                <FormControl error={!!errors.title}>
                    <TextField
                        id="title"
                        label="Title"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        {...register('title')}
                    />
                </FormControl>
                <FormControl error={!!errors.description}>
                    <TextField
                        id="description"
                        label="Description"
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </FormControl>
                <FormControl error={!!errors.price} className="w-full">
                    <label htmlFor="price" className="text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        className={`w-full mt-1 p-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${errors.price ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                        {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </FormControl>
            <FormControl error={!!errors.stock}>
                <label htmlFor="stock" className="text-sm font-medium text-gray-700">
                    Stock
                </label>
                <input
                    id="stock"
                    type="number"
                    step="1"
                    className={`w-full mt-1 p-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${errors.stock ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...register("stock", { valueAsNumber: true })} 
                />
                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </FormControl>
                <FormControl error={!!errors.thumbnail} className="md:col-span-2">
                    <TextField
                        id="thumbnail"
                        label="Thumbnail"
                        {...register('thumbnail')}
                        error={!!errors.thumbnail}
                        helperText={errors.thumbnail?.message}
                    />
                </FormControl>
                {
                    !watch("thumbnail") || errors.thumbnail ?
                        <div className="flex items-center justify-center bg-gray-100 w-full rounded-lg min-h-[240px] md:col-span-2">
                            <p className="text-gray-400">Thumbnail Preview</p>
                        </div>
                        : <div className="flex items-center justify-center h-[240px] md:col-span-2">
                            <img src={watch("thumbnail") ?? ""} alt="thumbnail" className="w-full h-[240px] object-cover object-center" />
                        </div>
                }
                <FormControl error={!!errors.category} className="md:col-span-2">
                    <InputLabel id="category-label" className="bg-slate-100 !px-2">Category</InputLabel>
                    <Select
                        id="category"
                        labelId="category-label"
                        {...register("category")}
                        defaultValue={product?.category ?? ""}
                    >
                        { categories && categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button className="md:col-span-2" type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {mode === 'add' ? 'Add Product' : 'Save Product'}
                </Button>
            </form>
    )
}

export default ProductForm