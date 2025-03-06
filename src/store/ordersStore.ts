import { create } from "zustand";
import { IOrder } from "../libs/types";

interface IOrdersStore {
    orders: IOrder[];
    pages: number;
    setOrderDetails: (orders: IOrder[], pages: number) => void;
    addOrder: (order: IOrder) => void;
    removeOrder: (id: number) => void;
    updateProcessStatus: (id: number) => void;
}

export const useOrders = create<IOrdersStore>((set) => ({
    orders: [],
    pages: 0,
    setOrderDetails: (orders, pages) => set({ orders, pages }),
    addOrder: (order) => set((state) => ({ orders: [order, ...state.orders.slice(0, state.orders.length - 1)] })),
    removeOrder: (id) => set((state) => ({ orders: state.orders.filter((order) => order.id !== id) })),
    updateProcessStatus: (id) => set((state) => ({
        orders: state.orders.map((order) => {
            if (order.id === id) {
                return {
                    ...order,
                    isProcessed: !order.isProcessed
                }
            }
            return order
        }
        )
    })),
}));

