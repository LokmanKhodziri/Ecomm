import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
    id: string
    name: string
    price: number
    imageUrl: string | null
    quantity: number
}

interface CartStore {
    item: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    clearCart: () => void
}

export const useCartStore = create<CartStore>()(persist((set) => ({
    item: [],
    addItem: (item) => set((state) => {
        const existing = state.item.find((i) => i.id === item.id)

        if (existing) {
            return {
                item: state.item.map((i) => i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i)
            }
        }

        return {item: [...state.item, item]}
    }),
    removeItem: (id) => set((state) => ({
        item: state.item.map((i) => i.id === id ? {...i, quantity: i.quantity - 1} : i).filter((item) => item.quantity > 0)
    })),
    clearCart: () => set({ item: [] })
}), {name: 'cart'}))