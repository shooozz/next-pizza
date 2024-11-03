import { create } from "zustand";
import { Api } from "@/shared/services/api-client";
import { CartStateItem, getCartDetails } from "@/shared/lib/get-cart-details";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;
    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    /* Запрос на добавление товара в корзину */
    addCartItem: (values: any) => Promise<void>;
    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}
export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,
    /* Получение списка items нашей корзины */
    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchCart();
            set(getCartDetails(data));
        } catch (e) {
            console.error(e);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id: number) => {},
    updateItemQuantity: async (id: number, quantity: number) => {},
    // addCartItem: async (values: CreateCartItemValues) => {},
    addCartItem: async (values: any) => {},
}));
