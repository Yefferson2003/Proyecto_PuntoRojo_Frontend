
import { StateCreator } from "zustand"
import { CartItem, Product } from "../types";

export type CartStoreType = {
    cart: CartItem[],
    addToCart: (product: Product, quantity: number) => void;
    increaseItem: (productId: Product['id'])  => void;
    decreaseItem: (productId: Product['id'])  => void;
    removeFromCart: (productId: Product['id'])  => void;
    clearCart: () => void;
    copyCart: ( orderDetails : CartItem[]) => void;
}

export const createCartSlice : StateCreator<CartStoreType> = (set) => ({
    cart: [],
    addToCart: (product, quantity) => set((state) => {
        const existingItem = state.cart.find((item) => item.product.id === product.id);
    
        if (existingItem) {
            return {
                cart: state.cart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            };
        } else {
            return { cart: [...state.cart, { product, quantity }] };
        }
    }),
    increaseItem: (productId) => set((state) => ({
        cart: state.cart.map(item => 
            item.product.id === productId ?
            {...item, quantity: item.quantity + 1} :
            item
        )
    })),
    decreaseItem: (productId) => set((state) => ({
        cart: state.cart.map(item => 
            item.product.id === productId && item.quantity > 1 ?
            {...item, quantity: item.quantity - 1} :
            item
        )
    })),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.product.id !== productId)
    })),
    clearCart: () => set(() => ({cart: []})),
    copyCart: (orderDetails) => set(() => {
        const newOrderDetails = orderDetails.filter(item => item.product.availability === true)

        return {
            cart: newOrderDetails
        }
    })
})