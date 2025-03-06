import { useForm } from "react-hook-form";
import { IProduct } from "../../../libs/types";
import { FormControl, TextField, Select, MenuItem, Button, Stack, IconButton, InputLabel } from "@mui/material";
import { ProductFormSchema, TProductFormSchema } from "../../../libs/schemas/productForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "../../../store/productsStore";
import { addProductAPI, updateProductAPI } from "../../../libs/apicalls/products";
import { useSnackbar } from "../../../store/snackbarStore";
import React from "react";
import { MdClose } from "react-icons/md";

const ProductForm = ({ product, mode, categories, setShowForm }: { product: IProduct | null; mode: 'add' | 'edit'; categories: string[], setShowForm: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { addProduct, updateProduct } = useProducts()
    const { showSnackbar } = useSnackbar()
    const { register, formState: { isSubmitting, errors }, handleSubmit, getValues } = useForm<TProductFormSchema>({
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
            setShowForm(false)
        }
        else {
            showSnackbar({ message: 'Failed to add product', severity: 'error' })
        }
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <form className="flex flex-col w-full md:max-w-md rounded-lg gap-4 bg-white p-4 max-h-[720px] overflow-y-auto h-[80vh]" onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <h2 className="text-xl">{mode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
                    <IconButton onClick={() => setShowForm(false)}>
                        <MdClose size={24} />
                    </IconButton>
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
                <FormControl error={!!errors.thumbnail}>
                    <TextField
                        id="thumbnail"
                        label="Thumbnail"
                        {...register('thumbnail')}
                        error={!!errors.thumbnail}
                        helperText={errors.thumbnail?.message}
                    />
                </FormControl>
                {
                    !getValues("thumbnail") || errors.thumbnail ?
                        <div className="flex items-center justify-center bg-gray-100 w-full rounded-lg min-h-[240px]">
                            <p className="text-gray-400">Thumbnail Preview</p>
                        </div>
                        : <div className="flex items-center justify-center">
                            <img src={getValues("thumbnail") ?? ""} alt="thumbnail" className="w-full h-[240px] object-cover object-center" />
                        </div>
                }
                <FormControl error={!!errors.category}>
                    <InputLabel id="category-label" className="bg-white !px-2">Category</InputLabel>
                    <Select
                        id="category"
                        labelId="category-label"
                        {...register("category")}
                        defaultValue={product?.category ?? ""}
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl error={!!errors.stock}>
                    <TextField
                        error={!!errors.stock}
                        helperText={errors.stock?.message}
                        id="stock"
                        label="Stock"
                        type="number"
                        {...register('stock')}
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {mode === 'add' ? 'Add Product' : 'Save Product'}
                </Button>
            </form>
        </div>
    )
}

export default ProductForm