import { create } from "zustand";
import { ICartItem, IProduct } from "../libs/types";

interface ICartStore {
    cart: ICartItem[];
    addProduct: (product: IProduct) => void;
    removeProduct: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
    cart: [],
    addProduct: (product) => {
        set((state) => {
            const existingProduct = state.cart.find((p) => p.id === product.id);
            if (existingProduct) {
                return {
                    cart: state.cart.map((p) =>
                        p.id === product.id
                            ? { ...p, quantity: p.quantity + 1 }
                            : p
                    ),
                };
            }
            return {
                cart: [...state.cart, { ...product, quantity: 1 }],
            };
        });
    },
    removeProduct: (id) => {
        set((state) => ({
            cart: state.cart.filter((p) => p.id !== id),
        }));
    },
    clearCart: () => {
        set({ cart: [] });
    },
    increaseQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            ),
        }));
    },
    decreaseQuantity: (id) => {
        set((state) => {
            const existingProduct = state.cart.find((p) => p.id === id);
            if (existingProduct && existingProduct.quantity > 1) {
                return {
                    cart: state.cart.map((p) =>
                        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
                    ),
                };
            }
            return state;
        });
    },
}));