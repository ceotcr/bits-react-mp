import { z } from "zod";

export const ProductFormSchema = z.object({
    title: z.string().min(1, "Title must not be empty"),
    description: z.string().min(10, "Add a detailed description"),
    price: z.number({ coerce: true }).gt(0, "Price must be greater than 0"),
    thumbnail: z.string().url("Thumbnail must be a valid URL"),
    category: z.string().min(3, "Category must be at least 3 characters"),
    stock: z.number({ coerce: true }).gte(0, "Stocks cannot be negative"),
})

export type TProductFormSchema = z.infer<typeof ProductFormSchema>;