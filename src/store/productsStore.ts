import { create } from "zustand";
import { IProduct } from "../libs/types";
interface IProductStore {
    products: IProduct[];
    pages: number,
    setProducts: ({ products, pages, }: { products: IProduct[], pages: number }) => void;
    addProduct: (product: IProduct) => void;
    removeProduct: (id: number) => void;
    updateProduct: (product: IProduct) => void;
}
export const useProducts = create<IProductStore>((set) => ({
    products: [],
    pages: 0,
    setProducts: ({ products, pages }) => set({ products, pages }),
    addProduct: (product) => set((state) => ({ products: [product, ...state.products.slice(0, state.products.length - 1)] })),
    removeProduct: (id) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
    updateProduct: (product) => set((state) => ({ products: state.products.map((p) => p.id === product.id ? product : p) })),
}));